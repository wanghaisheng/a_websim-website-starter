import os
import csv
import glob
import re
import requests
from datetime import datetime
from parse_url_from_sitemap import collect_all_url_details_from_sitemap
import pandas as pd

def read_domains(domain_file):
    with open(domain_file, 'r', encoding='utf-8') as f:
        return [line.strip() for line in f if line.strip()]

def get_sitemap_url(domain):
    if domain.startswith('http://') or domain.startswith('https://'):
        base = domain
    else:
        base = 'https://' + domain
    return base.rstrip('/') + '/sitemap.xml'

def check_url_200(url):
    try:
        resp = requests.head(url, timeout=10, allow_redirects=True)
        return resp.status_code == 200
    except Exception:
        return False

def get_robots_sitemaps(domain):
    if domain.startswith('http://') or domain.startswith('https://'):
        base = domain
    else:
        base = 'https://' + domain
    robots_url = base.rstrip('/') + '/robots.txt'
    try:
        resp = requests.get(robots_url, timeout=10)
        if resp.status_code == 200:
            sitemaps = re.findall(r'^Sitemap:\s*(\S+)', resp.text, re.MULTILINE)
            return sitemaps
    except Exception:
        pass
    return []

def aggregate_all_domains(domain_file):
    today = datetime.now().strftime('%Y-%m-%d')
    results_folder = 'results'
    os.makedirs(results_folder, exist_ok=True)

    # --- 读取历史所有分片文件合并，得到历史URL集合 ---
    history_files = sorted(glob.glob(os.path.join(results_folder, 'all_domains_url_details_part*.csv')))
    history_dfs = []
    for hf in history_files:
        try:
            df = pd.read_csv(hf)
            history_dfs.append(df)
        except Exception as e:
            print(f"读取历史文件失败 {hf}: {e}")
    firstime=False
    if history_dfs:
        all_history_df = pd.concat(history_dfs, ignore_index=True)
        all_history_df.drop_duplicates(subset=['loc'], inplace=True)
        history_set = set(all_history_df['loc'].values)
    else:
        all_history_df = pd.DataFrame(columns=['loc', 'lastmodified', 'added_date'])
        history_set = set()
        firstime=True

    # --- 遍历域名抓取当天数据 ---
    domains = read_domains(domain_file)
    all_new_url_details = []

    for domain in domains:
        sitemap_url = get_sitemap_url(domain)
        sitemap_urls_to_try = [sitemap_url]
        if not check_url_200(sitemap_url):
            print(f"默认 sitemap.xml 不存在，尝试 robots.txt 中寻找 - {domain}")
            robots_sitemaps = get_robots_sitemaps(domain)
            if robots_sitemaps:
                sitemap_urls_to_try = robots_sitemaps
            else:
                print(f"{domain} 无 sitemap 信息，跳过。")
                continue

        success = False
        for sm_url in sitemap_urls_to_try:
            print(f"抓取 sitemap: {sm_url}")
            try:
                url_details = collect_all_url_details_from_sitemap(sm_url, today=today)
                # 过滤出新增URL
                for d in url_details:
                    if d['loc'] not in history_set:
                        d['added_date'] = today
                        all_new_url_details.append(d)
                success = True
                break
            except Exception as e:
                print(f"处理 sitemap 失败 {sm_url}：{e}")
        if not success:
            print(f"{domain} 所有 sitemap 处理失败")

    # --- 写入今日新增 newurl_YYYY-MM-DD.csv ---
    newurl_path = os.path.join(results_folder, f'newurl_{today}.csv')
    if  all_new_url_details:
        with open(newurl_path, 'w', encoding='utf-8', newline='') as nf:
            writer = csv.DictWriter(nf, fieldnames=['loc', 'lastmodified', 'added_date'])
            writer.writeheader()
            writer.writerows(all_new_url_details)
        print(f"今日新增 URL: {len(all_new_url_details)}，保存至 {newurl_path}")
    else:
        print("今日无新增 URL。")

    # --- 写入 all_domains_url_details_part*.csv 分片追加 ---
    if all_new_url_details:
        max_size = 90 * 1024 * 1024  # 90MB
        base_path = os.path.join(results_folder, 'all_domains_url_details')

        # 找到最后一个存在的分片编号
        existing_parts = sorted(glob.glob(f"{base_path}_part*.csv"))
        if existing_parts:
            last_file = existing_parts[-1]
            last_part_index = int(re.findall(r'_part(\d+)\.csv$', last_file)[0])
            current_file = last_file
            mode = 'a'  # 追加模式
        else:
            last_part_index = 0
            current_file = f"{base_path}_part1.csv"
            mode = 'w'

        # 追加写入分片，自动切分
        f = open(current_file, mode, encoding='utf-8', newline='')
        writer = csv.DictWriter(f, fieldnames=['loc', 'lastmodified', 'added_date'])
        if mode == 'w':
            writer.writeheader()

        for d in all_new_url_details:
            writer.writerow(d)
            if f.tell() >= max_size:
                f.close()
                last_part_index += 1
                current_file = f"{base_path}_part{last_part_index}.csv"
                f = open(current_file, 'w', encoding='utf-8', newline='')
                writer = csv.DictWriter(f, fieldnames=['loc', 'lastmodified', 'added_date'])
                writer.writeheader()

        f.close()

    # --- 更新 daily_url_stats.csv ---
    stats_path = os.path.join(results_folder, 'daily_url_stats.csv')
    stats_df = pd.DataFrame([{'date': today, 'new_url_count': len(all_new_url_details)}])
    if os.path.exists(stats_path):
        old_stats = pd.read_csv(stats_path)
        stats_df = pd.concat([old_stats, stats_df], ignore_index=True)
        stats_df.drop_duplicates(subset='date', keep='last', inplace=True)
    stats_df.to_csv(stats_path, index=False)
    print(f"更新每日新增统计: {stats_path}")

    # --- 更新 index.csv（所有分片文件信息） ---
    index_path = os.path.join(results_folder, 'index.csv')
    index_data = []
    parts_files = sorted(glob.glob(os.path.join(results_folder, 'all_domains_url_details_part*.csv')))
    for file in parts_files:
        try:
            df = pd.read_csv(file)
            if df.empty:
                continue
            part_num = int(re.findall(r'_part(\d+)\.csv$', file)[0])
            index_data.append({
                'part': part_num,
                'filename': os.path.basename(file),
                'count': len(df),
                'first_date': df['added_date'].min() if 'added_date' in df else '',
                'last_date': df['added_date'].max() if 'added_date' in df else ''
            })
        except Exception as e:
            print(f"索引生成失败 {file}: {e}")

    index_df = pd.DataFrame(index_data)
    index_df.sort_values('part', inplace=True)
    index_df.to_csv(index_path, index=False)
    print(f"索引文件已更新: {index_path}")

def main():
    domain_file = 'domainlist.csv'
    aggregate_all_domains(domain_file)

if __name__ == '__main__':
    main()

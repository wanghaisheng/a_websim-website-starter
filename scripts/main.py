import os
import csv
import sys
from datetime import datetime
import requests
import re
# sys.path.append(os.path.join(os.path.dirname(__file__), 'scripts'))
from parse_url_from_sitemap import collect_all_url_details_from_sitemap

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

def aggregate_all_domains(domain_file, output_file):
    domains = read_domains(domain_file)
    all_url_details = []
    today = datetime.now().strftime('%Y-%m-%d')
    date_folder = f"results/{today}"
    if not os.path.exists(date_folder):
        os.makedirs(date_folder)
    progress_file = os.path.join(date_folder, f'domain_progress_{today}.txt')
    failed_file = os.path.join(date_folder, f'failed_domains_{today}.txt')
    # 读取已处理进度
    processed_domains = set()
    if os.path.exists(progress_file):
        with open(progress_file, 'r', encoding='utf-8') as pf:
            processed_domains = set([line.strip() for line in pf if line.strip()])
    failed_domains = set()
    if os.path.exists(failed_file):
        with open(failed_file, 'r', encoding='utf-8') as ff:
            failed_domains = set([line.strip() for line in ff if line.strip()])
    for domain in domains:
        if domain in processed_domains:
            continue
        sitemap_url = get_sitemap_url(domain)
        sitemap_urls_to_try = [sitemap_url]
        if not check_url_200(sitemap_url):
            print(f"Default sitemap not found for {domain}, checking robots.txt...")
            robots_sitemaps = get_robots_sitemaps(domain)
            if robots_sitemaps:
                sitemap_urls_to_try = robots_sitemaps
            else:
                print(f"No sitemap found in robots.txt for {domain}")
                failed_domains.add(domain)
                with open(failed_file, 'a', encoding='utf-8') as ff:
                    ff.write(domain + '\n')
                with open(progress_file, 'a', encoding='utf-8') as pf:
                    pf.write(domain + '\n')
                continue
        success = False
        for sitemap_url in sitemap_urls_to_try:
            print(f'Processing {sitemap_url}')
            try:
                url_details = collect_all_url_details_from_sitemap(sitemap_url, today=today)
                # for d in url_details:
                    # d['domain'] = domain
                all_url_details.extend(url_details)
                success = True
                break  # Only process the first working sitemap
            except Exception as e:
                print(f'Failed to process {sitemap_url}: {e}')
        if not success:
            failed_domains.add(domain)
            with open(failed_file, 'a', encoding='utf-8') as ff:
                ff.write(domain + '\n')
        with open(progress_file, 'a', encoding='utf-8') as pf:
            pf.write(domain + '\n')
    # Save all results
    if all_url_details:
        fieldnames = [
            # 'domain', 
            'loc', 'lastmodified', 'added_date']
        output_file_with_date_base = os.path.join(date_folder, f'all_domains_url_details_{today}')
        max_size = 90 * 1024 * 1024  # 90MB
        file_index = 1
        output_file_with_date = f"{output_file_with_date_base}_part{file_index}.csv"
        f = open(output_file_with_date, 'w', encoding='utf-8', newline='')
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        current_size = f.tell()
        for i, d in enumerate(all_url_details):
            writer.writerow(d)
            # 检查文件大小，超过90M则切换新文件
            if f.tell() >= max_size:
                f.close()
                file_index += 1
                output_file_with_date = f"{output_file_with_date_base}_part{file_index}.csv"
                f = open(output_file_with_date, 'w', encoding='utf-8', newline='')
                writer = csv.DictWriter(f, fieldnames=fieldnames)
                writer.writeheader()
        f.close()
        print(f"Aggregated {len(all_url_details)} URLs from {len(domains)} domains. Saved to {output_file_with_date_base}_part*.csv")
    else:
        print("No URLs found.")

def main():
    domain_file = 'domainlist.csv'
    today = datetime.now().strftime('%Y-%m-%d')
    date_folder = f"results/{today}"
    if not os.path.exists(date_folder):
        os.makedirs(date_folder)
    output_file = os.path.join(date_folder, f'all_domains_url_details_{today}.csv')
    aggregate_all_domains(domain_file, output_file)

if __name__ == '__main__':
    main()

import os
from domainMonitorDp import DomainMonitor

monitor = DomainMonitor()


expression = os.getenv('expression', 'intext:"saas kit"')
sites = ['twitter.com', 'youtube.com']
monitor.sites=sites
advanced_queries = {}
for s in sites:
    advanced_queries[s] = f'{expression} site:{s}'
print('==',advanced_queries)

# https://www.google.com/search?q=itch.io++site%3Ax.com&sca_esv=6d27a280cc9bfc7a&biw=1432&bih=774&tbs=qdr%3Ad&sxsrf=AE3TifOTz2q9IaH41xbI8zpRTp2FHU0eRw%3A1751303768604&ei=WMZiaPDVJIW9hbIPz7DC-As&ved=0ahUKEwjw4ZX40pmOAxWFXkEAHU-YEL8Q4dUDCBA&uact=5&oq=itch.io++site%3Ax.com&gs_lp=Egxnd3Mtd2l6LXNlcnAiE2l0Y2guaW8gIHNpdGU6eC5jb21I8BBQnghYmhBwAngAkAEAmAGxAqABjAeqAQMzLTO4AQPIAQD4AQGYAgCgAgCYAwCIBgGSBwCgB5kBsgcAuAcAwgcAyAcA&sclient=gws-wiz-serp
#增加时间限制 24小时内 1小时内 每个小时
results_df = monitor.monitor_all_sites(time_ranges=None,advanced_queries=advanced_queries)
os.makedirs('result', exist_ok=True)
results_df.to_csv('result/report.csv')
if not results_df.empty:
    print("\n=== 监控统计 ===")
    print(f"总计发现新页面: {len(results_df)}")
    print(results_df['site'].value_counts())

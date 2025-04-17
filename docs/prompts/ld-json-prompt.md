基于docs/prd.md和scripts/config.json，要求直接为每个页面批量生成结构化数据json文件，而不是创建或修改任何js脚本。

1. 优先从sitemap.xml中读取所有页面的HTML路径（支持多语言和多目录结构，语言一般通过如/en/、/zh/、/fr/等目录区分）。
2. 若sitemap.xml未包含某些HTML页面，则递归遍历项目根目录下所有HTML文件，补全所有页面。
3. 对每个HTML文件，读取其内容，智能分析页面类型（如首页、产品页、文章页、FAQ页、App页等）。
4. 根据页面内容和类型，自动生成该页面所需的所有结构化数据（ld+json），包括但不限于：
   - WebSite
   - Organization
   - SoftwareApplication
   - Product
   - Article
   - FAQPage
   - BreadcrumbList
   - Review
   - 以及Google支持的其它schema（如Event、Course、Recipe、Video等，按页面内容自动判断）。
5. 每个schema直接生成一个独立的json文件，文件名为schema类型（如article.json、product.json等）。
6. 将这些json文件分别保存到scripts/ldjson/<页面名>/文件夹下（如en/about.html→scripts/ldjson/about/，zh/about.html→scripts/ldjson/about/），路径均为项目根目录下的相对路径。
7. 支持多语言页面（通过目录结构自动提取语言信息，如en/about.html→语言为en），如有需要可在json中体现语言字段。
8. 生成的json文件内容需自动填充页面实际数据（如标题、作者、图片、描述、评分等），如无法提取则留空或用默认值。
9. 生成的json文件可直接供scripts/ldjson.js脚本加载html页面使用。

目标：
实现批量、智能、结构化地为每个页面直接生成最优ld+json的json文件，便于后续SEO和富媒体展示。


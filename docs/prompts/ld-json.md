**Prompt（中文）**

请为如下自动化任务生成代码或脚本：

1. 遍历项目根目录下所有 HTML 文件（支持多语言和多目录结构，语言一般通过如 `/en/`, `/zh/`, `/fr/` 等目录区分）。
2. 对每个 HTML 文件，读取其内容，智能分析页面类型（如首页、产品页、文章页、FAQ页、App页等）。
3. 根据页面内容和类型，自动生成该页面所需的所有结构化数据（ld+json），包括但不限于：  
   - WebSite  
   - Organization  
   - SoftwareApplication  
   - Product  
   - Article  
   - FAQPage  
   - BreadcrumbList  
   - Review  
   - 以及 Google 支持的其它 schema（如 Event、Course、Recipe、Video 等，按页面内容自动判断）。
4. 每个 schema 生成一个独立的 json 文件，文件名为 schema 类型（如 `article.json`、`product.json` 等）。
5. 将这些 json 文件分别保存到 `scripts/ldjson/<页面名>/` 文件夹下（如 `en/about.html` → `scripts/ldjson/about/`，`zh/about.html` → `scripts/ldjson/about/`），路径均为项目根目录下的相对路径。
6. 支持多语言页面（通过目录结构自动提取语言信息，如 `en/about.html` → 语言为 `en`），如有需要可在 json 中体现语言字段。
7. 生成的 json 文件内容需自动填充页面实际数据（如标题、作者、图片、描述、评分等），如无法提取则留空或用默认值。

**目标：**  
实现批量、智能、结构化地为每个页面生成最优 ld+json 数据，便于后续 SEO 和富媒体展示。

---

如需具体代码实现或脚本示例，请告知你希望用哪种语言（如 Node.js、Python 等）！
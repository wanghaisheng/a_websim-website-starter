const fs = require('fs');
const path = require('path');

// Load and validate config.json
const configPath = path.resolve(__dirname, 'config.json');
let config;
try {
    const configData = fs.readFileSync(configPath, 'utf-8');
    config = JSON.parse(configData);
} catch (error) {
    console.error('Error reading or parsing config.json:', error.message);
    process.exit(1);
}

const locales = ['', 'fr', 'zh', 'es', 'de'];
const baseDir = path.dirname(__dirname);
const ignoreFolders = ['node_modules','template', 'assets', 'temp','docs'];

function listHtmlFiles(dir) {
    return fs.readdirSync(dir).reduce((files, file) => {
        const filePath = path.join(dir, file);
        const isDirectory = fs.statSync(filePath).isDirectory();
        if (isDirectory && ignoreFolders.includes(file)) {
            return files;
        }
        if (isDirectory) {
            return files.concat(listHtmlFiles(filePath));
        }
        if (path.extname(file) === '.html') {
            return files.concat([filePath]);
        }
        return files;
    }, []);
}

const allHtmlFiles = locales.flatMap(locale => {
    const localeDir = path.join(baseDir, locale);
    if (!fs.existsSync(localeDir)) return [];
    return listHtmlFiles(localeDir).map(file => ({
        path: path.join(locale, path.relative(localeDir, file)).replace(/\\+/g, '/')
    }));
});

// --- LD+JSON GENERATORS ---

function genWebSite(config) {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": config.website?.name || config.business?.name || "",
        "url": config.baseUrl,
        "potentialAction": {
            "@type": "SearchAction",
            "target": config.website?.searchUrl || (config.baseUrl + "/search/{search_term_string}"),
            "query-input": "required name=search_term_string"
        }
    };
}

function genOrganization(config) {
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": config.business?.name || "",
        "url": config.baseUrl,
        "logo": config.business?.image || "",
        "contactPoint": [{
            "@type": "ContactPoint",
            "email": config.email || "",
            "contactType": "customer support"
        }],
        "sameAs": config.business?.sameAs || []
    };
}

function genSoftwareApplication(config) {
    return {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": config.software?.name || "",
        "operatingSystem": config.software?.operatingSystem || "any",
        "applicationCategory": config.software?.applicationCategory || "WebApplication",
        "description": config.software?.description || "",
        "image": config.software?.image || "",
        "author": {
            "@type": "Organization",
            "name": config.software?.author || config.business?.name || ""
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": config.software?.aggregateRating?.ratingValue || "5.0",
            "ratingCount": config.software?.aggregateRating?.ratingCount || "1",
            "bestRating": config.software?.aggregateRating?.bestRating || "5",
            "worstRating": config.software?.aggregateRating?.worstRating || "1"
        },
        "offers": {
            "@type": "Offer",
            "price": config.software?.offers?.price || 0,
            "priceCurrency": config.software?.offers?.priceCurrency || "USD",
            "category": config.software?.offers?.category || "free"
        }
    };
}

function genBreadcrumbList(config, pageTitle) {
    // You can customize this to generate dynamic breadcrumbs per page
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": config.baseUrl
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": pageTitle || config.website?.name || config.business?.name || "",
                "item": config.baseUrl // You can customize this per page
            }
        ]
    };
}

const templatesDir = path.join(__dirname, 'ldjson');

function loadTemplate(templateName) {
    const templatePath = path.join(templatesDir, `${templateName}.json`);
    if (!fs.existsSync(templatePath)) return null;
    return fs.readFileSync(templatePath, 'utf-8');
}

function renderTemplate(templateStr, data) {
    // Simple {{key}} replacement, supports nested keys like a.b.c
    return templateStr.replace(/{{\s*([\w.]+)\s*}}/g, (_, key) => {
        const value = key.split('.').reduce((o, k) => (o ? o[k] : ''), data);
        return value !== undefined ? value : '';
    });
}

// --- INJECTION LOGIC ---

function genFAQPage(faqList) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqList.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };
}

function genArticle(config, articleData) {
    return {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": articleData.headline || "",
        "image": articleData.image || "",
        "author": {
            "@type": "Person",
            "name": articleData.author || config.software?.author || config.business?.name || ""
        },
        "datePublished": articleData.datePublished || "",
        "dateModified": articleData.dateModified || "",
        "articleBody": articleData.body || ""
    };
}

function extractFAQFromHtml(html) {
    // Simple extraction: look for elements with class "faq-question" and "faq-answer"
    // You can enhance this logic as needed
    const faqRegex = /<div[^>]*class=["'][^"']*faq-question[^"']*["'][^>]*>(.*?)<\/div>\s*<div[^>]*class=["'][^"']*faq-answer[^"']*["'][^>]*>(.*?)<\/div>/gis;
    let match, faqs = [];
    while ((match = faqRegex.exec(html)) !== null) {
        faqs.push({
            question: match[1].replace(/<[^>]+>/g, '').trim(),
            answer: match[2].replace(/<[^>]+>/g, '').trim()
        });
    }
    return faqs;
}

function extractArticleDataFromHtml(html) {
    // Simple extraction: get title, author, date, body
    const headline = (html.match(/<h1[^>]*>(.*?)<\/h1>/i) || [])[1] || '';
    const author = (html.match(/<meta[^>]+name=["']author["'][^>]+content=["']([^"']+)["']/i) || [])[1] || '';
    const datePublished = (html.match(/<meta[^>]+property=["']article:published_time["'][^>]+content=["']([^"']+)["']/i) || [])[1] || '';
    const dateModified = (html.match(/<meta[^>]+property=["']article:modified_time["'][^>]+content=["']([^"']+)["']/i) || [])[1] || '';
    const image = (html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) || [])[1] || '';
    // For body, just grab the main content div as a fallback
    const body = (html.match(/<div[^>]+class=["'][^"']*article-body[^"']*["'][^>]*>([\s\s]*?)<\/div>/i) || [])[1] || '';
    return { headline, author, datePublished, dateModified, image, body };
}

function hasLdJson(html, ldType) {
    const scripts = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
    for (const match of scripts) {
        try {
            const data = JSON.parse(match[1].trim());
            if (Array.isArray(data)) {
                if (data.some(item => item['@type'] === ldType)) return true;
            } else if (data['@type'] === ldType) {
                return true;
            }
        } catch (e) { continue; }
    }
    return false;
}

function getPageCategory(absPath, html) {
    const relPath = absPath.replace(baseDir, '').replace(/\\/g, '/').toLowerCase();
    const filename = path.basename(absPath).toLowerCase();

    if (relPath.includes('/blog/') || relPath.includes('/posts/') || /<article/i.test(html)) {
        return 'blog';
    }
    if (relPath.includes('/faq/') || filename.includes('faq')) {
        return 'faq';
    }
    if (relPath.includes('/product/') || filename.includes('product')) {
        return 'product';
    }
    if (relPath.includes('/game/') || filename.includes('game')) {
        return 'game';
    }
    return 'app'; // default bundle for generic app pages
}

function getTemplatesForCategory(category) {
    switch (category) {
        case 'blog':
            return ['article', 'breadcrumblist', 'organization'];
        case 'faq':
            return ['faqpage', 'breadcrumblist', 'organization'];
        case 'product':
            return ['product', 'breadcrumblist', 'organization'];
        case 'game':
            return ['game', 'breadcrumblist', 'organization'];
        case 'app':
        default:
            return ['website', 'organization', 'softwareapplication', 'breadcrumblist'];
    }
}

function injectLdJsonIfNeeded(html, config, pageTitle, absPath) {
    const inserts = [];
    const apptype = config.apptype || 'app';

    // 解析相对路径，提取语言和页面名
    const relPath = path.relative(baseDir, absPath).replace(/\\/g, '/');
    // 例如 relPath: 'en/about.html' 或 'about.html'
    const parts = relPath.split('/');
    let lang = '';
    let pageName = '';
    if (parts.length === 2 && locales.includes(parts[0])) {
        lang = parts[0];
        pageName = path.basename(parts[1], '.html').toLowerCase();
    } else {
        // 根目录下的html，使用config.defaultLang
        lang = config.defaultLang || 'en';
        pageName = path.basename(parts[parts.length - 1], '.html').toLowerCase();
    }

    // 优先查找 ldjson/app/about/en/，再 about/，最后 default/
    const customPageFolderLang = lang ? path.join(templatesDir, apptype, pageName, lang) : '';
    const customPageFolder = path.join(templatesDir, apptype, pageName);
    const defaultFolder = path.join(templatesDir, apptype, 'default');

    let injected = false;

    // 1. about/en 这种多语言页面级模板优先
    if (customPageFolderLang && fs.existsSync(customPageFolderLang) && fs.statSync(customPageFolderLang).isDirectory()) {
        const files = fs.readdirSync(customPageFolderLang).filter(f => f.endsWith('.json'));
        for (const file of files) {
            const tpl = fs.readFileSync(path.join(customPageFolderLang, file), 'utf-8');
            let typeName = '';
            try {
                const json = JSON.parse(tpl.replace(/{{.*?}}/g, ''));
                typeName = json['@type'];
            } catch {}
            if (!typeName || !hasLdJson(html, typeName)) {
                inserts.push('<script type="application/ld+json">\n' + renderTemplate(tpl, { ...config, pageTitle, lang }) + '\n</script>');
            }
        }
        injected = inserts.length > 0;
    }

    // 2. about 页面级模板
    if (!injected && fs.existsSync(customPageFolder) && fs.statSync(customPageFolder).isDirectory()) {
        const files = fs.readdirSync(customPageFolder).filter(f => f.endsWith('.json'));
        for (const file of files) {
            const tpl = fs.readFileSync(path.join(customPageFolder, file), 'utf-8');
            let typeName = '';
            try {
                const json = JSON.parse(tpl.replace(/{{.*?}}/g, ''));
                typeName = json['@type'];
            } catch {}
            if (!typeName || !hasLdJson(html, typeName)) {
                inserts.push('<script type="application/ld+json">\n' + renderTemplate(tpl, { ...config, pageTitle, lang }) + '\n</script>');
            }
        }
        injected = inserts.length > 0;
    }

    // 3. default 文件夹
    if (!injected && fs.existsSync(defaultFolder) && fs.statSync(defaultFolder).isDirectory()) {
        const files = fs.readdirSync(defaultFolder).filter(f => f.endsWith('.json'));
        for (const file of files) {
            const tpl = fs.readFileSync(path.join(defaultFolder, file), 'utf-8');
            let typeName = '';
            try {
                const json = JSON.parse(tpl.replace(/{{.*?}}/g, ''));
                typeName = json['@type'];
            } catch {}
            if (!typeName || !hasLdJson(html, typeName)) {
                inserts.push('<script type="application/ld+json">\n' + renderTemplate(tpl, { ...config, pageTitle, lang }) + '\n</script>');
            }
        }
    }

    // 3. 内容感知补充注入（如FAQ、Article等）
    const category = getPageCategory(absPath, html);
    const templates = getTemplatesForCategory(category);

    // Inject all relevant templates for the detected category
    for (const tplName of templates) {
        // Capitalize first letter for @type check
        const typeName = tplName.charAt(0).toUpperCase() + tplName.slice(1).replace('page', 'Page').replace('list', 'List');
        if (!hasLdJson(html, typeName)) {
            const tpl = loadTemplate(tplName);
            if (tpl) {
                // For FAQPage and Article, pass extracted data
                if (tplName === 'faqpage') {
                    const faqs = extractFAQFromHtml(html);
                    if (faqs.length > 0) {
                        inserts.push('<script type="application/ld+json">\n' + renderTemplate(tpl, { ...config, faqs }) + '\n</script>');
                    }
                } else if (tplName === 'article') {
                    const articleData = extractArticleDataFromHtml(html);
                    inserts.push('<script type="application/ld+json">\n' + renderTemplate(tpl, { ...config, ...articleData }) + '\n</script>');
                } else {
                    inserts.push('<script type="application/ld+json">\n' + renderTemplate(tpl, { ...config, pageTitle }) + '\n</script>');
                }
            }
        }
    }

    // Fallback: If FAQPage is detected by content but not by path, still inject
    if (category !== 'faq') {
        const faqs = extractFAQFromHtml(html);
        if (faqs.length > 0 && !hasLdJson(html, "FAQPage")) {
            const tpl = loadTemplate('faqpage');
            if (tpl) {
                inserts.push('<script type="application/ld+json">\n' + renderTemplate(tpl, { ...config, faqs }) + '\n</script>');
            } else {
                inserts.push('<script type="application/ld+json">\n' + JSON.stringify(genFAQPage(faqs), null, 2) + '\n</script>');
            }
        }
    }

    // Fallback: If Article is detected by content but not by path, still inject
    if (category !== 'blog' && /<article/i.test(html) && !hasLdJson(html, "Article")) {
        const articleData = extractArticleDataFromHtml(html);
        const tpl = loadTemplate('article');
        if (tpl) {
            inserts.push('<script type="application/ld+json">\n' + renderTemplate(tpl, { ...config, ...articleData }) + '\n</script>');
        } else {
            inserts.push('<script type="application/ld+json">\n' + JSON.stringify(genArticle(config, articleData), null, 2) + '\n</script>');
        }
    }

    if (inserts.length === 0) return html;
    // Insert before </head>
    return html.replace(/<\/head>/i, inserts.join('\n') + '\n</head>');
}

// --- MAIN PROCESS ---

allHtmlFiles.forEach(fileObj => {
    const absPath = path.join(baseDir, fileObj.path);
    if (!fs.existsSync(absPath)) return;
    let html = fs.readFileSync(absPath, 'utf-8');
    let pageTitle = '';
    const titleMatch = html.match(/<title>(.*?)<\/title>/i);
    if (titleMatch) pageTitle = titleMatch[1];
    const newHtml = injectLdJsonIfNeeded(html, config, pageTitle, absPath);
    if (newHtml !== html) {
        fs.writeFileSync(absPath, newHtml, 'utf-8');
        console.log(`Injected missing ld+json into ${absPath}`);
    }
});

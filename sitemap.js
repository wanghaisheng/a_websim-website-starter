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
const baseDir = path.join(__dirname, '/');
const baseUrl = config.baseUrl || 'https://default-url.com';
const ignoreFolders = ['node_modules','template', 'assets', 'temp'];

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

// Get file modification date in ISO format
function getLastModifiedDate(filePath) {
    try {
        const stats = fs.statSync(filePath);
        return stats.mtime.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    } catch (error) {
        return new Date().toISOString().split('T')[0]; // Use current date if error
    }
}

const allHtmlFiles = locales.flatMap(locale => {
    const localeDir = path.join(baseDir, locale);
    if (!fs.existsSync(localeDir)) return [];
    return listHtmlFiles(localeDir).map(file => {
        return {
            path: path.join(locale, path.relative(localeDir, file)).replace(/\\+/g, '/'),
            lastmod: getLastModifiedDate(file)
        };
    });
});

// Create a map to store unique URLs with their metadata
const urlMap = new Map();

// Add root path first
const currentDate = new Date().toISOString().split('T')[0];
urlMap.set('/', { 
    loc: '/', 
    lastmod: currentDate,
    changefreq: 'daily', 
    priority: '1.0' 
});

// Process other URLs
allHtmlFiles.forEach(file => {
    const fileWithoutExtension = file.path.replace('.html', '');
    let loc;
    
    if (fileWithoutExtension.endsWith('index')) {
        loc = `/${fileWithoutExtension.split('/').slice(0, -1).join('/')}`;
        // Skip if it's the root path (already added)
        if (loc === '/') {
            return;
        }
    } else {
        loc = `/${fileWithoutExtension}`;
    }
    
    // Only add if URL doesn't exist or has a newer modification date
    if (!urlMap.has(loc) || file.lastmod > urlMap.get(loc).lastmod) {
        urlMap.set(loc, {
            loc,
            lastmod: file.lastmod,
            changefreq: 'weekly',
            priority: '0.9',
        });
    }
});

// Convert Map to array
const sitemap = Array.from(urlMap.values());

// Generate XML with proper formatting and lastmod dates
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemap.map(item => `    <url>
        <loc>${baseUrl}${item.loc}</loc>
        <lastmod>${item.lastmod}</lastmod>
        <changefreq>${item.changefreq}</changefreq>
        <priority>${item.priority}</priority>
    </url>`).join('\n')}
</urlset>`;

fs.writeFileSync('sitemap.xml', sitemapXml);
console.log('Sitemap has been generated and saved to sitemap.xml');

// Generate robots.txt if it doesn't exist
const robotsPath = path.join(__dirname, 'robots.txt');
if (!fs.existsSync(robotsPath)) {
    const robotsContent = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml`;
    fs.writeFileSync(robotsPath, robotsContent);
    console.log('robots.txt has been generated');
}

// Generate CSV with lastmod dates
const csvContent = ['URL,Lastmod,Changefreq,Priority']
    .concat(sitemap.map(item => `${baseUrl}${item.loc},${item.lastmod},${item.changefreq},${item.priority}`))
    .join('\n');

fs.writeFileSync('urls.csv', csvContent);
console.log('Found URLs have been saved to urls.csv');

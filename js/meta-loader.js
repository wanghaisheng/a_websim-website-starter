// meta-loader.js
// 动态根据 lang 目录加载 SEO meta 字段，支持响应式和多语言
(function() {
  // 支持的 SEO 字段，参考 pollo.html 最佳实践
  const SEO_FIELDS = [
    { key: 'description', name: 'description', isProperty: false },
    { key: 'keywords', name: 'keywords', isProperty: false },
    { key: 'og:title', name: 'og:title', isProperty: true },
    { key: 'og:description', name: 'og:description', isProperty: true },
    { key: 'og:image', name: 'og:image', isProperty: true },
    { key: 'og:image:alt', name: 'og:image:alt', isProperty: true },
    { key: 'og:image:width', name: 'og:image:width', isProperty: true },
    { key: 'og:image:height', name: 'og:image:height', isProperty: true },
    { key: 'og:site_name', name: 'og:site_name', isProperty: true },
    { key: 'google', name: 'google', isProperty: false },
    { key: 'author', name: 'author', isProperty: false },
    { key: 'robots', name: 'robots', isProperty: false }
  ];

  // 读取 lang 目录下的 json 语言包
  async function fetchLangMeta(lang) {
    try {
      const res = await fetch(`/locale/${lang}.json?_t=` + Date.now());
      if (!res.ok) return null;
      const data = await res.json();
      return data && data.seo ? data.seo : null;
    } catch (e) {
      return null;
    }
  }

  function setMeta(name, content, isProperty = false, isLink = false) {
    if (!content) return;
    let selector = isLink ? `link[rel='${name}']` : (isProperty ? `meta[property='${name}']` : `meta[name='${name}']`);
    let el = document.head.querySelector(selector);
    if (!el) {
      if (isLink) {
        el = document.createElement('link');
        el.setAttribute('rel', name);
        document.head.appendChild(el);
      } else {
        el = document.createElement('meta');
        if (isProperty) el.setAttribute('property', name);
        else el.setAttribute('name', name);
        document.head.appendChild(el);
      }
    }
    if (isLink) {
      el.setAttribute('href', content);
    } else {
      el.setAttribute('content', content);
    }
  }

  async function loadMeta() {
    const htmlLang = document.documentElement.lang || 'zh';
    const lang = htmlLang.startsWith('en') ? 'en' : 'zh';
    const metaData = await fetchLangMeta(lang);
    if (!metaData) return;
    SEO_FIELDS.forEach(field => {
      setMeta(field.name, metaData[field.key], field.isProperty, field.isLink);
    });
  }

  document.addEventListener('DOMContentLoaded', loadMeta);
  const langSelector = document.getElementById('language-selector');
  if (langSelector) {
    langSelector.addEventListener('change', function() {
      setTimeout(loadMeta, 50);
    });
  }
})();

module.exports = {
    base: '/',
    extend: '@vuepress/theme-default',
    title: 'Lindorof',
    description: "Lindorof's Blog",
    head: [
      ['link', { rel: 'icon', href: '/favicon.ico' }],
      ['link', { rel: 'manifest', href: '/manifest.json' }]
    ],
    serviceWorker: true,
    plugins: [
      '@vuepress/back-to-top',
      '@vuepress/pwa'
    ],
    themeConfig: {
      logo: '/img/logo.jpg',
      lastUpdated: '上次更新',
      search: true,
      searchMaxSuggestions: 20,
      serviceWorker: {
        updatePopup: { 
          message: "文章内容已更新", 
          buttonText: "刷新" 
        }
      },
      nav: [
        { text: '文章清单', link: '/archives' },
        { text: '建站指南', link: '/guide' },
        { text: 'GitHub', link: 'https://github.com/lindorof' }
      ],
      sidebar: 'auto',
      sidebarDepth: 2,
      displayAllHeaders: true,
    }
}
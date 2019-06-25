module.exports = {
    base: '/',
    extend: '@vuepress/theme-default',
    title: 'Lindorof',
    description: "Lindorof's Blog",
    head: [
      ['link', { rel: 'icon', href: `/favicon.ico` }],
      ['link', { rel: 'manifest', href: '/manifest.json' }]
    ],
    serviceWorker: true,
    plugins: [
      '@vuepress/back-to-top',
      '@vuepress/pwa'
    ],
    themeConfig: {
      logo: '/img/logo.jpg',
      lastUpdated: '时间',
      search: true,
      searchMaxSuggestions: 20,
      serviceWorker: {
        updatePopup: { 
          message: "文章内容已更新", 
          buttonText: "刷新" 
        }
      },
      nav: [
        { text: '建站指南', link: '/guide/' },
        { text: '感谢VuePress', link: 'https://v1.vuepress.vuejs.org/zh/' },
        { text: 'GitHub', link: 'https://github.com/lindorof' }
      ],
      sidebar: [
        {
          title: '.NET',
          children: [
            '/tsb/'
          ],
        },
        {
          title: 'C++',
          children: [
            {
              title: '坑爹大全',
              children: [
                '/guide/',
                {
                  title: 'C++面向对象内存模型分析',
                  children: [
                    '/tsbcmp/',
                    '/tsbcmp/cmp'
                  ]
                }
              ]
            }
          ]
        }
      ],
      sidebarDepth: 0,
      displayAllHeaders: true,
    }
}
import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Crypto Stash docs.',
  description:
    'Crypto monitoring system. Live prices, price change in 24h, price change graphs by data range and more.. ',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Introduction', link: '/introduction' },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/Arturas-B112' }],
  },
});

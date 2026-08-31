// @ts-check
import {sortItems} from './sidebarSort.js';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'TSC Code of Ethics',
  tagline: 'Thunder Scientific Corporation',
  favicon: 'img/favicon.ico',

  url: 'https://thunder-scientific.github.io',
  baseUrl: '/code-of-ethics/',
  organizationName: 'Thunder-Scientific',
  projectName: 'code-of-ethics',

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',

  // Volunteer editors type things like {playerName} in rule text.
  // Without 'detect', .md is parsed as MDX and that breaks the build.
  markdown: {
    format: 'detect',
    hooks: {
      onBrokenMarkdownLinks: 'throw',
      onBrokenMarkdownImages: 'throw',
    },
  },

  i18n: { defaultLocale: 'en', locales: ['en'] },

  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        indexBlog: false,
        docsDir: '../',
        docsRouteBasePath: '/',
      },
    ],
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: '../',
          include: ['about/**/*.md', 'section-*/**/*.md'],
          exclude: ['archive/**', 'node_modules/**', 'website/**'],
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
          async sidebarItemsGenerator({defaultSidebarItemsGenerator, ...args}) {
            const items = await defaultSidebarItemsGenerator(args);
            return sortItems(items);
          },
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'TSC Code of Ethics',
        items: [
          {
            href: 'https://github.com/Thunder-Scientific/code-of-ethics',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: { style: 'dark', links: [], copyright: 'Thunder Scientific Corporation' },
    }),
};

export default config;

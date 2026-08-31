// @ts-check

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "TSC Code of Ethics",
  tagline: "Thunder Scientific Corporation",
  favicon: "img/favicon.ico",

  future: {
    v4: true,
  },

  url: "https://coe.thunderscientific.org",
  baseUrl: "/",
  organizationName: "Thunder-Scientific",
  projectName: "code-of-ethics",

  onBrokenLinks: "throw",
  onBrokenAnchors: "throw",

  markdown: {
    format: "detect",
  },

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: "../code-of-ethics",
          routeBasePath: "/",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: "TSC Code of Ethics",
        items: [
          {
            href: "https://github.com/Thunder-Scientific/code-of-ethics",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [],
        copyright: "Thunder Scientific Corporation",
      },

      algolia: {
        appId: '2XJGQPELOG',

        apiKey: '3ac527762eb464d8d0de2e4b8e105de4',

        indexName: 'coe_thunderscientific_org_2xjgqpelog_pages'
      }
    }),
};

export default config;

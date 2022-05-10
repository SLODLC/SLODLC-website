// @ts-nocheck
// Note: type annotations allow type checking and IDEs autocompletion

const codeThemes = {
  github: require('prism-react-renderer/themes/github'),
}

const newNavConfig = [
  {
    position: 'right',
    label: 'Home',
    href: 'https://www.slodlc.com/'
  },
  {
    position: 'right',
    label: 'Join the conversation on Slack',
    href: 'https://sloconf.slack.com/archives/C03D261DJM9'
  },
  {
    position: 'right',
    label: 'Contribute ideas on Git Hub',
    href: 'https://github.com/SLODLC'
  },
]

const math = require('remark-math');
const katex = require('rehype-katex');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'SLODLC',
  tagline: 'The SLO Development Lifecycle',
  url: 'https://www.slodlc.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/logo/favicon.ico',
  organizationName: 'Nobl9', // Usually your GitHub org/user name.
  projectName: 'slodlc', // Usually your repo name.

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
          editUrl: 'https://github.com/nobl9/slodlc',
          remarkPlugins: [math],
          rehypePlugins: [katex],
        },
        blog: false,
        pages: false,
        theme: {
          customCss: require.resolve('./src/css/main.css'),
        },
        //gtag: {
          //trackingID: '[UPDATE GOOGLE TAG HERE]',
          //anonymizeIP: true,
        //},
      }),
    ],
  ],
  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        language: ["en"],
        indexBlog: false,
        docsRouteBasePath: ['/'],
        highlightSearchTermsOnTargetPage: true,
        searchResultLimits: 10,
        translations: {
          "search_placeholder": "Search",
          "see_all_results": "See all results",
          "no_results": "No results.",
          "search_results_for": "Search results for \"{{ keyword }}\"",
          "search_the_documentation": "Search the documentation",
          "count_documents_found": "{{ count }} document found",
          "count_documents_found_plural": "{{ count }} documents found",
          "no_documents_were_found": "No documents were found"
        }
      },
    ]
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        disableSwitch: true,
        defaultMode: 'light',
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: 'SLODLC',
        logo: {
          alt: 'SLODLC Documentation',
          src: '/img/logo/SLODLC_logo_pack_full_color.png',
          height: 56,
          width: 126,
        },
        items: newNavConfig,
      },
      metadata: [
        {name: 'og:image', content: '/img/dog/docu_meta_image_twitter.jpg'}
      ],
      customFields: {
        editPage: false,
        submitFeedback: {
          text: 'Submit Feedback',
          href: 'mailto:slodlc@nobl9.com',
          icon: '/img/footer/icon-message-docu.svg',
        },
	social: {
          github: {
            icon: 'img/footer/github_icon.svg',
            link: 'https://github.com/slodlc',
          },
          twitter: {
            icon: 'img/footer/twitter_icon.svg',
            link: 'https://twitter.com/slodlc1',
          },
        },
      },
      footer: {
        style: 'light',
        logo: {
          alt: 'SLODLC Documentation',
          src: '/img/logo/SLODLC_logo_pack_full_color.png',
          href: '/'
        },
        links: [
          {
            items: [
              {
                label: 'SLODLC Home',
                href: 'https://slodlc.com/',
              },
              {
                label: 'Slack',
                href: 'https://sloconf.slack.com/archives/C03D261DJM9',
              },
              {
                label: 'Git Hub',
                href: 'https://github.com/slodlc',
              },
              {
                label: 'Twitter',
                href: 'https://www.twitter.com/slodlc1',
              },
            ],
          },
          {
            items: [
              {
                label: 'Terms of Use',
                to: 'Release_Notes/Terms/',
              },
            ],
          },
        ],
        copyright: `© 2020 - ${new Date().getFullYear()} Nobl9. All rights reserved.`,
      },
      prism: {
        theme: codeThemes.github,
        darkTheme: codeThemes.github,
      },
    }),
    stylesheets: [
      {
        href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
        type: 'text/css',
        integrity:
          'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
        crossorigin: 'anonymous',
      },
    ],
};

module.exports = config;

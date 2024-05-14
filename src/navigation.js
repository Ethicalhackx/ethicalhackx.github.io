import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Blog',
      href: '/',
    },
    {
      text: 'Hacking101',
      href: '/category/hacking-101',
    },
    {
      text: 'WebAppSec',
      href: '/category/webappsec',
    },
    {
      text: 'SOC/IR',
      href: '#',
    },
    // //
    // {
    //   text: 'Blog',
    //   links: [
    //     {
    //       text: 'SaaS',
    //       href: getPermalink('/homes/saas'),
    //     },
    //     {
    //       text: 'Startup',
    //       href: getPermalink('/homes/startup'),
    //     },
    //     {
    //       text: 'Mobile App',
    //       href: getPermalink('/homes/mobile-app'),
    //     },
    //     {
    //       text: 'Personal',
    //       href: getPermalink('/homes/personal'),
    //     },
    //   ],
    // },//
    {
      text: '$whoami',
      href: "#",
    },
  ],
  actions: [{ text: 'CyberSecurity RoadMap', href: '/roadmap', target: '_blank' }],
};

export const footerData = {
  links: [
    {
      title: 'Services',
      links: [
        { text: 'Security Consulting', href: '#' },
        { text: 'Enterprise Security', href: '#' },
        { text: 'Security Audit', href: '#' },
        { text: 'Pentesting', href: '#' },
      ],
    },
    {
      title: 'Trainings',
      links: [
        { text: 'Trainings', href: '#' },
        { text: 'Mock Interviews', href: '#' },
        { text: '1:1 Guidance', href: '#' },
        { text: 'Career Consulting', href: '#' },
        { text: 'Resume Review', href: '#' },
      ],
    },
    {
      title: 'Product',
      links: [
        { text: 'TBD', href: '#' },
        { text: 'TBD', href: '#' },
        { text: 'TBD', href: '#' },
        { text: 'TBD', href: '#' },
        { text: 'TBD', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { text: 'About', href: '#' },
        { text: 'Blog', href: '#' },
        { text: 'Careers', href: '#' },
        { text: 'Press', href: '#' },
        { text: 'Inclusion', href: '#' },
        { text: 'Social Impact', href: '#' },
        { text: 'Shop', href: '#' },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: 'https://twitter.com/ethicalhackx' },
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: 'https://www.instagram.com/ethicalhackx/' },
    { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: 'https://facebook.com/ethicalhackx' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/ethicalhackx' },
  ],
  footNote: `
    <img class="w-5 h-5 md:w-6 md:h-6 md:-mt-0.5 bg-cover mr-1.5 rtl:mr-0 rtl:ml-1.5 float-left rtl:float-right rounded-sm" src="src/assets/favicons/favicon.ico" alt="onWidget logo" loading="lazy"></img>
    Made using <a class="text-blue-600 underline dark:text-muted" href="https://astro.build/"> Astro</a>
  `,
};
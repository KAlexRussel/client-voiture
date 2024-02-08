import Iconify from 'src/components/iconify';

export const navConfig = [
  {
    title: 'Rechercher',
    icon: <Iconify icon="iconamoon:search-bold" />,
    path: '/search',
  },
  {
    title: 'Publier un trajet',
    icon: <Iconify icon="gridicons:add-outline" />,
    path: '/ride',
  },
  {
    title: 'Événements',
    icon: <Iconify icon="gridicons:add-outline" />,
    path: '/maintenance',
  },
  /* {
    title: 'Informations',
    icon: <Iconify icon="mdi:about-variant" />,
    path: '/buildings/lists',
    children: [
      {
        subheader: 'A propos',
        items: [
          { title: 'Qui sommes nous', path: '/aboutUs' },
          { title: 'Nous contacter', path: '/contactUs' },
        ],
      },
      {
        subheader: 'Aide',
        items: [
          { title: 'FAQs', path: '/faq' },
          { title: 'Pricing', path: '/pricing' },
        ],
      },
      {
        subheader: 'Evenement',
        items: [
          { title: 'Maintenance', path: '/a' },
          { title: 'Coming Soon', path: '/c' },
        ],
      },
    ],
  }, */
];

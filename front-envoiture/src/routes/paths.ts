// utils
import { paramCase } from 'src/utils/change-case';


const ROOTS = {
  DASHBOARD: '/dashboard',
  USER: '/user',
  SEARCH: '/search',
  RIDES: '/ride'
};

// ----------------------------------------------------------------------

export const paths = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  faqs: '/faqs',
  aboutUs: '/qui-somme-nous',
  payment: '/payment',
  page403: '/403',
  page404: '/404',
  page500: '/500',

    // USER ACCOUNT
    user: {
      root: ROOTS.USER,
      profile: (id: any, name: string ) => `${ROOTS.USER}/${id}/${name}`,
    },

    // SEARCH
    search: {
      root: ROOTS.SEARCH,
      trajets: `${ROOTS.SEARCH}/trajets`,
      trajetsDetails: (id: any ) => `${ROOTS.SEARCH}/trajets/${id}`,
    },

    // RIDE
    ride: {
      root: ROOTS.RIDES,
    },
};

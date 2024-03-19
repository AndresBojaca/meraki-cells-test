import {
  bbvaSupport,
  bbvaAddressbook,
  bbvaAtm,
  bbvaAccount,
  bbvaSettings
} from '@bbva-web-components/bbva-foundations-icons';



/*
 * NOTE: "path" field has to be unique, if not it will use the 1st match
 */
export const NAVIGATION = [
  {
    path: '/',
    page: 'login',
  },
  {
    path: '/help',
    page: 'help',
    icon: bbvaSupport,
  },
  {
    path: '/dashboard',
    page: 'dashboard',
    label: 'menu.dashboard',
    event: 'dashboard-click'
  },
  {
    path: '/shareholder/:id',
    page: 'shareholder',
    label: 'menu.account-shareholder',
    event: 'movement-click'
  },
  {
    path: '/update',
    page: 'update',
    label: 'menu.update',
    event: 'update-click'
  },
];

export const ROUTES = NAVIGATION.reduce((res, value) => {
  if (!res[value.page]) {
    res[value.page] = value.path;
  }
  return res;
}, {});

export const MENU_ITEMS = NAVIGATION.filter((ev) => ev.label).map((ev) => {
  delete ev.path;
  const res = ev;
  if (ev.icon) {
    res.icon = ev.icon();
  }
  return res;
});

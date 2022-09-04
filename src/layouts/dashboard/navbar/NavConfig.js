// components
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  user: getIcon('ic_user'),
  dashboard: getIcon('dashboard'),
  campaign: getIcon('campaign'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general v3.5.0',
    items: [
      { title: 'Dashoard', path: '/dashboard/one', icon: ICONS.dashboard },
      { title: 'Campaign', path: '/add-campaign', icon: ICONS.campaign },
      { title: 'Login', path: '/login', icon: ICONS.user },
      { title: 'Register', path: '/register', icon: ICONS.user },
      { title: 'Invoice', path: '/invoices', icon: ICONS.user },
      // { title: 'Three', path: '/dashboard/three', icon: ICONS.analytics },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'management',
  //   items: [
  //     {
  //       title: 'user',
  //       path: '/dashboard/user',
  //       icon: ICONS.user,
  //       children: [
  //         { title: 'Four', path: '/dashboard/user/four' },
  //         { title: 'Five', path: '/dashboard/user/five' },
  //         { title: 'Six', path: '/dashboard/user/six' },
  //       ],
  //     },
  //   ],
  // },
];

export default navConfig;

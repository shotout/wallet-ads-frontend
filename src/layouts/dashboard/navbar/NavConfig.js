// components
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/assets/nav/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  dashboard: getIcon('nav_dashboard'),
  campaign: getIcon('nav_add_campaign'),
  audience: getIcon('nav_audience'),
  integration: getIcon('nav_integration'),
  invoices: getIcon('nav_invoices'),
  settings: getIcon('nav_setting'),
};

const sidebarConfig = [
  {
    items: [
      { title: 'Overview (Coming Soon)', path: '/dashboard/overview', icon: ICONS.dashboard, disabled: true },
      { title: 'Create a campaign', path: '/dashboard/add-campaign', icon: ICONS.campaign },
      { title: 'Invoices', path: '/dashboard/invoices', icon: ICONS.invoices },
      { title: 'Integrations (Coming Soon)', path: '/dashboard/integrations', icon: ICONS.integration,disabled: true },
      { title: 'Audience Manager (Coming Soon)', path: '/dashboard/audience-manager', icon: ICONS.audience,disabled: true },
      { title: 'Settings', path: '/dashboard/setting-user', icon: ICONS.settings },
    ],
  },
];

export default sidebarConfig;

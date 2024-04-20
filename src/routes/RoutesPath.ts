export const TAX_PROFESSIONALS = 'professional';

const routesPath = {
  ALL: '*',
  DEFAULT: '/',
  DASHBOARD: '/dashboard',
  SOURCE: '/source',
  CONNECT_EXCHANGE: '/connect-exchange',
  TRANSACTION: '/transaction',
  TAX_REPORT: '/tax-summary/tax-report',
  TDS_TRACKER: '/tax-summary/tds-tracker',
  SIGNUP: '/signup',
  VERIFY: '/verify',
  SIGNIN: '/signin',
  FORGOT: '/forgot',
  RESET: '/reset',
  RECOVER: '/recover',
  SETTINGS: '/settings',
  RESOLVE_ERRORS: '/resolve-errors',
  TAX_PROFESSIONAL_INVITES: '/tax-summary/tax-professional-invites',
  TAX_PROFESSIONALS: `/${TAX_PROFESSIONALS}`,
  ACCOUNT_SETUP: '/account-setup'
};

export default routesPath;

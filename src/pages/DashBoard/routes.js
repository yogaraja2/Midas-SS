import { commonRoute } from '../../config/routes'
import Debt from './Debt'
import Balance from './Balance'
import CashFlow from './CashFlow'
import CashFlowEntry from './CashFlowEntry'
import Stats from './Stats'
import UserProfile from './UserProfile'
import MainDash from './MainDash'

export const dashboardRoutes = [
  {
    name: 'Main Dashboard',
    props: {
      path: commonRoute.dashboard.mainDash,
      component: MainDash,
      exact: true
    },
    redirection: {
      path: commonRoute.dashboard.default,
      exact: true,
      to: commonRoute.dashboard.MainDash
    }
  },
  {
    name: 'Cash Flow',
    props: {
      path: commonRoute.dashboard.cashFlow,
      component: CashFlow,
      exact: true
    },
    // redirection: {
    //   path: commonRoute.dashboard.default,
    //   exact: true,
    //   to: commonRoute.dashboard.cashFlow
    // }
  },
  {
    name: 'Cash Flow Entry',
    props: {
      path: commonRoute.dashboard.cashFlowEntry,
      component: CashFlowEntry,
      exact: true
    }
  },
  {
    name: 'Balance',
    props: {
      path: commonRoute.dashboard.balance,
      component: Balance,
      exact: true
    }
  },
  {
    name: 'Stats',
    props: {
      path: commonRoute.dashboard.stats,
      component: Stats,
      exact: true
    }
  },
  {
    name: 'Debt',
    props: {
      path: commonRoute.dashboard.debt,
      component: Debt,
      exact: true
    }
  },
  {
    name: 'UserProfile',
    props: {
      path: commonRoute.dashboard.userProfile,
      component: UserProfile,
      exact: true
    }
  }
]

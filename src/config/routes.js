export const commonRoute = {
  home: '/',
  account: '/account/:screen?',
  selectRole: '/selectRole',
  gameOptions: '/gamehome',
  selectAvatar: '/selectAvatar',
  selectDreams: '/selectDreams',
  leaderboard: '/leaderBoard',

  dashboard: {
    default: '/dashBoard',
    mainDash: '/dashBoard/mainDash',
    cashFlow: '/dashBoard/cashFlow',
    cashFlowEntry: '/dashBoard/cashFlow/entry',
    nextTurn: '/nextTurn',
    balance: '/dashBoard/balance',
    stats: '/dashBoard/stats',
    debt: '/dashBoard/debt',
    userProfile: '/dashBoard/userProfile'
  },

  instructorLogin: {
    default: '/instructor',
    instructorHome: '/instructor/home',
    studentsLeaderboard: '/instructor/studentsLeaderboard',
    studentsList: '/instructor/studentsList',
    studentStats: '/instructor/studentStats',
  },

  schoolAdminLogin: {
    default: '/schoolAdmin',
    schoolAdminHome: '/schoolAdmin/home',
    studentsLeaderboard: '/schoolAdmin/studentsLeaderboard',
    instructorsList: '/schoolAdmin/instructorsList',
    studentsList: '/schoolAdmin/studentsList',
    studentStats: '/schoolAdmin/studentStats',
  }
}

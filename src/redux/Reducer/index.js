import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


import signupReducer from './signupReducer'
import LoginReducer from './LoginReducer'
import avatarReducer from './avatarReducer'
import dashboardReducer from './dashboardReducer'
import cashFlowReducer from './cashFlowReducer'
import CashflowApiReducer from './CashflowApiReducer'
import BalanceApiReducer from './BalanceApiReducer'
import DebtApiReducer from './DebtApiReducer'
import EventsReducer from './EventsReducer'
import EventCountReducer from './EventCountReducer'
import DreamsReducer from './DreamsReducer'
import StudentsListReducer from './StudentsListReducer'
import StudentDetailReducer from './StudentDetailReducer'
import OrganizationReducer from './OrganizationReducer'
import InstructorReducer from './InstructorReducer'
import PageNoReducer from './PageNoReducer'

export const rootReducers = combineReducers({
    signupData: signupReducer,
    loginData: LoginReducer,
    selectAvatar: avatarReducer,
    dashboard: dashboardReducer,
    cashFlowValues: cashFlowReducer,
    cashFlowData: CashflowApiReducer,
    balancesheetData: BalanceApiReducer,
    debtData: DebtApiReducer,
    events: EventsReducer,
    eventCount: EventCountReducer,
    dreams: DreamsReducer,
    studentsList: StudentsListReducer,
    studentDetail: StudentDetailReducer,
    organizations: OrganizationReducer,
    instructors: InstructorReducer,
    pageNo: PageNoReducer,
})

const configStorage = {
    key: 'root',
    storage,
    whitelist: [
        'signupData',
        'loginData',
        'organizations',
        'instructors',
        'selectAvatar',
        'dashboard',
        'cashFlowValues',
        'cashFlowData',
        'events',
        'eventCount',
        'dreams',
        'studentsList',
        'studentDetail',
        'pageNo'
    ]
}

export default persistReducer(configStorage, rootReducers);



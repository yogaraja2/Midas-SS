import { commonRoute } from "../../config/routes";
import Home from './Home'
import LeaderBoard from './LeaderBoard'
import InstructorsList from './InstructorsList'
import StudentsList from './StudentsList'
import StudentDetails from './StudentDetails'


export const schoolAdminRoutes = [
    {
        name: "SchoolAdmin Home",
        props: {
            path: commonRoute.schoolAdminLogin.schoolAdminHome,
            component: Home,
            exact: true
        },
        redirection: {
            path: commonRoute.home,
            exact: true,
            to: commonRoute.schoolAdminLogin.schoolAdminHome
        }
    },
    {
        name: "Students LeaderBoard",
        props: {
            path: commonRoute.schoolAdminLogin.studentsLeaderboard,
            component: LeaderBoard,
            exact: true
        },
    },
    {
        name: "Instructors List",
        props: {
            path: commonRoute.schoolAdminLogin.instructorsList,
            component: InstructorsList,
            exact: true
        },
    },
    {
        name: "Students List",
        props: {
            path: commonRoute.schoolAdminLogin.studentsList,
            component: StudentsList,
            exact: true
        },
    },
    {
        name: "Student Detail",
        props: {
            path: commonRoute.schoolAdminLogin.studentStats,
            component: StudentDetails,
            exact: true
        },
    },
]
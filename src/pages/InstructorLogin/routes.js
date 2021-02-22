import { commonRoute } from "../../config/routes";
import Home from './Home'
import LeaderBoard from './LeaderBoard'
import StudentsList from './StudentsList'
import StudentDetails from './StudentDetails'

export const instructorRoutes = [
    {
        name: "Instructor Home",
        props: {
            path: commonRoute.instructorLogin.instructorHome,
            component: Home,
            exact: true
        },
        redirection: {
            path: commonRoute.home,
            exact: true,
            to: commonRoute.instructorLogin.instructorHome
        }
    },
    {
        name: "Students LeaderBoard",
        props: {
            path: commonRoute.instructorLogin.studentsLeaderboard,
            component: LeaderBoard,
            exact: true
        },
    },
    {
        name: "Students List",
        props: {
            path: commonRoute.instructorLogin.studentsList,
            component: StudentsList,
            exact: true
        },
    },
    {
        name: "Student Details",
        props: {
            path: commonRoute.instructorLogin.studentStats,
            component: StudentDetails,
            exact: true
        },
    },
]
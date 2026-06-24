import { createBrowserRouter } from "react-router"
import Login from "./features/auth/pages/Login"
import Register from "./features/auth/pages/Register"
import { Protected, AuthProtected } from "./features/auth/components/Protected"
import Home from "./features/interview/pages/Home"
import Interview from "./features/interview/pages/interview"
import InterviewReports from "./features/interview/pages/InterviewReports"
import NotFound from "./NotFound"

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <AuthProtected><Login /></AuthProtected>
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/",
        element: <Protected><Home /></Protected>
    },
    {
        path: "/interview/:interviewId",
        element: <Protected><Interview /></Protected>
    },
    {
        path: "/interview",
        element: <Protected><InterviewReports /></Protected>
    },
    {
        path: "*",
        element: <NotFound />
    }
])
import { authPaths } from "@/routes/paths"
import { lazy } from "react"
import { Routes, Route, Navigate } from "react-router-dom"

const rootPath = "auth"

const paths = [
  {
    path: authPaths.SIGNIN,
    element: lazy(() => import("./Login/Login")),
  },
  {
    path: authPaths.FORGOT_PASSWORD,
    element: lazy(() => import("./Login/ForgotPassword")),
  },
  {
    path: authPaths.RESET_PASSWORD,
    element: lazy(() => import("./Login/PasswordReset")),
  },
  {
    path: authPaths.SIGNUP,
    element: lazy(() => import("./Signup/Signup")),
  },
  {
    path: authPaths.RETRIEVE,
    element: lazy(() => import("./Signup/Retrieverecord")),
  },
  {
    path: authPaths.EMAIL_VERIFICATION,
    element: lazy(() => import("./EmailVerification")),
  },
  {
    path: authPaths.APPLY,
    element: lazy(() => import("./Signup/Application")),
  },
]

const Index = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={`/${rootPath}${authPaths.SIGNIN}`} replace />}
      />
      {paths.map(({ path, element: Element }) => (
        <Route key={path} path={path} element={<Element />} />
      ))}
    </Routes>
  )
}

export default Index

import { homePaths } from "@/routes/paths"
import { lazy } from "react"
import { Routes, Route } from "react-router-dom"

const paths = [
  {
    path: homePaths.HOME,
    element: lazy(() => import("./Home/HomePage")),
  },
  {
    path: homePaths.CONTACT,
    element: lazy(() => import("./ContactPage")),
  },
  {
    path: homePaths.FAQ,
    element: lazy(() => import("./FAQPage")),
  },
  {
    path: homePaths.PRIVACY_POLICY,
    element: lazy(() => import("./PrivacyPolicy")),
  },
  {
    path: homePaths.REGISTER,
    element: lazy(() => import("../Auth/Signup/Signup")),
  },
]

const Index = () => {
  return (
    <Routes>
      {paths.map(({ path, element: Element }) => (
        <Route key={path} path={path} element={<Element />} />
      ))}
    </Routes>
  )
}

export default Index

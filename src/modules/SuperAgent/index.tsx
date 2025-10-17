import { superAgent } from "@/routes/paths"
import { lazy } from "react"
import { Routes, Route, Navigate } from "react-router-dom"

const paths = [
  {
    path: superAgent.DASHBOARD,
    element: lazy(() => import("./Dashboard")),
  },
  {
    path: superAgent.AGENTS,
    element: lazy(() => import("./Agents")),
  },
  {
    path: superAgent.AGENTS_DETAILS,
    element: lazy(() => import("./Agents/AgentsDetails")),
  },
  {
    path: superAgent.Driver,
    element: lazy(() => import("./Driver")),
  },
  {
    path: superAgent.Driver_REGISTER,
    element: lazy(() => import("./Driver/RegisterDriver")),
  },
  {
    path: superAgent.CLAIMS,
    element: lazy(() => import("./Claims")),
  },
  {
    path: superAgent.SUBMISSIONS,
    element: lazy(() => import("./Submissions")),
  },
  {
    path: superAgent.SUBMISSIONS_DETAILS,
    element: lazy(() => import("./Submissions/SubmissionsDetails")),
  },
  {
    path: superAgent.COMPLAINTS,
    element: lazy(() => import("./Complaints")),
  },
  {
    path: superAgent.PROFILE,
    element: lazy(() => import("./Profile")),
  },
  {
    path: superAgent.KYCFORM,
    element: lazy(() => import("./Kyc")),
  },
  {
    path: superAgent.VERIFYPAYMENT,
    element: lazy(() => import("./VerifyPayment")),
  },
  {
    path: superAgent.TRANSACTIONS,
    element: lazy(() => import("./Transactions")),
  },
  {
    path: superAgent.NOTIFICATIONS,
    element: lazy(() => import("./Notifications")),
  },
  {
    path: superAgent.PAYMENTS,
    element: lazy(() => import("./Payments")),
  },
]

const Index = () => {
  return (
    <Routes>
      <Route
        path="*"
        element={<Navigate to={`${superAgent.DASHBOARD}`} replace />}
      />
      {paths.map(({ path, element: Element }) => (
        <Route key={path} path={path} element={<Element />} />
      ))}
    </Routes>
  )
}

export default Index

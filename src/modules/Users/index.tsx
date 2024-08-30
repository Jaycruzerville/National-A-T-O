import { users } from "@/routes/paths"
import { lazy } from "react"
import { Routes, Route, Navigate } from "react-router-dom"

const paths = [
  {
    path: users.DASHBOARD,
    element: lazy(() => import("./Dashboard")),
  },
  {
    path: users.AGENTS,
    element: lazy(() => import("./Agents")),
  },
  {
    path: users.CLAIMS,
    element: lazy(() => import("./Claims")),
  },
  {
    path: users.CLAIMS_DETAILS,
    element: lazy(() => import("./Claims/ClaimsDetails")),
  },
  {
    path: users.AGENTS_DETAILS,
    element: lazy(() => import("./Agents/AgentsDetails")),
  },
  {
    path: users.SUPERAGENTS,
    element: lazy(() => import("./SuperAgents")),
  },
  {
    path: users.SUPERAGENTS_DETAILS,
    element: lazy(() => import("./SuperAgents/SuperAgentsDetails")),
  },
  {
    path: users.Driver,
    element: lazy(() => import("./Driver")),
  },
  {
    path: users.Driver_DETAILS,
    element: lazy(() => import("./Driver/DriverDetails")),
  },
  {
    path: users.Driver_REGISTER,
    element: lazy(() => import("./Driver/RegisterDriver")),
  },
  {
    path: users.CUSTOMERS,
    element: lazy(() => import("./Customers")),
  },
  {
    path: users.CUSTOMERS_DETAILS,
    element: lazy(() => import("./Customers/CustomersDetails")),
  },
  {
    path: users.SERVICEPROVIDERS,
    element: lazy(() => import("./ServiceProviders")),
  },
  {
    path: users.SERVICEPROVIDERS_DETAILS,
    element: lazy(() => import("./ServiceProviders/ServiceProviderDetails")),
  },
  {
    path: users.PROFILE,
    element: lazy(() => import("./Profile")),
  },
  {
    path: users.KYCFORM,
    element: lazy(() => import("./Kyc")),
  },
  {
    path: users.TRANSACTIONS,
    element: lazy(() => import("./Transactions")),
  },
  {
    path: users.NOTIFICATIONS,
    element: lazy(() => import("./Notifications")),
  },
  {
    path: users.PAYMENTS,
    element: lazy(() => import("./Payments")),
  },
]

const Index = () => {
  return (
    <Routes>
      <Route
        path="*"
        element={<Navigate to={`${users.DASHBOARD}`} replace />}
      />
      {paths.map(({ path, element: Element }) => (
        <Route
          key={path}
          path={path}
          element={
            <Element
              onClose={function (): void {
                throw new Error("Function not implemented.")
              }}
              selectedProduct={""}
            />
          }
        />
      ))}
    </Routes>
  )
}

export default Index

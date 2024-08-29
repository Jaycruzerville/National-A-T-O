import { superAdmin } from "@/routes/paths"
import { lazy } from "react"
import { Routes, Route, Navigate } from "react-router-dom"

const paths = [
  {
    path: superAdmin.DASHBOARD,
    element: lazy(() => import("./Dashboard")),
  },
  {
    path: superAdmin.AGENTS,
    element: lazy(() => import("./Agents")),
  },
  {
    path: superAdmin.CLAIMS,
    element: lazy(() => import("./Claims")),
  },
  {
    path: superAdmin.CLAIMS_DETAILS,
    element: lazy(() => import("./Claims/ClaimsDetails")),
  },
  {
    path: superAdmin.AGENTS_DETAILS,
    element: lazy(() => import("./Agents/AgentsDetails")),
  },
  {
    path: superAdmin.SUPERAGENTS,
    element: lazy(() => import("./SuperAgents")),
  },
  {
    path: superAdmin.SUPERAGENTS_DETAILS,
    element: lazy(() => import("./SuperAgents/SuperAgentsDetails")),
  },
  {
    path: superAdmin.Property,
    element: lazy(() => import("./Property")),
  },
  {
    path: superAdmin.Property_DETAILS,
    element: lazy(() => import("./Property/PropertyDetails")),
  },
  {
    path: superAdmin.Property_REGISTER,
    element: lazy(() => import("./Property/RegisterProperty")),
  },
  {
    path: superAdmin.CUSTOMERS,
    element: lazy(() => import("./Customers")),
  },
  {
    path: superAdmin.CUSTOMERS_DETAILS,
    element: lazy(() => import("./Customers/CustomersDetails")),
  },
  {
    path: superAdmin.SERVICEPROVIDERS,
    element: lazy(() => import("./ServiceProviders")),
  },
  {
    path: superAdmin.SERVICEPROVIDERS_DETAILS,
    element: lazy(() => import("./ServiceProviders/ServiceProviderDetails")),
  },
  {
    path: superAdmin.PROFILE,
    element: lazy(() => import("./Profile")),
  },
  {
    path: superAdmin.KYCFORM,
    element: lazy(() => import("./Kyc")),
  },
  {
    path: superAdmin.TRANSACTIONS,
    element: lazy(() => import("./Transactions")),
  },
  {
    path: superAdmin.NOTIFICATIONS,
    element: lazy(() => import("./Notifications")),
  },
  {
    path: superAdmin.PAYMENTS,
    element: lazy(() => import("./Payments")),
  },
]

const Index = () => {
  return (
    <Routes>
      <Route
        path="*"
        element={<Navigate to={`${superAdmin.DASHBOARD}`} replace />}
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

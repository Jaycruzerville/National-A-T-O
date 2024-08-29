import { Admin } from "@/routes/paths"
import { lazy } from "react"
import { Routes, Route, Navigate } from "react-router-dom"

const paths = [
  {
    path: Admin.DASHBOARD,
    element: lazy(() => import("./Dashboard")),
  },
  {
    path: Admin.APPLICATION,
    element: lazy(() => import("./Applications")),
  },
  {
    path: Admin.Charges,
    element: lazy(() => import("./Charges")),
  },
  {
    path: Admin.CLAIMS,
    element: lazy(() => import("./Claims")),
  },
  {
    path: Admin.CLAIMS_DETAILS,
    element: lazy(() => import("./Claims/ClaimsDetails")),
  },
  {
    path: Admin.APPLICATION_DETAILS,
    element: lazy(() => import("./Applications/ApplicationDetails")),
  },
  {
    path: Admin.SUPERAGENTS,
    element: lazy(() => import("./SuperAgents")),
  },
  {
    path: Admin.SUPERAGENTS_DETAILS,
    element: lazy(() => import("./SuperAgents/SuperAgentsDetails")),
  },
  {
    path: Admin.Property,
    element: lazy(() => import("./Property")),
  },
  {
    path: Admin.Property_DETAILS,
    element: lazy(() => import("./Property/PropertyDetails")),
  },
  {
    path: Admin.PROPERTY_VNO,
    element: lazy(() => import("./Property/VNOProperty")),
  },
  {
    path: Admin.PROPERTY_VWO,
    element: lazy(() => import("./Property/VWOProperty")),
  },
  {
    path: Admin.CUSTOMERS,
    element: lazy(() => import("./Customers")),
  },
  {
    path: Admin.CUSTOMERS_DETAILS,
    element: lazy(() => import("./Customers/CustomersDetails")),
  },
  {
    path: Admin.SERVICEPROVIDERS,
    element: lazy(() => import("./ServiceProviders")),
  },
  {
    path: Admin.SERVICEPROVIDERS_DETAILS,
    element: lazy(() => import("./ServiceProviders/ServiceProviderDetails")),
  },
  {
    path: Admin.PROFILE,
    element: lazy(() => import("./Profile")),
  },
  {
    path: Admin.TRANSACTIONS,
    element: lazy(() => import("./Transactions")),
  },
  {
    path: Admin.NOTIFICATIONS,
    element: lazy(() => import("./Notifications")),
  },
]

const Index = () => {
  return (
    <Routes>
      <Route
        path="*"
        element={<Navigate to={`${Admin.DASHBOARD}`} replace />}
      />
      {paths.map(({ path, element: Element }) => (
        <Route key={path} path={path} element={<Element />} />
      ))}
    </Routes>
  )
}

export default Index

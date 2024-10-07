import { agents } from "@/routes/paths"
import { lazy } from "react"
import { Routes, Route, Navigate } from "react-router-dom"

const paths = [
  {
    path: agents.DASHBOARD,
    element: lazy(() => import("./Dashboard")),
  },

  {
    path: agents.CLAIMS,
    element: lazy(() => import("./Claims")),
  },
  {
    path: agents.CLAIMS_DETAILS,
    element: lazy(() => import("./Claims/ClaimsDetails")),
  },

  {
    path: agents.Driver,
    element: lazy(() => import("./Driver")),
  },
  {
    path: agents.Driver_DETAILS,
    element: lazy(() => import("./Driver/DriverDetails")),
  },
  {
    path: agents.Driver_REGISTER,
    element: lazy(() => import("./Driver/RegisterDriver")),
  },
  {
    path: agents.PROFILE,
    element: lazy(() => import("./Profile")),
  },
  {
    path: agents.KYCFORM,
    element: lazy(() => import("./Kyc")),
  },
  {
    path: agents.VERIFYPAYMENT,
    element: lazy(() => import("./VerifyPayment")),
  },
  {
    path: agents.TRANSACTIONS,
    element: lazy(() => import("./Transactions")),
  },
  {
    path: agents.NOTIFICATIONS,
    element: lazy(() => import("./Notifications")),
  },
  {
    path: agents.PAYMENTS,
    element: lazy(() => import("./Payments")),
  },
]

const Index = () => {
  return (
    <Routes>
      <Route
        path="*"
        element={<Navigate to={`${agents.DASHBOARD}`} replace />}
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

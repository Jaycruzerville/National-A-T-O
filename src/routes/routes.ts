import { lazy } from "react"
import LandingLayout from "@/layout/LandingLayout"
import AdminLayout from "@/layout/AdminLayout"
import SuperAdminLayout from "@/layout/SuperAdminLayout"

export const baseRoutes = [
  {
    path: "/",
    exact: true,
    Component: lazy(() => import("@/modules/LandingPages")),
    layout: LandingLayout,
  },
  {
    path: "/auth/*",
    exact: true,
    Component: lazy(() => import("@/modules/Auth")),
  },
  {
    path: "/",
    exact: true,
    Component: lazy(() => import("@/modules/SuperAdmin")),
    layout: AdminLayout,
    isAuthenticated: true,
  },
]

export const superAdminRoutes = [
  {
    path: "/*",
    exact: true,
    Component: lazy(() => import("@/modules/SuperAdmin")),
    layout: SuperAdminLayout,
    isAuthenticated: true,
  },
]
export const adminRoutes = [
  {
    path: "/*",
    exact: true,
    Component: lazy(() => import("@/modules/Admin")),
    layout: AdminLayout,
    isAuthenticated: true,
  },
]

export const agentRoutes = [
  {
    path: "*",
    exact: true,
    Component: lazy(() => import("@/modules/Agent")),
    isAuthenticated: true,
  },
]

export const superAgentRoutes = [
  {
    path: "/",
    exact: true,
    Component: lazy(() => import("@/modules/SuperAgent")),
    isAuthenticated: true,
  },
]

// import { lazy } from "react"
// import LandingLayout from "@/layout/LandingLayout"
// import AdminLayout from "@/layout/AdminLayout"
// import SuperAdminLayout from "@/layout/SuperAdminLayout"

// export const baseRoutes = [
//   {
//     path: "/",
//     Component: lazy(() => import("@/modules/LandingPages")),
//     layout: LandingLayout,
//   },
//   {
//     path: "/auth/*",
//     Component: lazy(() => import("@/modules/Auth")),
//   },
//   {
//     path: "/dash/*",
//     Component: lazy(() => import("@/modules/SuperAdmin")),
//     layout: AdminLayout,
//     isAuthenticated: true, // Assuming this requires authentication
//   },
// ]

// export const superAdminRoutes = [
//   {
//     path: "/super-admin/*",
//     Component: lazy(() => import("@/modules/SuperAdmin")),
//     layout: SuperAdminLayout,
//     isAuthenticated: true,
//   },
// ]

// export const adminRoutes = [
//   {
//     path: "/admin/*",
//     Component: lazy(() => import("@/modules/Admin")),
//     layout: AdminLayout,
//     isAuthenticated: true,
//   },
// ]

// export const agentRoutes = [
//   {
//     path: "/agent/*",
//     Component: lazy(() => import("@/modules/Agent")),
//     isAuthenticated: true,
//   },
// ]

// export const superAgentRoutes = [
//   {
//     path: "/super-agent/*",
//     Component: lazy(() => import("@/modules/SuperAgent")),
//     isAuthenticated: true,
//   },
// ]

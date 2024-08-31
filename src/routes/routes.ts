import { lazy } from "react"
import LandingLayout from "@/layout/LandingLayout"
import AdminLayout from "@/layout/AdminLayout"
import usersLayout from "@/layout/UsersLayout"
import agentsLayout from "@/layout/AgentLayout"

export const baseRoutes = [
  {
    path: "/",
    exact: true,
    Component: lazy(() => import("@/modules/LandingPages")),
    layout: LandingLayout,
  },
  {
    path: "/faq",
    exact: true,
    Component: lazy(() => import("@/modules/LandingPages/FAQPage")),
    layout: LandingLayout,
  },
  {
    path: "/privacy-policy",
    exact: true,
    Component: lazy(() => import("@/modules/LandingPages/PrivacyPolicy")),
    layout: LandingLayout,
  },
  {
    path: "/contact",
    exact: true,
    Component: lazy(() => import("@/modules/LandingPages/ContactPage")),
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
    Component: lazy(() => import("@/modules/Users")),
    layout: AdminLayout,
    isAuthenticated: true,
  },
]

export const usersRoutes = [
  {
    path: "/*",
    exact: true,
    Component: lazy(() => import("@/modules/Users")),
    layout: usersLayout,
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
    path: "/*",
    exact: true,
    Component: lazy(() => import("@/modules/Agent")),
    layout: agentsLayout,
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
// import usersLayout from "@/layout/usersLayout"

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
//     Component: lazy(() => import("@/modules/users")),
//     layout: AdminLayout,
//     isAuthenticated: true, // Assuming this requires authentication
//   },
// ]

// export const usersRoutes = [
//   {
//     path: "/super-admin/*",
//     Component: lazy(() => import("@/modules/users")),
//     layout: usersLayout,
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

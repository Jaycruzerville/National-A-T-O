import Api from "@/utils/api"
import { IError } from "@/types"
import Auth from "@/utils/auth"

import handleApiError from "@/utils/handleApiError"

const getAgents = async ({ queryKey }: { queryKey: unknown[] }) => {
  const params = queryKey[1] as Record<string, unknown> | undefined
  try {
    const { data } = await Api.get("/agents", { params })
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}
const getAgentCustomers = async (
  id: string,
  params: Record<string, unknown>
) => {
  try {
    const { data } = await Api.get(`/agents/${id}/customers`, { params })
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const getAgentDetails = async (id: string) => {
  try {
    const { data } = await Api.get(`/agents/${id}`)
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const getAgentSummary = async (id: string) => {
  try {
    const { data } = await Api.get(`/agents/${id}/user-summary`)
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const getAgentTransactions = async (id: string) => {
  try {
    const { data } = await Api.get(`/agents/${id}/transactions-summary`)
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const getSuperAgents = async ({ queryKey }: { queryKey: unknown[] }) => {
  const params = queryKey[1] as Record<string, unknown> | undefined
  try {
    const { data } = await Api.get("/super-agents/", { params })
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const getSuperAgentCustomers = async ({
  queryKey,
}: {
  queryKey: unknown[]
}) => {
  const params = queryKey[1] as Record<string, unknown> | undefined
  try {
    const { data } = await Api.get(
      `/super-agents/${params?.id}/customers/`,
      params
    )
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const getSuperAgentDetails = async ({ queryKey }: { queryKey: unknown[] }) => {
  const params = queryKey[1] as Record<string, unknown> | undefined

  try {
    const { data } = await Api.get(`/super-agents/${params?.id}/`)
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const getSuperAgentSummary = async ({ queryKey }: { queryKey: unknown[] }) => {
  const params = queryKey[1] as Record<string, unknown> | undefined
  try {
    const { data } = await Api.get(`/super-agents/${params?.id}/user-summary`, {
      params,
    })
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const getSuperAgentTransactions = async ({
  queryKey,
}: {
  queryKey: unknown[]
}) => {
  const params = queryKey[1] as Record<string, unknown> | undefined
  try {
    const { data } = await Api.get(
      `/super-agents/${params?.id}/transactions-summary`,
      { params }
    )
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const addSuperAgent = async (params?: Record<string, unknown>) => {
  try {
    const { data } = await Api.post("/Driver/", params)
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const toggleAgentStatus = async (params: Record<string, unknown>) => {
  try {
    const { data } = await Api.patch(
      `/${params.userType}/${params.id}/status/`,
      params
    )
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const addAgent = async (params?: Record<string, unknown>) => {
  try {
    const { data } = await Api.post("/auth/users/invitations/", params)
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const getCustomers = async ({ queryKey }: { queryKey: unknown[] }) => {
  const params = queryKey[1] as Record<string, unknown> | undefined
  try {
    const { data } = await Api.get("/api/v1/users/customers/search", { params })
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const getCustomerDetails = async ({ queryKey }: { queryKey: unknown[] }) => {
  const params = queryKey[1] as Record<string, unknown> | undefined

  try {
    const { data } = await Api.get(`/customers/${params?.id}/`)
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const getCustomerPlans = async ({ queryKey }: { queryKey: unknown[] }) => {
  const params = queryKey[1] as Record<string, unknown> | undefined

  try {
    const { data } = await Api.get(`/customers/${params?.id}/plans`)
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const getCustomerClaims = async ({ queryKey }: { queryKey: unknown[] }) => {
  const params = queryKey[1] as Record<string, unknown> | undefined

  try {
    const { data } = await Api.get(`/customers/${params?.id}/claims`)
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const getCustomersTransactions = async ({
  queryKey,
}: {
  queryKey: unknown[]
}) => {
  const params = queryKey[1] as Record<string, unknown> | undefined
  try {
    const { data } = await Api.get(
      `/customers/${params?.id}/transactions-summary`,
      { params }
    )
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const getApplications = async ({ queryKey }: { queryKey: unknown[] }) => {
  const params = queryKey[1] as Record<string, unknown>
  try {
    const { data } = await Api.get("/api/v1/applications", { params })
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const getClaims = async ({ queryKey }: { queryKey: unknown[] }) => {
  const params = queryKey[1] as Record<string, unknown> | undefined

  try {
    const { data } = await Api.get(`/claims`, { params })
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const handleApplication = async (
  applicationId: string,
  payload: Record<string, any>
) => {
  try {
    const { data } = await Api.patch(
      `/api/v1/applications/${applicationId}`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const getClaimsDetails = async (applicationId: string) => {
  try {
    const { data } = await Api.get(`/api/v1/applications/${applicationId}`)
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const getCustomerApplications = async (
  customerId: string,
  params: { pageNo?: number; pageSize?: number } = { pageNo: 0, pageSize: 10 }
) => {
  try {
    const { data } = await Api.get(
      `/api/v1/applications/customer/${customerId}`,
      { params }
    )
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const toggleClaimsStatus = async (params?: Record<string, unknown>) => {
  try {
    const { data } = await Api.patch(
      `/customers/${params?.customer_id}/claims/${params?.claim_id}/`,
      params?.data
    )
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const editUser = async (formData?: FormData) => {
  const id = formData?.get("id")
  const userType = formData?.get("userType")
  formData?.delete("id")
  formData?.delete("userType")
  try {
    const { data } = await Api.patch(`/${userType}s/${id}/`, formData)
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const getTransactions = async ({ queryKey }: { queryKey: unknown[] }) => {
  const params = queryKey[1] as Record<string, unknown> | undefined
  try {
    const { data } = await Api.get("/transactions/", { params })
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const getTransactionsStats = async () => {
  try {
    const { data } = await Api.get("/transactions/stats/")
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const getTransactionsDetails = async ({
  queryKey,
}: {
  queryKey: unknown[]
}) => {
  const params = queryKey[1] as Record<string, unknown> | undefined
  try {
    const { data } = await Api.get(`/transactions/${params?.id}`)
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const getProperties = async ({ queryKey }: { queryKey: unknown[] }) => {
  const params = queryKey[1] as Record<string, unknown> | undefined
  const customerId = params?.customerId || Auth.getCustomerId()
  if (!customerId) {
    throw new Error("Customer ID is missing")
  }

  try {
    const { data } = await Api.get(
      `/api/v1/properties/customer/${customerId}`,
      { params }
    )
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const getPropertiesByState = async ({ queryKey }: { queryKey: unknown[] }) => {
  const params = queryKey[1] as Record<string, unknown> | undefined
  const state = queryKey[2] as string

  if (!state) {
    throw new Error("State is missing")
  }

  try {
    const { data } = await Api.get(`/api/v1/properties/state/${state}`, {
      params,
    })
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const getVerifiedWithOwnersProperties = async ({
  queryKey,
}: {
  queryKey: unknown[]
}) => {
  const params = queryKey[1] as Record<string, unknown> | undefined
  try {
    const { data } = await Api.get("/api/v1/properties/verified-with-owners", {
      params,
    })
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const getVerifiedNoOwnersProperties = async ({
  queryKey,
}: {
  queryKey: unknown[]
}) => {
  const params = queryKey[1] as Record<string, unknown> | undefined
  try {
    const { data } = await Api.get("/api/v1/properties/verified-no-owners", {
      params,
    })
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const getDriverCustomers = async ({ queryKey }: { queryKey: unknown[] }) => {
  const params = queryKey[1] as Record<string, unknown> | undefined
  try {
    const { data } = await Api.get(`/Driver/${params?.id}/customers/`, params)
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const getDriverDetails = async ({ queryKey }: { queryKey: unknown[] }) => {
  const params = queryKey[1] as Record<string, unknown> | undefined

  try {
    const { data } = await Api.get(`/Driver/${params?.id}/`)
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const getDriverummary = async ({ queryKey }: { queryKey: unknown[] }) => {
  const params = queryKey[1] as Record<string, unknown> | undefined
  try {
    const { data } = await Api.get(`/Driver/${params?.id}/user-summary`, params)
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const getDriverTransactions = async ({ queryKey }: { queryKey: unknown[] }) => {
  const params = queryKey[1] as Record<string, unknown> | undefined
  try {
    const { data } = await Api.get(
      `/Driver/${params?.id}/transaction-summary`,
      { params }
    )
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const registerDriver = async (payload: Record<string, any>) => {
  try {
    const { data } = await Api.post("/api/v1/properties", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const uploadFile = async (file: File) => {
  const formData = new FormData()
  formData.append("file", file)

  try {
    const { data } = await Api.post("/api/v1/files", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    console.log("Upload response:", data) // Log the actual response

    // If the response is a string (which is the file path), return it directly
    if (typeof data === "string") {
      return data
    } else {
      console.error("Unexpected response format:", data)
      throw new Error("File upload failed or response is malformed.")
    }
  } catch (e) {
    console.error("Error during file upload:", e)
    throw new Error(handleApiError(e as IError))
  }
}

const usersService = {
  getAgents,
  getAgentCustomers,
  getAgentDetails,
  getSuperAgents,
  getSuperAgentCustomers,
  getSuperAgentDetails,
  addSuperAgent,
  toggleAgentStatus,
  addAgent,
  getCustomers,
  getCustomerDetails,
  getCustomerPlans,
  getCustomerClaims,
  getApplications,
  getClaims,
  handleApplication,
  getClaimsDetails,
  getCustomerApplications,
  getAgentSummary,
  getAgentTransactions,
  getSuperAgentTransactions,
  getSuperAgentSummary,
  getCustomersTransactions,
  toggleClaimsStatus,
  editUser,
  getTransactions,
  getTransactionsStats,
  getTransactionsDetails,
  getProperties,
  getPropertiesByState,
  getVerifiedWithOwnersProperties,
  getVerifiedNoOwnersProperties,
  getDriverCustomers,
  getDriverDetails,
  getDriverummary,
  getDriverTransactions,
  registerDriver,
  uploadFile,
}

export default usersService

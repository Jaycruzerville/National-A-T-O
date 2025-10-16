import Api from "@/utils/api"
import { IError } from "@/types"

import handleApiError from "@/utils/handleApiError"

const getAgents = async ({ queryKey }: { queryKey: unknown[] }) => {
  const params = queryKey[1] as Record<string, unknown> | undefined
  try {
    const { data } = await Api.get("/api/agents", { params })
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const fetchAgentDashboardInfo = async (agentId: string) => {
  try {
    const response = await Api.get(`/api/agents/${agentId}/dashboard-info`)
    return response.data
  } catch (error) {
    console.error("Error fetching agent dashboard info:", error)
    throw error
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

// Fetch transactions by agent ID
const getTransactionsByAgentId = async (agentId: string) => {
  try {
    const { data } = await Api.get(`/api/agents/${agentId}/transactions`)
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

// Fetch a specific transaction by its ID
const getTransactionById = async (transactionId: string) => {
  try {
    const { data } = await Api.get(`/api/agents/transactions/${transactionId}`)
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}
const issueVoucher = async (payload: Record<string, any>) => {
  try {
    const { data } = await Api.post("/api/vouchers/issue", payload)
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
    const { data } = await Api.post("/api/admin/register-agent", params)
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const setAgentPassword = async (token: string, password: string) => {
  try {
    const { data } = await Api.post("/api/agents/set-password", {
      token,
      password,
    })
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const getAgentDetails = async (id: string) => {
  try {
    const { data } = await Api.get(`/api/agents/${id}`)
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

//PAYMENTS
const initializeFundingTransaction = async (
  params: Record<string, unknown>
) => {
  try {
    const { data } = await Api.post("/api/payment/initialize", params)
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const verifyFundingTransaction = async (params: {
  reference: string
  gateway: string
}) => {
  try {
    const { data } = await Api.get(`/api/payment/verify`, { params })
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const storeTransaction = async (params: Record<string, any>) => {
  try {
    const { data } = await Api.post("/api/agents/transactions", params)
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

// Store voucher sold details
const storeVoucherSold = async (params: Record<string, any>) => {
  try {
    const { data } = await Api.post("/api/agents/vouchers-sold", params)
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const getVouchers = async () => {
  try {
    const { data } = await Api.get("/api/vouchers") // Ensure this matches your backend route
    return data
  } catch (e) {
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
  setAgentPassword,
  getAgentSummary,
  getAgentTransactions,
  getSuperAgentTransactions,
  getSuperAgentSummary,
  initializeFundingTransaction,
  verifyFundingTransaction,
  storeTransaction,
  storeVoucherSold,
  fetchAgentDashboardInfo,
  getTransactionsByAgentId,
  getTransactionById,
  issueVoucher,
  getVouchers,
}

export default usersService

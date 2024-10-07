import Api from "@/utils/api"
import { IError } from "@/types"

import handleApiError from "@/utils/handleApiError"

interface UploadResponse {
  path: string
}

// AGENTS API

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

// CUSTOMERS

const getCustomerApplications = async (
  userId: string,
  params: { pageNo?: number; pageSize?: number } = { pageNo: 0, pageSize: 10 }
) => {
  try {
    const { data } = await Api.get(`/api/v1/applications/customer/${userId}`, {
      params,
    })
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

const getCustomerClaims = async (
  userId: string,
  p0: { pageNo: number; pageSize: number },
  { queryKey }: { queryKey: unknown[] }
) => {
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

// DRIVERS API

const getDriverCustomers = async (
  id: string | undefined,
  pageSize: number,
  page: number,
  { queryKey }: { queryKey: unknown[] }
) => {
  const params = queryKey[1] as Record<string, unknown> | undefined
  try {
    const { data } = await Api.get(`/Driver/${params?.id}/customers/`, params)
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const getDriverByTag = async (driverTag: string) => {
  try {
    const { data } = await Api.get(`/api/driver/tag/${driverTag}`)
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const getDriverDetails = async ({ queryKey }: { queryKey: unknown[] }) => {
  // Ensure params is safely extracted and is of the expected type
  const params = queryKey[1] as { id?: string } | undefined

  if (!params?.id) {
    throw new Error("Driver ID is required to fetch driver details.")
  }

  try {
    const { data } = await Api.get(`/api/driver/${params.id}`)
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
    const { data } = await Api.post("/api/driver-submission/submit", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const getDrivers = async ({ queryKey }: { queryKey: unknown[] }) => {
  const params = queryKey[1] as Record<string, unknown> | undefined
  try {
    const { data } = await Api.get("/api/driver", { params })
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const getDriverSubmissions = async ({ queryKey }: { queryKey: unknown[] }) => {
  const params = queryKey[1] as Record<string, unknown> | undefined

  try {
    const { data } = await Api.get(`/api/driver-submission`, { params }) // Adjust the endpoint
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

const declineSubmission = async (submissionId: any, declineReason: any) => {
  try {
    const { data } = await Api.post(
      `/api/driver-submission/${submissionId}/decline`,
      {
        declineReason,
      }
    )
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const approveSubmission = async (submissionId: any) => {
  try {
    const { data } = await Api.post(
      `/api/driver-submission/${submissionId}/approve`
    )
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const getDriverSubmissionDetails = async (submissionId: string) => {
  try {
    const { data } = await Api.get(`/api/driver-submission/${submissionId}`)
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

// TRANSACTIONS API

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

// Store transaction details
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

// FILE UPLOADS

const uploadFile = async (file: string | Blob): Promise<UploadResponse> => {
  const formData = new FormData()
  formData.append("file", file)

  try {
    // API call to upload the file
    const { data } = await Api.post<UploadResponse>("/api/files", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    // If the response contains a 'path' property, return that
    if (data && typeof data === "object" && data.path) {
      return data
    } else {
      throw new Error("Invalid file upload response")
    }
  } catch (e) {
    // Handle the error using your error handler utility
    throw new Error(handleApiError(e as IError))
  }
}

const usersService = {
  getAgents,
  getDrivers,
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
  getDriverSubmissions,
  handleApplication,
  approveSubmission,
  declineSubmission,
  getDriverSubmissionDetails,
  setAgentPassword,
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
  getDriverCustomers,
  getDriverDetails,
  getDriverummary,
  getDriverTransactions,
  registerDriver,
  initializeFundingTransaction,
  verifyFundingTransaction,
  uploadFile,
  storeTransaction,
  storeVoucherSold,
  fetchAgentDashboardInfo,
  getTransactionsByAgentId,
  getTransactionById,
  issueVoucher,
  getDriverByTag,
  getVouchers,
}

export default usersService

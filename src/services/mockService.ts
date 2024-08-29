import { userSummary, userTxnSummary } from "@/data/mock"
import axios from "axios"
import MockAdapter from "axios-mock-adapter"

const mock = new MockAdapter(axios)

const getAgentSummary = async ({ queryKey }: { queryKey: unknown[] }) => {
  const params = queryKey[1] as Record<string, unknown> | undefined

  mock.onGet(`/agents/${params?.id}/user-summary`).reply(200, userSummary)
  try {
    const response = await axios.get(`/agents/${params?.id}/user-summary`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

const getAgentTransactions = async ({ queryKey }: { queryKey: unknown[] }) => {
  const params = queryKey[1] as Record<string, unknown> | undefined

  mock
    .onGet(`/agents/${params?.id}/transaction-summary`)
    .reply(200, userTxnSummary)
  try {
    const response = await axios.get(`/agents/${params?.id}/user-summary`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

const mockService = {
  getAgentSummary,
  getAgentTransactions,
}

export default mockService

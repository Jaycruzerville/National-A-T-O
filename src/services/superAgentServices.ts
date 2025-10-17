import Api from "@/utils/api"
import { IError } from "@/types"

import handleApiError from "@/utils/handleApiError"

const superAgentService = {
  async fundWallet(superAgentId: string, amount: number) {
    try {
      const res = await Api.post("/api/superagent/fund-wallet", {
        superAgentId,
        amount,
      })
      return res.data
    } catch (error) {
      throw handleApiError(error as IError)
    }
  },

  async issueVoucher(
    superAgentId: string,
    voucherId: string,
    quantity: number
  ) {
    try {
      const res = await Api.post("/api/superagent/issue-voucher", {
        superAgentId,
        voucherId,
        quantity,
      })
      return res.data
    } catch (error) {
      throw handleApiError(error as IError)
    }
  },

  async getDashboardInfo(superAgentId: string) {
    try {
      const res = await Api.get(
        `/api/superagent/${superAgentId}/dashboard-info`
      )
      return res.data
    } catch (error) {
      throw handleApiError(error as IError)
    }
  },

  async getTransactions(superAgentId: string) {
    try {
      const res = await Api.get(`/api/superagent/${superAgentId}/transactions`)
      return res.data
    } catch (error) {
      throw handleApiError(error as IError)
    }
  },
  async listSuperAgents() {
    try {
      const res = await Api.get("/api/superagent/all")
      return res.data
    } catch (error) {
      throw handleApiError(error as IError)
    }
  },

  async getSuperAgentDetails(id: string) {
    try {
      const res = await Api.get(`/api/superagent/${id}`)
      return res.data
    } catch (error) {
      throw handleApiError(error as IError)
    }
  },

  async getSuperAgentProfile() {
    try {
      const res = await Api.get("/api/superagent/profile")
      return res.data
    } catch (error) {
      throw handleApiError(error as IError)
    }
  },

  async createAgent(agentData: any) {
    try {
      const res = await Api.post("/api/superagent/create-agent", agentData)
      return res.data
    } catch (error) {
      throw handleApiError(error as IError)
    }
  },

  async addComplaint(complaintData: any) {
    try {
      const res = await Api.post("/api/superagent/complaints", complaintData)
      return res.data
    } catch (error) {
      throw handleApiError(error as IError)
    }
  },

  async addDriverSubmission(submissionData: any) {
    try {
      const res = await Api.post(
        "/api/superagent/driver-submissions",
        submissionData
      )
      return res.data
    } catch (error) {
      throw handleApiError(error as IError)
    }
  },

  async getComplaints() {
    try {
      const res = await Api.get("/api/superagent/complaints")
      return res.data
    } catch (error) {
      throw handleApiError(error as IError)
    }
  },

  async getDriverSubmissions() {
    try {
      const res = await Api.get("/api/superagent/driver-submissions")
      return res.data
    } catch (error) {
      throw handleApiError(error as IError)
    }
  },

  async toggleAgentStatus(payload: {
    id: string
    status: string
    userType: string
  }): Promise<any> {
    // Example implementation, replace with actual API call
    return fetch(`/api/super-agents/${payload.id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: payload.status,
        userType: payload.userType,
      }),
    }).then((res) => res.json())
  },
}

export default superAgentService

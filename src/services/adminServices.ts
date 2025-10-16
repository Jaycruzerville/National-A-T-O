import Api from "@/utils/api"
import { IError } from "@/types"
import handleApiError from "@/utils/handleApiError"

const adminServices = {
  async createSuperAgent(superAgentData: any) {
    try {
      const res = await Api.post(
        "/api/admin/register-superagent",
        superAgentData
      )
      return res.data
    } catch (error) {
      throw handleApiError(error as IError)
    }
  },
}

export default adminServices

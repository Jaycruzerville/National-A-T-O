import { IError } from "@/types"
import Api from "@/utils/api"
import handleApiError from "@/utils/handleApiError"

// Fetch all states
const getStates = async () => {
  try {
    const { data } = await Api.get("/api/states") // Now points to /api/states
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

// Fetch LGAs by state ID
const getLGAs = async (stateId: string) => {
  try {
    const { data } = await Api.get(`/api/lgas/${stateId}`) // Now points to /api/lgas/:stateId
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

// (Optional) Fetch logged-in driver
const getDriverProfile = async () => {
  try {
    const { data } = await Api.get("/api/driver/me")
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}
const getDriverSubmissionStatus = async () => {
  try {
    const { data } = await Api.get("/api/driver/submission-status")
    return data // { submitted: boolean, status?: 'pending' | 'approved' | 'rejected' }
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const lookupService = {
  getStates,
  getLGAs,
  getDriverProfile,
  getDriverSubmissionStatus,
}

export default lookupService

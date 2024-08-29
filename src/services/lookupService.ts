import { IError } from "@/types"
import Api from "@/utils/api"
import handleApiError from "@/utils/handleApiError"

const getStates = async () => {
  try {
    const { data } = await Api.get("/lookups/states/")
    return data?.data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const getLGAs = async (stateId: string) => {
  try {
    const { data } = await Api.get(
      `/lookups/states/${stateId}/local-governments/`
    )
    return data?.data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const getProperty = async () => {
  try {
    const { data } = await Api.get(`/Property/`)
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const lookupService = {
  getStates,
  getLGAs,
  getProperty,
}

export default lookupService

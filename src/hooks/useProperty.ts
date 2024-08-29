import lookupService from "@/services/lookupService"
import { useQuery } from "@tanstack/react-query"

export const useProperty = () => {
  const { data } = useQuery({
    queryKey: ["get-Property"],
    queryFn: lookupService.getProperty,
  })

  return {
    Property: data?.data,
  }
}

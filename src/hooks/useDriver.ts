import lookupService from "@/services/lookupService"
import { useQuery } from "@tanstack/react-query"

export const useDriver = () => {
  const { data } = useQuery({
    queryKey: ["get-Driver"],
    queryFn: lookupService.getDriver,
  })

  return {
    Driver: data?.data,
  }
}

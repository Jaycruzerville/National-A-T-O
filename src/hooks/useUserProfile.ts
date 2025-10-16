import { useQuery } from "@tanstack/react-query"
import usersService from "@/services/usersServices"

export const useUserProfile = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: usersService.getCurrentUserProfile,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  })
}

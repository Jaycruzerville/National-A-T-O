import authService from "@/services/authService"
import { useQuery } from "@tanstack/react-query"

type Roles = "Super Admin" | "Super Agent" | "Agent" | "Customer"

export const useGetRoleId = (role: Roles) => {
  const { data } = useQuery({
    queryKey: ["get-user-roles"],
    queryFn: authService.getRoles,
  })

  return {
    roles: data?.data,
    roleId:
      data?.data?.find(({ name }: { name: Roles }) => name === role)?.id ??
      null,
  }
}

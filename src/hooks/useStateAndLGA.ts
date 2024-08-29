import lookupService from "@/services/lookupService"
import { useQuery } from "@tanstack/react-query"

export default function useStateAndLGA(stateId: string) {
  const { data: states, isLoading: loadingStates } = useQuery({
    queryKey: ["get-states"],
    queryFn: lookupService.getStates,
  })

  const { data: LGAs, isLoading: loadingLGAs } = useQuery({
    queryKey: ["get-LGAs", { stateId }],
    queryFn: () => lookupService.getLGAs(stateId),
    enabled: !!stateId,
  })
  const values = {
    states,
    LGAs: LGAs ?? [],
    loadingLGAs,
    loadingStates,
  }

  return values
}

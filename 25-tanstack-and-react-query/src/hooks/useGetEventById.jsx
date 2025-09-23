import { useQuery } from "@tanstack/react-query";
import { getEventById } from "../utils/http";

export default function useGetEventById(id) {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events', id],
    queryFn: ({ signal }) => getEventById({ id, signal }),
  });

  return { data, isPending, isError, error };
}

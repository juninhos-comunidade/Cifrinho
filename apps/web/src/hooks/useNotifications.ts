import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export interface Notification {
  id: string;
  type: "badge" | "goal_completed" | "goal_expired" | "transaction_high";
  title: string;
  desc: string;
  time: string;
}

async function fetchNotifications(): Promise<Notification[]> {
  const { data } = await api.get<{ notifications: Notification[] }>(
    "/notifications",
  );
  return data.notifications;
}

export function useNotifications() {
  const query = useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
    staleTime: 60_000,
  });

  return {
    notifications: query.data ?? [],
    count: query.data?.length ?? 0,
    isLoading: query.isLoading,
  };
}

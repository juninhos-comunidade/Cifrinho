import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string | null;
  condition: string | null;
}

export interface GamificationProgress {
  xp: number;
  level: number;
  title: string;
  currentXp: number;
  nextLevelXp: number;
  progress: number;
  txCount: number;
  badgesEarned: number;
  badgesTotal: number;
  earned: Badge[];
  locked: Badge[];
  newlyUnlocked: Badge[];
}

async function fetchProgress(): Promise<GamificationProgress> {
  const { data } = await api.get<GamificationProgress>(
    "/gamification/progress",
  );
  return data;
}

export function useBadges() {
  const query = useQuery({
    queryKey: ["gamification"],
    queryFn: fetchProgress,
  });

  return {
    earned: query.data?.earned ?? [],
    locked: query.data?.locked ?? [],
    progress: query.data ?? null,
    newlyUnlocked: query.data?.newlyUnlocked ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
  };
}

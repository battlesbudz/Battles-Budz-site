import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getQueryFn, apiRequest } from "@/lib/queryClient";
import { type User } from "@shared/schema";

export function useAuth() {
  const queryClient = useQueryClient();
  
  const { data: user, isLoading, error } = useQuery<User | null>({
    queryKey: ["/api/auth/user"],
    queryFn: getQueryFn({ on401: "returnNull" }),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchInterval: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const login = useMutation({
    mutationFn: async (credentials: { email?: string; username?: string; password: string }) => {
      const response = await apiRequest("POST", "/api/admin/auth/login", {
        email: credentials.email || credentials.username,
        password: credentials.password,
      });
      return response.json() as Promise<{ user: User }>;
    },
    onSuccess: ({ user }) => {
      queryClient.setQueryData(["/api/auth/user"], user);
    },
  });

  const setup = useMutation({
    mutationFn: async (details: { email: string; password: string; setupToken: string }) => {
      const response = await apiRequest("POST", "/api/admin/auth/setup", details);
      return response.json() as Promise<{ user: User }>;
    },
    onSuccess: ({ user }) => {
      queryClient.setQueryData(["/api/auth/user"], user);
      queryClient.invalidateQueries({ queryKey: ["/api/admin/auth/status"] });
    },
  });

  const logout = useMutation({
    mutationFn: () => apiRequest("POST", "/api/admin/auth/logout"),
    onSuccess: () => {
      queryClient.setQueryData(["/api/auth/user"], null);
      queryClient.clear();
    },
  });

  const register = useMutation<never, Error, unknown>({
    mutationFn: async (_details: unknown): Promise<never> => {
      throw new Error("Public account registration is disabled");
    },
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    isAdmin: !!(user && user.role === 'admin'),
    login,
    register,
    setup,
    logout,
  };
}

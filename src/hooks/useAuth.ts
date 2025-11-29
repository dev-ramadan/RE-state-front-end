import { useQuery } from '@tanstack/react-query';
import { getCurrentUser, loginService, logoutService, registerService } from '../services/AuthService';
import type { getUser } from '../types/Responses';

import { useMutation } from "@tanstack/react-query";
import { useAuth } from '../context/AuthContext';
import type { RegitserForm, sessinToken } from '../types/User';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { getUserById, getUserRoles } from '../services/ProfileService';
import { setAuthToken } from '../utils/request';

export function useUser() {
    return useQuery<getUser | null>({
        queryKey: ["user"],
        queryFn: getCurrentUser,
        staleTime: 1000 * 60 * 10, // cache 10 min
    });
}

async function fetchAuthData(userId: string, jwtToken: string): Promise<sessinToken> {
    setAuthToken(jwtToken);
    const userRole = await getUserRoles(userId);
    if (!userRole.isSuccess) throw new Error('Failed to fetch user roles');

    const userProfile = await getUserById(userId);
    if (!userProfile.isSuccess) throw new Error('Failed to fetch user profile');
    const roles = userRole.data.roles.map(a => a.roleName);
    const user = userProfile.data;
    if (roles.includes("Admin"))
        user.role = "Admin";
    else if (roles.includes("Agent"))
        user.role = "Agent";
    else if (roles.includes("Customer"))
        user.role = "Customer";


    return {
        jwtToken,
        roles,
        user,
    };
}

export function useLogin() {
    const { login } = useAuth();

    return useMutation({
        mutationFn: async ({ userName, password }: { userName: string; password: string }) => {
            const res = await loginService({ userName, password });
            if (!res.isSuccess) throw new Error(res.message);

            return fetchAuthData(res.data.userId, res.data.jwtToken);
        },
        onSuccess: (data) => login(data),

    });
}

export function useRegister() {
    const { login } = useAuth();

    return useMutation({
        mutationFn: async (user: RegitserForm) => {
            const res = await registerService(user);
            if (!res.isSuccess) throw new Error(res.message);

            return fetchAuthData(res.data.userId, res.data.jwtToken);
        },
        onSuccess: (data) => login(data),
    });
}
export function useLogout() {
    const { logout } = useAuth();
    return useMutation({
        mutationFn: async (id: string) => {
            const res = await logoutService(id);
            if (!res.isSuccess) throw new Error(res.message);
            return res.data;
        },
        onSuccess: () => {
            logout()
        },
    });
}
export function useHomePageRedirect() {
    const { isAuthenticated } = useAuth();

    const navigate = useNavigate()
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/'); // redirect if already logged in
        }
    }, [isAuthenticated, navigate]);
}
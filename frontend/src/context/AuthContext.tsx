import { createContext, useState, type ReactNode } from 'react';

interface User {
    _id: string;
    name: string
    email: string;
}

interface AuthState {
    user: User | null;
    accessToken: string | null;
    isAuthenticated: boolean
}

interface AuthContextType {
    user: User | null;
    accessToken: string | null;
    isAuthenticated: boolean;
    login: (authData: { user: User, accessToken: string }) => void;
    logout: () => void
}

const INITIAL_STATE = {
    user: null,
    accessToken: null,
    isAuthenticated: false
} as const


export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [authState, setAuthState] = useState<AuthState>(INITIAL_STATE);

    const login = (authData: { user: User, accessToken: string }) => {
        setAuthState({ ...authData, isAuthenticated: true });
    }

    const logout = () => {
        setAuthState(INITIAL_STATE);
    }

    return (
        <AuthContext.Provider
            value={{
                user: authState.user,
                accessToken: authState.accessToken,
                isAuthenticated: authState.isAuthenticated,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

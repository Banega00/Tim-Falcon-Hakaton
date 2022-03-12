import * as React from "react";
import { HttpService } from "./HttpService";
const AuthContext = React.createContext<any>(undefined);
export const AuthProvider: React.FC<any> = ({ children }) => {
    const auth = useAuth();

    return <AuthContext.Provider value={auth}> {children} </AuthContext.Provider>;
}


export function useAuth() {
    const [authed, setAuthed] = React.useState(() => {
        const user = localStorage.getItem('user')
        if (user) return true;
    });
    return {
        authed,
        async login(email: string, password: string) {
            try {
                const axiosResponse = await HttpService.login(email, password)
                localStorage.setItem('user', JSON.stringify({}))
                return axiosResponse.data
            } catch (error: any) {
                setAuthed(false);
                localStorage.removeItem('user')
                throw error.response.data;
            }
        },
        async loginWithGoogle(){
            try {
                const axiosResponse = await HttpService.loginWithGoogle()
                localStorage.setItem('user', JSON.stringify({}))
                return axiosResponse.data
            } catch (error: any) {
                setAuthed(false);
                localStorage.removeItem('user')
                throw error.response.data;
            }
        },
        logout() {
            setAuthed(false);
            HttpService.logout();
        },
    };
}

export default function AuthConsumer() {
    return React.useContext(AuthContext);
}

export function delete_cookie(name: string) {
    if (get_cookie(name)) {
        document.cookie = name + "=" +
            ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
    }
}

export function get_cookie(name) {
    return document.cookie.split(';').some(c => {
        return c.trim().startsWith(name + '=');
    });
}
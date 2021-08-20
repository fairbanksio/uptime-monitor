import React, {
    createContext,
    useEffect,
    useMemo,
    useState,
} from "react";

import { useHistory, useLocation } from "react-router-dom";
import authService from '../services/auth'
import userService from '../services/user'

export const AuthContext = createContext();
export const AuthConsumer = AuthContext.Consumer;

const AuthProvider = props => {
    const [user, setUser] = useState(false);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [loadingInitial, setLoadingInitial] = useState(true);

    const history = useHistory();
    const location = useLocation();

    // reset error on path change
    useEffect(() => {// eslint-disable-next-line
        if (error) setError(null);
    }, [error, location.pathname]);

    // get data of current authed user
    useEffect(() => {
        userService.getCurrentUser()
            .then((user) => setUser(user.data))
            .catch((_error) => {})
            .finally(() => setLoadingInitial(false));
    }, []);

    // login
    const login = (username, password) => {
        setLoading(true);
        authService.login( username, password )
            .then((user) => {
                setUser(user.data);
                localStorage.setItem('jwtToken', user.data.token)
                history.push("/");
            })
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }

    // register
    const register = (username, password) => {
        setLoading(true);
        userService.register(username, password)
            .then((user) => {
                history.push("/login");
            })
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }

    // logout
    const logout = () => {
        localStorage.clear();
        sessionStorage.clear();
        setUser(undefined)
        //authService.logout().then(); not yet implemented on api
    }

    // useMemo for peformance/rendering
    const memoedValue = useMemo (
        () => ({
        user,
        loading,
        error,
        login,
        register,
        logout,
        }), // eslint-disable-next-line
        [user, loading, error]
    );

    return (
        <AuthContext.Provider value={memoedValue}>
          {!loadingInitial && props.children}
        </AuthContext.Provider>
    );

};
export default AuthProvider;
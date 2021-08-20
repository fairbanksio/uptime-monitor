import React, {
    createContext,
    useEffect,
    useMemo,
    useState,
} from "react";

import { useLocation } from "react-router-dom";
import notificationService from '../services/notification'

export const NotificationContext = createContext();
export const AuthConsumer = NotificationContext.Consumer;

const NotificationProvider = props => {
    const [notifications, setNotifications] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [loadingInitial, setLoadingInitial] = useState(true);

    //const history = useHistory();
    const location = useLocation();

    // reset error on path change
    useEffect(() => {// eslint-disable-next-line
        if (error) setError(null);
    }, [error, location.pathname]);

    // refresh notifications
    useEffect(() => {
        notificationService.getNotifications()
            .then((notifications) => setNotifications(notifications.data))
            .catch((_error) => {})
            .finally(() => setLoadingInitial(false));
    }, []);

    // Create Notification
    const createNotification = (payload) => {
        setLoading(true);
        notificationService.createNotification(payload)
            .then((notification) => {
                // update notifications state with new notification
                setNotifications(notifications => [...notifications, notification.data]);
            })
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }

    // Update
    const updateNotification = (payload) => {
        setLoading(true);
        notificationService.updateNotification(payload)
            .then((notification) => {
                // update individuals notification state
                setNotifications(
                    notifications.map((item, index) => {
                        console.log(item)
                        return item._id === payload._id ? notification.data : item
                    })
                );
            })
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }

    // Delete
    const deleteNotification = (payload) => {
        setLoading(true);
        notificationService.deleteNotification(payload)
            .then((notification) => {
                // delete notification from state
                setNotifications(notifications.filter(notification => notification._id !== payload._id));
            })
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }


    // useMemo for peformance/rendering
    const memoedValue = useMemo (
        () => ({
        notifications,
        loading,
        error,
        createNotification,
        deleteNotification,
        updateNotification,
        }), // eslint-disable-next-line
        [notifications, loading, error]
    );

    return (
        <NotificationContext.Provider value={memoedValue}>
          {!loadingInitial && props.children}
        </NotificationContext.Provider>
    );

};
export default NotificationProvider;
import React, {
    createContext,
    useEffect,
    useMemo,
    useState,
} from "react";

import monitorService from '../services/monitor'

export const MonitorContext = createContext();
export const AuthConsumer = MonitorContext.Consumer;

const MonitorProvider = props => {
    const [monitors, setMonitors] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [loadingInitial, setLoadingInitial] = useState(true);

    // refresh monitors
    useEffect(() => {
        monitorService.getMonitors()
            .then((monitors) => setMonitors(monitors.data))
            .catch((_error) => {})
            .finally(() => setLoadingInitial(false));
    }, []);

    // Create Monitor
    const createMonitor = (payload) => {
        setLoading(true);
        monitorService.createMonitor(payload)
            .then((monitor) => {
                // update monitors state with new monitor
                setMonitors(monitors => [...monitors, monitor.data]);
            })
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }

    // Update
    const updateMonitor = (payload) => {
        setLoading(true);
        monitorService.updateMonitor(payload)
            .then((monitor) => {
                // update individuals monitor state
                setMonitors(
                    monitors.map((item, index) => {
                        console.log(item)
                        return item._id === payload._id ? monitor.data : item
                    })
                );
            })
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }

    // Delete
    const deleteMonitor = (payload) => {
        setLoading(true);
        monitorService.deleteMonitor(payload)
            .then((monitor) => {
                // update monitors state with new monitor
                setMonitors(monitors.filter(monitor => monitor._id !== payload._id));
            })
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }
    
    // useMemo for peformance/rendering
    const memoedValue = useMemo (
        () => ({
        monitors,
        loading,
        error,
        createMonitor,
        deleteMonitor,
        updateMonitor,
        }), // eslint-disable-next-line
        [monitors, loading, error]
    );

    return (
        <MonitorContext.Provider value={memoedValue}>
          {!loadingInitial && props.children}
        </MonitorContext.Provider>
    );

};
export default MonitorProvider;
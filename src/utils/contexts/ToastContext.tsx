import {createContext, ReactNode, useRef} from "react";
import {Toast, ToastMessage} from "primereact/toast";

interface Props {
    children: ReactNode;
}

export type ToastMessageHandlers = [
    showToast: (message: ToastMessage) => void,
    showGlobalError: (summary: string | null, message: string | null) => void,
    showGlobalSuccess: (summary: string | null, message: string | null) => void,
];

export const ToastContext = createContext<ToastMessageHandlers>([
    () => {}, () => {}, () => {}
]);

export const ToastProvider = ({ children }: Props) => {
    const toast = useRef<Toast>(null);

    const showToast = (message: ToastMessage) =>
        toast.current?.show(message);

    const showGlobalError = (summary: string | null = null, message: string | null = null) =>
        showToast({
            severity: 'error',
            summary,
            detail: message ?? 'An unexpected error occured!'
        });

    const showGlobalSuccess = (summary: string | null = null, message: string | null = null) =>
        showToast({
            severity: 'success',
            summary,
            detail: message ?? 'Completed successfully!'
        });

    return (
        <ToastContext.Provider value={[showToast, showGlobalError, showGlobalSuccess]}>
            {children}
            <Toast ref={toast} />
        </ToastContext.Provider>
    );
};
import {useContext} from "react";
import {ToastContext} from "./ToastContext.tsx";

export const useToast = () => useContext(ToastContext);
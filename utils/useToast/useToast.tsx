import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { Toast } from "@/components/Toast/Toast";
import { styled } from "@/styles/theme";

export interface IToast {
  message?: string;
  state?: "warning" | "error" | "default" | "success";
  id?: number;
  duration?: number;
}

interface IToasts {
  queue: IToast[];
  addToast: (props: IToast) => void;
}

const ToastContext = createContext<IToasts>({
  queue: [],
  addToast: (props: IToast) => [{ ...props }],
});

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [queue, setQueue] = useState<IToast[]>([]);

  function addToast({ message, state }: IToast) {
    const id = Math.floor(Math.random() * (100 + 1));
    const toast = { id, message, state };
    return setQueue((prev) => [...prev, toast]);
  }

  function removeToastOnDuration(toastId?: number, duration?: number) {
    if (toastId === null) {
      return;
    }

    useEffect(() => {
      const timer = setTimeout(() => {
        setQueue((prev) => prev.filter(({ id }) => id !== toastId));
      }, duration);

      return () => clearTimeout(timer);
    }, []);
  }

  return (
    <ToastContext.Provider value={{ queue, addToast }}>
      <>
        {queue.length > 0 && (
          <StyledToastSection>
            {queue.map((toast) => {
              return (
                <Toast
                  key={toast.id}
                  toast={toast}
                  onComplete={removeToastOnDuration}
                />
              );
            })}
          </StyledToastSection>
        )}
        {children}
      </>
    </ToastContext.Provider>
  );
};

const StyledToastSection = styled("div", {
  position: "fixed",
  right: "$4",
  top: "$10",
  height: "500px",
  width: "300px",
  zIndex: 9,

  "> div:not(:last-child)": {
    mb: "$4",
  },
});

export function useToast() {
  return useContext(ToastContext);
}

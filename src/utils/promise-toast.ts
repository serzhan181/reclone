import { toast } from "react-hot-toast";

export const promiseToast = (loadingText: string) => {
  const id = toast.loading(loadingText);

  return {
    successToast: (text: string) => toast.success(text, { id }),
    errorToast: (text: string) => toast.error(text, { id }),
  };
};

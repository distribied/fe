import { toast } from "sonner";
import { ERROR_MESSAGES } from "./errorMessages";

export const handleError = (error: unknown) => {
  if (typeof error === "object" && error !== null && "code" in error) {
    const code = (error as any).code;
    toast.error(ERROR_MESSAGES[code] ?? ERROR_MESSAGES.UNKNOWN_ERROR);
    return;
  }

  toast.error(ERROR_MESSAGES.UNKNOWN_ERROR);
  console.error(error);
};

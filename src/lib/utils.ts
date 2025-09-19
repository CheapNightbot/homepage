import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { toast } from "sonner"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function copyToClipboard(
  text: string,
  successMsg = "Text copied to the clipboard!",
  errorMsg = "Something went wrong trying to copy text to the clipboard!"
) {
  try {
    await navigator.clipboard.writeText(text)
      .then(() => {
        toast.success(successMsg);
      });
  } catch (error) {
    toast.error(errorMsg);
  }
}

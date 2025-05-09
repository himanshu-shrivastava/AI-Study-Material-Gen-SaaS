import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function convertDatetoISO(isoString) {
  const date = new Date(isoString)
  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Kolkata'
  }
  const formatter = new Intl.DateTimeFormat('en-GB', options)
  return formatter.format(date)
}

import type { notification } from "../interface"
import { notifications as notificationStore } from "../store"

export const notify = (message: string, type: string) => {
  const notification: notification = { message, type }
  notificationStore.update(_notifications => [notification])
}
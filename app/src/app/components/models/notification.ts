import { NotificationTypes } from "../types/notification-types";

export interface Notification {
  type: NotificationTypes; 
  description: string;
}

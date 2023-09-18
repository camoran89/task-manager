import { Notification } from "./notification";

export interface InputBase {
  required: boolean;
  disabled: boolean;
  min: number;
  max: number;
  label: string;
  placeholder: string;
  value: string;
  notifications: Array<Notification>
}

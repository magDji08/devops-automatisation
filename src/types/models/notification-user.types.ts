/**
 * Types pour le modèle NotificationUser
 * Correspond à gestion/models/notification_user.py
 */

import { User } from './user.types';
import { Notification } from './notification.types';

export interface NotificationUser {
  id: number;
  user: User;
  notification: Notification;
  lue: boolean;
}

export interface SaveNotificationUserDTO {
  user_id: number;
  notification_id: number;
  lue?: boolean;
}

export interface UpdateNotificationUserDTO {
  lue?: boolean;
}

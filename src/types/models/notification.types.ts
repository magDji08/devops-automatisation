/**
 * Types pour le modèle Notification
 * Correspond à gestion/models/notification.py
 */

import { TypeNotification } from '../enums';

export interface Notification {
  id: number;
  titre: string;
  message: string;
  date_envoi: string;
  type: TypeNotification;
  type_display: string;
  envoyee: boolean;
}

export interface SaveNotificationDTO {
  titre: string;
  message: string;
  type?: TypeNotification;
}

export interface UpdateNotificationDTO {
  titre?: string;
  message?: string;
  type?: TypeNotification;
  envoyee?: boolean;
}

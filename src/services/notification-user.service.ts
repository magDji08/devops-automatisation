/**
 * Service pour les notifications utilisateur
 * Correspond à gestion/services/notification_user_service.py
 */

import apiClient from './api';
import { NotificationUser, SaveNotificationUserDTO, UpdateNotificationUserDTO, CreateResponse } from '../types';

const ENDPOINTS = {
  BASE: '/notification-users/',
  DETAIL: (id: number) => `/notification-users/${id}/`,
  BY_USER: (userId: number) => `/notification-users/?user=${userId}`,
  NON_LUES: (userId: number) => `/notification-users/?user=${userId}&lue=false`,
  MARQUER_LUE: (id: number) => `/notification-users/${id}/marquer-lue/`,
  MARQUER_TOUTES_LUES: (userId: number) => `/notification-users/marquer-toutes-lues/?user=${userId}`,
};

export const notificationUserService = {
  /**
   * Récupérer toutes les notifications utilisateur
   */
  async getAll(): Promise<NotificationUser[]> {
    const response = await apiClient.get<NotificationUser[]>(ENDPOINTS.BASE);
    return response.data;
  },

  /**
   * Récupérer une notification utilisateur par son ID
   */
  async getById(id: number): Promise<NotificationUser> {
    const response = await apiClient.get<NotificationUser>(ENDPOINTS.DETAIL(id));
    return response.data;
  },

  /**
   * Récupérer les notifications d'un utilisateur
   */
  async getByUser(userId: number): Promise<NotificationUser[]> {
    const response = await apiClient.get<NotificationUser[]>(ENDPOINTS.BY_USER(userId));
    return response.data;
  },

  /**
   * Récupérer les notifications non lues d'un utilisateur
   */
  async getNonLuesByUser(userId: number): Promise<NotificationUser[]> {
    const response = await apiClient.get<NotificationUser[]>(ENDPOINTS.NON_LUES(userId));
    return response.data;
  },

  /**
   * Créer une nouvelle notification utilisateur
   */
  async create(data: SaveNotificationUserDTO): Promise<CreateResponse> {
    const response = await apiClient.post<CreateResponse>(ENDPOINTS.BASE, data);
    return response.data;
  },

  /**
   * Mettre à jour une notification utilisateur
   */
  async update(id: number, data: UpdateNotificationUserDTO): Promise<NotificationUser> {
    const response = await apiClient.put<NotificationUser>(ENDPOINTS.DETAIL(id), data);
    return response.data;
  },

  /**
   * Supprimer une notification utilisateur
   */
  async delete(id: number): Promise<void> {
    await apiClient.delete(ENDPOINTS.DETAIL(id));
  },

  /**
   * Marquer une notification comme lue
   */
  async marquerCommeLue(id: number): Promise<NotificationUser> {
    const response = await apiClient.post<NotificationUser>(ENDPOINTS.MARQUER_LUE(id));
    return response.data;
  },

  /**
   * Marquer toutes les notifications d'un utilisateur comme lues
   */
  async marquerToutesLues(userId: number): Promise<void> {
    await apiClient.post(ENDPOINTS.MARQUER_TOUTES_LUES(userId));
  },
};

export default notificationUserService;

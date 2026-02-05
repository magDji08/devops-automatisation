/**
 * Service pour les notifications
 * Correspond à gestion/services/notification_service.py
 */

import apiClient from './api';
import { Notification, SaveNotificationDTO, UpdateNotificationDTO, CreateResponse } from '../types';
import { TypeNotification } from '../types/enums';

const ENDPOINTS = {
  BASE: '/notifications/',
  DETAIL: (id: number) => `/notifications/${id}/`,
  BY_TYPE: (type: TypeNotification) => `/notifications/?type=${type}`,
  ENVOYER_TOUS: (id: number) => `/notifications/${id}/envoyer-tous/`,
  ENVOYER_USER: (id: number, userId: number) => `/notifications/${id}/envoyer-user/${userId}/`,
};

export const notificationService = {
  /**
   * Récupérer toutes les notifications
   */
  async getAll(): Promise<Notification[]> {
    const response = await apiClient.get<Notification[]>(ENDPOINTS.BASE);
    return response.data;
  },

  /**
   * Récupérer une notification par son ID
   */
  async getById(id: number): Promise<Notification> {
    const response = await apiClient.get<Notification>(ENDPOINTS.DETAIL(id));
    return response.data;
  },

  /**
   * Récupérer les notifications par type
   */
  async getByType(type: TypeNotification): Promise<Notification[]> {
    const response = await apiClient.get<Notification[]>(ENDPOINTS.BY_TYPE(type));
    return response.data;
  },

  /**
   * Créer une nouvelle notification
   */
  async create(data: SaveNotificationDTO): Promise<CreateResponse> {
    const response = await apiClient.post<CreateResponse>(ENDPOINTS.BASE, data);
    return response.data;
  },

  /**
   * Mettre à jour une notification
   */
  async update(id: number, data: UpdateNotificationDTO): Promise<Notification> {
    const response = await apiClient.put<Notification>(ENDPOINTS.DETAIL(id), data);
    return response.data;
  },

  /**
   * Supprimer une notification
   */
  async delete(id: number): Promise<void> {
    await apiClient.delete(ENDPOINTS.DETAIL(id));
  },

  /**
   * Envoyer une notification à tous les utilisateurs
   */
  async envoyerATous(id: number): Promise<Notification> {
    const response = await apiClient.post<Notification>(ENDPOINTS.ENVOYER_TOUS(id));
    return response.data;
  },

  /**
   * Envoyer une notification à un utilisateur spécifique
   */
  async envoyerAUser(id: number, userId: number): Promise<Notification> {
    const response = await apiClient.post<Notification>(ENDPOINTS.ENVOYER_USER(id, userId));
    return response.data;
  },
};

export default notificationService;

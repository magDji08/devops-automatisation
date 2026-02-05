/**
 * Service pour les événements
 * Correspond à gestion/services/evenement_service.py
 */

import apiClient from './api';
import { Evenement, SaveEvenementDTO, UpdateEvenementDTO, CreateResponse } from '../types';
import { TypeEvenement } from '../types/enums';

const ENDPOINTS = {
  BASE: '/evenements/',
  DETAIL: (id: number) => `/evenements/${id}/`,
  BY_TYPE: (type: TypeEvenement) => `/evenements/?type=${type}`,
  BY_LIEU: (lieuId: number) => `/evenements/?lieu=${lieuId}`,
};

export const evenementService = {
  /**
   * Récupérer tous les événements actifs
   */
  async getAll(): Promise<Evenement[]> {
    const response = await apiClient.get<Evenement[]>(ENDPOINTS.BASE);
    return response.data;
  },

  /**
   * Récupérer un événement par son ID
   */
  async getById(id: number): Promise<Evenement> {
    const response = await apiClient.get<Evenement>(ENDPOINTS.DETAIL(id));
    return response.data;
  },

  /**
   * Récupérer les événements par type
   */
  async getByType(type: TypeEvenement): Promise<Evenement[]> {
    const response = await apiClient.get<Evenement[]>(ENDPOINTS.BY_TYPE(type));
    return response.data;
  },

  /**
   * Récupérer les événements par lieu
   */
  async getByLieu(lieuId: number): Promise<Evenement[]> {
    const response = await apiClient.get<Evenement[]>(ENDPOINTS.BY_LIEU(lieuId));
    return response.data;
  },

  /**
   * Créer un nouvel événement
   */
  async create(data: SaveEvenementDTO): Promise<CreateResponse> {
    const response = await apiClient.post<CreateResponse>(ENDPOINTS.BASE, data);
    return response.data;
  },

  /**
   * Mettre à jour un événement
   */
  async update(id: number, data: UpdateEvenementDTO): Promise<Evenement> {
    const response = await apiClient.put<Evenement>(ENDPOINTS.DETAIL(id), data);
    return response.data;
  },

  /**
   * Supprimer un événement (soft delete)
   */
  async delete(id: number): Promise<void> {
    await apiClient.delete(ENDPOINTS.DETAIL(id));
  },
};

export default evenementService;

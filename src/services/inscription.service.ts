/**
 * Service pour les inscriptions
 * Correspond à gestion/services/inscription_service.py
 */

import apiClient from './api';
import { Inscription, SaveInscriptionDTO, UpdateInscriptionDTO, CreateResponse } from '../types';

const ENDPOINTS = {
  BASE: '/inscriptions/',
  DETAIL: (id: number) => `/inscriptions/${id}/`,
  BY_USER: (userId: number) => `/inscriptions/?user=${userId}`,
  BY_EVENEMENT: (evenementId: number) => `/inscriptions/?evenement=${evenementId}`,
  ANNULER: (id: number) => `/inscriptions/${id}/annuler/`,
  MARQUER_PRESENT: (id: number) => `/inscriptions/${id}/marquer-present/`,
};

export const inscriptionService = {
  /**
   * Récupérer toutes les inscriptions
   */
  async getAll(): Promise<Inscription[]> {
    const response = await apiClient.get<Inscription[]>(ENDPOINTS.BASE);
    return response.data;
  },

  /**
   * Récupérer une inscription par son ID
   */
  async getById(id: number): Promise<Inscription> {
    const response = await apiClient.get<Inscription>(ENDPOINTS.DETAIL(id));
    return response.data;
  },

  /**
   * Récupérer les inscriptions d'un utilisateur
   */
  async getByUser(userId: number): Promise<Inscription[]> {
    const response = await apiClient.get<Inscription[]>(ENDPOINTS.BY_USER(userId));
    return response.data;
  },

  /**
   * Récupérer les inscriptions à un événement
   */
  async getByEvenement(evenementId: number): Promise<Inscription[]> {
    const response = await apiClient.get<Inscription[]>(ENDPOINTS.BY_EVENEMENT(evenementId));
    return response.data;
  },

  /**
   * Créer une nouvelle inscription
   */
  async create(data: SaveInscriptionDTO): Promise<CreateResponse> {
    const response = await apiClient.post<CreateResponse>(ENDPOINTS.BASE, data);
    return response.data;
  },

  /**
   * Mettre à jour une inscription
   */
  async update(id: number, data: UpdateInscriptionDTO): Promise<Inscription> {
    const response = await apiClient.put<Inscription>(ENDPOINTS.DETAIL(id), data);
    return response.data;
  },

  /**
   * Supprimer une inscription
   */
  async delete(id: number): Promise<void> {
    await apiClient.delete(ENDPOINTS.DETAIL(id));
  },

  /**
   * Annuler une inscription
   */
  async annuler(id: number): Promise<Inscription> {
    const response = await apiClient.post<Inscription>(ENDPOINTS.ANNULER(id));
    return response.data;
  },

  /**
   * Marquer un participant comme présent
   */
  async marquerPresent(id: number): Promise<Inscription> {
    const response = await apiClient.post<Inscription>(ENDPOINTS.MARQUER_PRESENT(id));
    return response.data;
  },
};

export default inscriptionService;

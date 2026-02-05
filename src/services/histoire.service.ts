/**
 * Service pour les histoires
 * Correspond à gestion/services/histoire_service.py
 */

import apiClient from './api';
import { Histoire, SaveHistoireDTO, UpdateHistoireDTO, CreateResponse } from '../types';

const ENDPOINTS = {
  BASE: '/histoires/',
  DETAIL: (id: number) => `/histoires/${id}/`,
};

export const histoireService = {
  /**
   * Récupérer toutes les histoires (triées par ordre d'affichage)
   */
  async getAll(): Promise<Histoire[]> {
    const response = await apiClient.get<Histoire[]>(ENDPOINTS.BASE);
    return response.data;
  },

  /**
   * Récupérer une histoire par son ID
   */
  async getById(id: number): Promise<Histoire> {
    const response = await apiClient.get<Histoire>(ENDPOINTS.DETAIL(id));
    return response.data;
  },

  /**
   * Créer une nouvelle histoire
   */
  async create(data: SaveHistoireDTO): Promise<CreateResponse> {
    const response = await apiClient.post<CreateResponse>(ENDPOINTS.BASE, data);
    return response.data;
  },

  /**
   * Mettre à jour une histoire
   */
  async update(id: number, data: UpdateHistoireDTO): Promise<Histoire> {
    const response = await apiClient.put<Histoire>(ENDPOINTS.DETAIL(id), data);
    return response.data;
  },

  /**
   * Supprimer une histoire
   */
  async delete(id: number): Promise<void> {
    await apiClient.delete(ENDPOINTS.DETAIL(id));
  },
};

export default histoireService;

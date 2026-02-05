/**
 * Service pour les imams
 * Correspond à gestion/services/imam_service.py
 */

import apiClient from './api';
import { Imam, SaveImamDTO, UpdateImamDTO, CreateResponse } from '../types';

const ENDPOINTS = {
  BASE: '/imams/',
  DETAIL: (id: number) => `/imams/${id}/`,
};

export const imamService = {
  /**
   * Récupérer tous les imams
   */
  async getAll(): Promise<Imam[]> {
    const response = await apiClient.get<Imam[]>(ENDPOINTS.BASE);
    return response.data;
  },

  /**
   * Récupérer un imam par son ID
   */
  async getById(id: number): Promise<Imam> {
    const response = await apiClient.get<Imam>(ENDPOINTS.DETAIL(id));
    return response.data;
  },

  /**
   * Créer un nouvel imam
   */
  async create(data: SaveImamDTO): Promise<CreateResponse> {
    const response = await apiClient.post<CreateResponse>(ENDPOINTS.BASE, data);
    return response.data;
  },

  /**
   * Mettre à jour un imam
   */
  async update(id: number, data: UpdateImamDTO): Promise<Imam> {
    const response = await apiClient.put<Imam>(ENDPOINTS.DETAIL(id), data);
    return response.data;
  },

  /**
   * Supprimer un imam
   */
  async delete(id: number): Promise<void> {
    await apiClient.delete(ENDPOINTS.DETAIL(id));
  },
};

export default imamService;

/**
 * Service pour les lieux
 * Correspond à gestion/services/lieu_service.py
 */

import apiClient from './api';
import { Lieu, SaveLieuDTO, UpdateLieuDTO, CreateResponse } from '../types';
import { CategorieLieu } from '../types/enums';

const ENDPOINTS = {
  BASE: '/lieux/',
  DETAIL: (id: number) => `/lieux/${id}/`,
  BY_CATEGORIE: (categorie: CategorieLieu) => `/lieux/?categorie=${categorie}`,
};

export const lieuService = {
  /**
   * Récupérer tous les lieux actifs
   */
  async getAll(): Promise<Lieu[]> {
    const response = await apiClient.get<Lieu[]>(ENDPOINTS.BASE);
    return response.data;
  },

  /**
   * Récupérer un lieu par son ID
   */
  async getById(id: number): Promise<Lieu> {
    const response = await apiClient.get<Lieu>(ENDPOINTS.DETAIL(id));
    return response.data;
  },

  /**
   * Récupérer les lieux par catégorie
   */
  async getByCategorie(categorie: CategorieLieu): Promise<Lieu[]> {
    const response = await apiClient.get<Lieu[]>(ENDPOINTS.BY_CATEGORIE(categorie));
    return response.data;
  },

  /**
   * Créer un nouveau lieu
   */
  async create(data: SaveLieuDTO): Promise<CreateResponse> {
    const response = await apiClient.post<CreateResponse>(ENDPOINTS.BASE, data);
    return response.data;
  },

  /**
   * Mettre à jour un lieu
   */
  async update(id: number, data: UpdateLieuDTO): Promise<Lieu> {
    const response = await apiClient.put<Lieu>(ENDPOINTS.DETAIL(id), data);
    return response.data;
  },

  /**
   * Supprimer un lieu (soft delete)
   */
  async delete(id: number): Promise<void> {
    await apiClient.delete(ENDPOINTS.DETAIL(id));
  },
};

export default lieuService;

/**
 * Service pour les utilisateurs
 * Correspond à gestion/services/user_service.py
 */

import apiClient from './api';
import { User, SaveUserDTO, UpdateUserDTO, CreateResponse } from '../types';

const ENDPOINTS = {
  BASE: '/users/',
  DETAIL: (id: number) => `/users/${id}/`,
};

export const userService = {
  /**
   * Récupérer tous les utilisateurs
   */
  async getAll(): Promise<User[]> {
    const response = await apiClient.get<User[]>(ENDPOINTS.BASE);
    return response.data;
  },

  /**
   * Récupérer un utilisateur par son ID
   */
  async getById(id: number): Promise<User> {
    const response = await apiClient.get<User>(ENDPOINTS.DETAIL(id));
    return response.data;
  },

  /**
   * Créer un nouvel utilisateur
   */
  async create(data: SaveUserDTO): Promise<CreateResponse> {
    const response = await apiClient.post<CreateResponse>(ENDPOINTS.BASE, data);
    return response.data;
  },

  /**
   * Mettre à jour un utilisateur
   */
  async update(id: number, data: UpdateUserDTO): Promise<User> {
    const response = await apiClient.put<User>(ENDPOINTS.DETAIL(id), data);
    return response.data;
  },

  /**
   * Supprimer un utilisateur
   */
  async delete(id: number): Promise<void> {
    await apiClient.delete(ENDPOINTS.DETAIL(id));
  },
};

export default userService;

/**
 * Service d'authentification
 * Correspond à la logique d'authentification Django
 */

import apiClient from './api';
import { User, SaveUserDTO, LoginDTO, AuthResponse } from '../types';

const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login/',
  REFRESH: '/auth/token/refresh/',
  REGISTER: '/users/',
  ME: '/users/me/',
};

export const authService = {
  /**
   * Connexion utilisateur
   */
  async login(credentials: LoginDTO): Promise<AuthResponse> {
    try {
      console.log('🔐 Tentative de connexion avec:', { email: credentials.email });
      console.log('📡 URL API:', import.meta.env.VITE_API_URL || 'http://localhost:8000/api');
      
      const response = await apiClient.post<AuthResponse>(AUTH_ENDPOINTS.LOGIN, credentials);
      
      console.log('✅ Réponse du serveur:', response.data);
      
      // Stocker les tokens
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      
      return response.data;
    } catch (error: unknown) {
      console.error('❌ Erreur de connexion:', error);
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: unknown; status?: number } };
        console.error('📋 Détails:', axiosError.response?.data);
        console.error('📊 Status:', axiosError.response?.status);
      }
      throw error;
    }
  },

  /**
   * Inscription d'un nouvel utilisateur
   */
  async register(userData: SaveUserDTO): Promise<{ message: string; id: number }> {
    const response = await apiClient.post(AUTH_ENDPOINTS.REGISTER, userData);
    return response.data;
  },

  /**
   * Déconnexion
   */
  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },

  /**
   * Récupérer l'utilisateur connecté
   */
  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<User>(AUTH_ENDPOINTS.ME);
    return response.data;
  },

  /**
   * Vérifier si l'utilisateur est connecté
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  },

  /**
   * Récupérer le token d'accès
   */
  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  },
};

export default authService;

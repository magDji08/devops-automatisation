/**
 * Types pour le modèle User
 * Correspond à gestion/models/user.py
 */

import { Role } from '../enums';

export interface User {
  id: number;
  prenom: string;
  nom: string;
  email: string;
  telephone?: string;
  role: Role;
  role_display: string;
  actif: boolean;
  date_creation: string;
}

export interface SaveUserDTO {
  email: string;
  password: string;
  prenom: string;
  nom: string;
  telephone?: string;
  role?: Role;
}

export interface UpdateUserDTO {
  prenom?: string;
  nom?: string;
  telephone?: string;
  actif?: boolean;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: User;
}

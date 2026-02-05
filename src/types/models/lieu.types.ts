/**
 * Types pour le modèle Lieu
 * Correspond à gestion/models/lieu.py
 */

import { CategorieLieu } from '../enums';

export interface Lieu {
  id: number;
  nom: string;
  categorie: CategorieLieu;
  categorie_display: string;
  latitude: number;
  longitude: number;
  description?: string;
  adresse?: string;
  actif: boolean;
}

export interface SaveLieuDTO {
  nom: string;
  categorie?: CategorieLieu;
  latitude: number;
  longitude: number;
  description?: string;
  adresse?: string;
}

export interface UpdateLieuDTO {
  nom?: string;
  categorie?: CategorieLieu;
  latitude?: number;
  longitude?: number;
  description?: string;
  adresse?: string;
  actif?: boolean;
}

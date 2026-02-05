/**
 * Types pour le modèle Imam
 * Correspond à gestion/models/imam.py
 */

export interface Imam {
  id: number;
  nom_complet: string;
  biographie?: string;
  photo_url?: string;
  periode?: string;
}

export interface SaveImamDTO {
  nom_complet: string;
  biographie?: string;
  photo_url?: string;
  periode?: string;
}

export interface UpdateImamDTO {
  nom_complet?: string;
  biographie?: string;
  photo_url?: string;
  periode?: string;
}

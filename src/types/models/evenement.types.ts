/**
 * Types pour le modèle Evenement
 * Correspond à gestion/models/evenement.py
 */

import { TypeEvenement } from '../enums';
import { Lieu } from './lieu.types';

export interface Evenement {
  id: number;
  titre: string;
  description?: string;
  date_heure_debut: string;
  date_heure_fin: string;
  nb_places_max: number;
  type: TypeEvenement;
  type_display: string;
  lieu: Lieu;
  actif: boolean;
}

export interface SaveEvenementDTO {
  titre: string;
  description?: string;
  date_heure_debut: string;
  date_heure_fin: string;
  nb_places_max?: number;
  type?: TypeEvenement;
  lieu_id: number;
}

export interface UpdateEvenementDTO {
  titre?: string;
  description?: string;
  date_heure_debut?: string;
  date_heure_fin?: string;
  nb_places_max?: number;
  type?: TypeEvenement;
  actif?: boolean;
}

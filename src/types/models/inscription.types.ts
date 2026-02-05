/**
 * Types pour le modèle Inscription
 * Correspond à gestion/models/inscription.py
 */

import { StatutInscription } from '../enums';
import { User } from './user.types';
import { Evenement } from './evenement.types';

export interface Inscription {
  id: number;
  user: User;
  evenement: Evenement;
  date_inscription: string;
  statut: StatutInscription;
  statut_display: string;
}

export interface SaveInscriptionDTO {
  user_id: number;
  evenement_id: number;
  statut?: StatutInscription;
}

export interface UpdateInscriptionDTO {
  statut?: StatutInscription;
}

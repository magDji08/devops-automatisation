/**
 * Types pour le modèle Histoire
 * Correspond à gestion/models/histoire.py
 */

export interface Histoire {
  id: number;
  titre: string;
  contenu: string;
  audio_url?: string;
  image_url?: string;
  ordre_affichage: number;
}

export interface SaveHistoireDTO {
  titre: string;
  contenu: string;
  audio_url?: string;
  image_url?: string;
  ordre_affichage?: number;
}

export interface UpdateHistoireDTO {
  titre?: string;
  contenu?: string;
  audio_url?: string;
  image_url?: string;
  ordre_affichage?: number;
}

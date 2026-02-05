/**
 * Enums correspondant aux choix Django
 */

export enum TypeEvenement {
  CONFERENCE = 'CONFERENCE',
  CHANT = 'CHANT',
  CEREMONIE = 'CEREMONIE',
}

export const TypeEvenementLabels: Record<TypeEvenement, string> = {
  [TypeEvenement.CONFERENCE]: 'Conférence',
  [TypeEvenement.CHANT]: 'Chant',
  [TypeEvenement.CEREMONIE]: 'Cérémonie',
};

export enum CategorieLieu {
  GRANDE_MOSQUEE = 'GRANDE_MOSQUEE',
  RESIDENCE = 'RESIDENCE',
  DAARA = 'DAARA',
  AUTRE = 'AUTRE',
}

export const CategorieLieuLabels: Record<CategorieLieu, string> = {
  [CategorieLieu.GRANDE_MOSQUEE]: 'Grande Mosquée',
  [CategorieLieu.RESIDENCE]: 'Résidence',
  [CategorieLieu.DAARA]: 'Daara',
  [CategorieLieu.AUTRE]: 'Autre',
};

export enum TypeNotification {
  INFO = 'INFO',
  ALERTE_SECURITE = 'ALERTE_SECURITE',
  RAPPEL_EVENEMENT = 'RAPPEL_EVENEMENT',
}

export const TypeNotificationLabels: Record<TypeNotification, string> = {
  [TypeNotification.INFO]: 'Information',
  [TypeNotification.ALERTE_SECURITE]: 'Alerte Sécurité',
  [TypeNotification.RAPPEL_EVENEMENT]: 'Rappel Événement',
};

export enum StatutInscription {
  INSCRIT = 'INSCRIT',
  ANNULE = 'ANNULE',
  PRESENT = 'PRESENT',
}

export const StatutInscriptionLabels: Record<StatutInscription, string> = {
  [StatutInscription.INSCRIT]: 'Inscrit',
  [StatutInscription.ANNULE]: 'Annulé',
  [StatutInscription.PRESENT]: 'Présent',
};

export enum Role {
  PELERIN = 'PELERIN',
  ADMIN = 'ADMIN',
}

export const RoleLabels: Record<Role, string> = {
  [Role.PELERIN]: 'Pèlerin',
  [Role.ADMIN]: 'Administrateur',
};

/**
 * Données de démonstration pour le Magal
 * Basées sur les modèles Django
 */

import { TypeEvenement, CategorieLieu, TypeNotification, StatutInscription, Role } from '@/types/enums';
import type { Evenement, Lieu, Histoire, Imam, Inscription, Notification, NotificationUser, User } from '@/types';

// ==================== LIEUX ====================
export const mockLieux: Lieu[] = [
  {
    id: 1,
    nom: 'Grande Mosquée de Touba',
    categorie: CategorieLieu.GRANDE_MOSQUEE,
    categorie_display: 'Grande Mosquée',
    latitude: 14.8528,
    longitude: -15.8828,
    description: 'La Grande Mosquée de Touba est l\'une des plus grandes mosquées d\'Afrique. Elle peut accueillir des dizaines de milliers de fidèles.',
    adresse: 'Centre-ville de Touba, Sénégal',
    actif: true,
  },
  {
    id: 2,
    nom: 'Résidence Khadimou Rassoul',
    categorie: CategorieLieu.RESIDENCE,
    categorie_display: 'Résidence',
    latitude: 14.8530,
    longitude: -15.8830,
    description: 'Résidence historique du fondateur de la confrérie mouride.',
    adresse: 'Quartier Darou Khoudoss, Touba',
    actif: true,
  },
  {
    id: 3,
    nom: 'Daara Hizbut Tarqiyyah',
    categorie: CategorieLieu.DAARA,
    categorie_display: 'Daara',
    latitude: 14.8525,
    longitude: -15.8820,
    description: 'Centre d\'enseignement coranique et de formation religieuse.',
    adresse: 'Touba Mosquée, Sénégal',
    actif: true,
  },
  {
    id: 4,
    nom: 'Bibliothèque Cheikh Ahmadou Bamba',
    categorie: CategorieLieu.AUTRE,
    categorie_display: 'Autre',
    latitude: 14.8532,
    longitude: -15.8825,
    description: 'Bibliothèque contenant les écrits et manuscrits du Cheikh.',
    adresse: 'Avenue Serigne Touba, Touba',
    actif: true,
  },
  {
    id: 5,
    nom: 'Mausolée de Serigne Touba',
    categorie: CategorieLieu.GRANDE_MOSQUEE,
    categorie_display: 'Grande Mosquée',
    latitude: 14.8527,
    longitude: -15.8827,
    description: 'Lieu de repos éternel de Cheikh Ahmadou Bamba.',
    adresse: 'Grande Mosquée de Touba',
    actif: true,
  },
];

// ==================== ÉVÉNEMENTS ====================
export const mockEvenements: Evenement[] = [
  {
    id: 1,
    titre: 'Cérémonie d\'ouverture du Grand Magal',
    description: 'Cérémonie officielle marquant le début des célébrations du Grand Magal de Touba. Récitation du Coran et prières collectives.',
    date_heure_debut: '2026-02-15T08:00:00',
    date_heure_fin: '2026-02-15T12:00:00',
    nb_places_max: 5000,
    type: TypeEvenement.CEREMONIE,
    type_display: 'Cérémonie',
    lieu: mockLieux[0],
    actif: true,
  },
  {
    id: 2,
    titre: 'Conférence: La vie de Cheikh Ahmadou Bamba',
    description: 'Conférence animée par des érudits sur la vie, les enseignements et l\'héritage spirituel de Cheikh Ahmadou Bamba.',
    date_heure_debut: '2026-02-15T14:00:00',
    date_heure_fin: '2026-02-15T17:00:00',
    nb_places_max: 500,
    type: TypeEvenement.CONFERENCE,
    type_display: 'Conférence',
    lieu: mockLieux[2],
    actif: true,
  },
  {
    id: 3,
    titre: 'Récital de Khassaides',
    description: 'Récitation collective des poèmes (Khassaides) composés par Serigne Touba. Un moment de spiritualité intense.',
    date_heure_debut: '2026-02-15T20:00:00',
    date_heure_fin: '2026-02-16T02:00:00',
    nb_places_max: 3000,
    type: TypeEvenement.CHANT,
    type_display: 'Chant',
    lieu: mockLieux[0],
    actif: true,
  },
  {
    id: 4,
    titre: 'Conférence: L\'exil au Gabon',
    description: 'Récit détaillé de la période d\'exil de Cheikh Ahmadou Bamba au Gabon (1895-1902) et les miracles qui s\'y sont produits.',
    date_heure_debut: '2026-02-16T10:00:00',
    date_heure_fin: '2026-02-16T13:00:00',
    nb_places_max: 400,
    type: TypeEvenement.CONFERENCE,
    type_display: 'Conférence',
    lieu: mockLieux[3],
    actif: true,
  },
  {
    id: 5,
    titre: 'Nuit du Magal - Veillée spirituelle',
    description: 'Grande veillée de prières et de récitations marquant l\'anniversaire du départ en exil.',
    date_heure_debut: '2026-02-16T22:00:00',
    date_heure_fin: '2026-02-17T06:00:00',
    nb_places_max: 10000,
    type: TypeEvenement.CEREMONIE,
    type_display: 'Cérémonie',
    lieu: mockLieux[0],
    actif: true,
  },
  {
    id: 6,
    titre: 'Chants religieux - Groupe Hizbut Tarqiyyah',
    description: 'Prestation du groupe Hizbut Tarqiyyah avec leurs plus beaux chants religieux.',
    date_heure_debut: '2026-02-17T16:00:00',
    date_heure_fin: '2026-02-17T19:00:00',
    nb_places_max: 2000,
    type: TypeEvenement.CHANT,
    type_display: 'Chant',
    lieu: mockLieux[1],
    actif: true,
  },
];

// ==================== HISTOIRES ====================
export const mockHistoires: Histoire[] = [
  {
    id: 1,
    titre: 'L\'exil de Cheikh Ahmadou Bamba au Gabon',
    contenu: `Le 21 septembre 1895, Cheikh Ahmadou Bamba fut embarqué de force sur un navire en direction du Gabon. Cette déportation, ordonnée par les autorités coloniales françaises, marque le début de sept années d'exil.

Durant ce voyage, de nombreux miracles se seraient produits. Le plus célèbre est celui de la prière sur les eaux : privé d'un espace pour prier sur le bateau, Cheikh Ahmadou Bamba aurait étendu son tapis de prière sur l'océan et accompli sa prière.

Au Gabon, malgré les conditions difficiles, le Cheikh continua son œuvre spirituelle et intellectuelle, composant de nombreux poèmes et écrits religieux. Son séjour forcé devint une période de méditation et de rapprochement avec Dieu.

C'est cet événement - le départ en exil - que commémore chaque année le Grand Magal de Touba.`,
    audio_url: 'https://example.com/audio/exil-gabon.mp3',
    image_url: 'https://example.com/images/bateau-exil.jpg',
    ordre_affichage: 1,
  },
  {
    id: 2,
    titre: 'La fondation de Touba',
    contenu: `En 1887, Cheikh Ahmadou Bamba fonda la ville de Touba, dont le nom signifie "félicité" ou "béatitude" en arabe. Ce lieu fut choisi après une révélation divine.

La ville devait être un sanctuaire de paix, de spiritualité et d'éducation. Le Cheikh y établit les fondements d'une cité entièrement dédiée à l'adoration de Dieu et à l'apprentissage.

Aujourd'hui, Touba est devenue la deuxième plus grande ville du Sénégal et accueille chaque année des millions de pèlerins lors du Grand Magal. La Grande Mosquée, dont la construction fut initiée par Cheikh Ahmadou Bamba lui-même, est l'une des plus imposantes d'Afrique.`,
    audio_url: '',
    image_url: 'https://example.com/images/touba-fondation.jpg',
    ordre_affichage: 2,
  },
  {
    id: 3,
    titre: 'Les enseignements du Mouridisme',
    contenu: `Le Mouridisme, fondé par Cheikh Ahmadou Bamba, est une confrérie soufie qui met l'accent sur le travail, la prière et l'éducation.

Les principes fondamentaux du Mouridisme incluent :
- Le travail comme forme d'adoration (Ligééyu Ndigël)
- La soumission totale à Dieu
- Le respect et l'amour du Prophète Muhammad (PSL)
- L'importance de l'éducation religieuse et séculière
- La générosité et l'entraide communautaire

Cheikh Ahmadou Bamba a composé des milliers de poèmes et écrits religieux, dont les plus célèbres sont compilés dans les "Khassaides". Ces textes sont récités lors des cérémonies religieuses et constituent un pilier de la spiritualité mouride.`,
    audio_url: 'https://example.com/audio/enseignements.mp3',
    image_url: '',
    ordre_affichage: 3,
  },
  {
    id: 4,
    titre: 'Le retour triomphal de l\'exil',
    contenu: `Après sept années d'exil au Gabon puis en Mauritanie, Cheikh Ahmadou Bamba fut autorisé à revenir au Sénégal en 1902. Son retour fut accueilli avec une immense joie par ses disciples.

Malgré les tentatives des autorités coloniales pour affaiblir son influence, le mouvement mouride continua de croître. Le Cheikh fut assigné à résidence dans plusieurs localités, mais sa réputation de sainteté ne fit que grandir.

Ce retour symbolise la victoire de la foi et de la patience sur l'adversité. Il démontre que ni l'exil ni les persécutions ne purent ébranler la détermination spirituelle de Cheikh Ahmadou Bamba.`,
    audio_url: '',
    image_url: 'https://example.com/images/retour-exil.jpg',
    ordre_affichage: 4,
  },
  {
    id: 5,
    titre: 'L\'héritage spirituel de Serigne Touba',
    contenu: `Cheikh Ahmadou Bamba, également appelé Serigne Touba ou Khadimou Rassoul (le serviteur du Prophète), a laissé un héritage spirituel immense.

Ses écrits comprennent plus de 7 tonnes de manuscrits, incluant des poèmes, des traités de jurisprudence islamique, et des ouvrages sur le soufisme. Parmi les plus célèbres figurent "Massalik al-Jinan" (Les itinéraires du Paradis) et les "Khassaides".

Son message de paix, de non-violence et de résistance spirituelle face à la colonisation inspire encore aujourd'hui des millions de personnes à travers le monde. La confrérie mouride compte plusieurs millions de membres, principalement au Sénégal mais aussi dans la diaspora.`,
    audio_url: 'https://example.com/audio/heritage.mp3',
    image_url: 'https://example.com/images/heritage-spirituel.jpg',
    ordre_affichage: 5,
  },
];

// ==================== IMAMS ====================
export const mockImams: Imam[] = [
  {
    id: 1,
    nom_complet: 'Cheikh Ahmadou Bamba Mbacké',
    biographie: `Cheikh Ahmadou Bamba Mbacké (1853-1927), également connu sous le nom de Serigne Touba ou Khadimou Rassoul, est le fondateur de la confrérie mouride.

Né à Mbacké Baol, il a consacré sa vie à l'enseignement de l'Islam, à l'écriture et à la résistance pacifique contre la colonisation française. Il a été exilé au Gabon puis en Mauritanie pendant plusieurs années.

Son œuvre littéraire est immense : il a composé des milliers de poèmes en arabe, ainsi que de nombreux traités religieux. Il prônait le travail, la prière et l'éducation comme voies vers Dieu.`,
    photo_url: 'https://example.com/images/cheikh-ahmadou-bamba.jpg',
    periode: '1853-1927',
  },
  {
    id: 2,
    nom_complet: 'Serigne Mouhamadou Moustapha Mbacké',
    biographie: `Premier Khalife Général des Mourides (1927-1945), fils aîné de Cheikh Ahmadou Bamba.

Il a supervisé la construction de la Grande Mosquée de Touba et a consolidé l'organisation de la confrérie après le décès de son père. Sous son califat, le mouridisme a connu une expansion significative.`,
    photo_url: 'https://example.com/images/serigne-moustapha.jpg',
    periode: '1888-1945',
  },
  {
    id: 3,
    nom_complet: 'Serigne Fallou Mbacké',
    biographie: `Deuxième Khalife Général des Mourides (1945-1968), fils de Cheikh Ahmadou Bamba.

Il a poursuivi les travaux de la Grande Mosquée et a œuvré pour le développement économique et social de Touba. Il était réputé pour sa générosité et sa piété.`,
    photo_url: 'https://example.com/images/serigne-fallou.jpg',
    periode: '1888-1968',
  },
  {
    id: 4,
    nom_complet: 'Serigne Abdoul Ahad Mbacké',
    biographie: `Troisième Khalife Général des Mourides (1968-1989), fils de Cheikh Ahmadou Bamba.

Il a achevé la construction de la Grande Mosquée de Touba et a modernisé l'infrastructure de la ville sainte. Son califat a été marqué par une grande expansion de la confrérie.`,
    photo_url: 'https://example.com/images/serigne-abdoul-ahad.jpg',
    periode: '1914-1989',
  },
  {
    id: 5,
    nom_complet: 'Serigne Mountakha Mbacké',
    biographie: `Actuel Khalife Général des Mourides depuis 2018, petit-fils de Cheikh Ahmadou Bamba.

Il poursuit l'œuvre de ses prédécesseurs en veillant au développement spirituel et matériel de la communauté mouride. Sous son califat, de nombreux projets d'infrastructure ont été lancés à Touba.`,
    photo_url: 'https://example.com/images/serigne-mountakha.jpg',
    periode: '1930-présent',
  },
];

// ==================== UTILISATEURS ====================
export const mockUsers: User[] = [
  {
    id: 1,
    prenom: 'Modou',
    nom: 'Fall',
    email: 'admin@magal.sn',
    telephone: '+221 77 123 45 67',
    role: Role.ADMIN,
    role_display: 'Administrateur',
    actif: true,
    date_creation: '2025-01-15T10:00:00',
  },
  {
    id: 2,
    prenom: 'Fatou',
    nom: 'Diop',
    email: 'fatou.diop@email.com',
    telephone: '+221 78 234 56 78',
    role: Role.PELERIN,
    role_display: 'Pèlerin',
    actif: true,
    date_creation: '2025-06-20T14:30:00',
  },
  {
    id: 3,
    prenom: 'Ibrahima',
    nom: 'Ndiaye',
    email: 'ibrahima.ndiaye@email.com',
    telephone: '+221 76 345 67 89',
    role: Role.PELERIN,
    role_display: 'Pèlerin',
    actif: true,
    date_creation: '2025-08-10T09:15:00',
  },
  {
    id: 4,
    prenom: 'Aissatou',
    nom: 'Sow',
    email: 'aissatou.sow@email.com',
    telephone: '+221 70 456 78 90',
    role: Role.PELERIN,
    role_display: 'Pèlerin',
    actif: true,
    date_creation: '2025-09-05T16:45:00',
  },
  {
    id: 5,
    prenom: 'Ousmane',
    nom: 'Ba',
    email: 'ousmane.ba@email.com',
    telephone: '+221 77 567 89 01',
    role: Role.ADMIN,
    role_display: 'Administrateur',
    actif: true,
    date_creation: '2025-02-28T11:20:00',
  },
  {
    id: 6,
    prenom: 'Mariama',
    nom: 'Sy',
    email: 'mariama.sy@email.com',
    telephone: '+221 78 678 90 12',
    role: Role.PELERIN,
    role_display: 'Pèlerin',
    actif: false,
    date_creation: '2025-07-12T08:00:00',
  },
];

// ==================== INSCRIPTIONS ====================
export const mockInscriptions: Inscription[] = [
  {
    id: 1,
    user: mockUsers[1],
    evenement: mockEvenements[0],
    date_inscription: '2026-01-15T10:30:00',
    statut: StatutInscription.INSCRIT,
    statut_display: 'Inscrit',
  },
  {
    id: 2,
    user: mockUsers[2],
    evenement: mockEvenements[0],
    date_inscription: '2026-01-16T14:00:00',
    statut: StatutInscription.INSCRIT,
    statut_display: 'Inscrit',
  },
  {
    id: 3,
    user: mockUsers[3],
    evenement: mockEvenements[1],
    date_inscription: '2026-01-18T09:45:00',
    statut: StatutInscription.PRESENT,
    statut_display: 'Présent',
  },
  {
    id: 4,
    user: mockUsers[1],
    evenement: mockEvenements[2],
    date_inscription: '2026-01-20T16:30:00',
    statut: StatutInscription.INSCRIT,
    statut_display: 'Inscrit',
  },
  {
    id: 5,
    user: mockUsers[5],
    evenement: mockEvenements[3],
    date_inscription: '2026-01-22T11:15:00',
    statut: StatutInscription.ANNULE,
    statut_display: 'Annulé',
  },
  {
    id: 6,
    user: mockUsers[2],
    evenement: mockEvenements[4],
    date_inscription: '2026-01-25T08:00:00',
    statut: StatutInscription.INSCRIT,
    statut_display: 'Inscrit',
  },
  {
    id: 7,
    user: mockUsers[3],
    evenement: mockEvenements[4],
    date_inscription: '2026-01-26T13:20:00',
    statut: StatutInscription.INSCRIT,
    statut_display: 'Inscrit',
  },
  {
    id: 8,
    user: mockUsers[4],
    evenement: mockEvenements[5],
    date_inscription: '2026-01-28T15:45:00',
    statut: StatutInscription.PRESENT,
    statut_display: 'Présent',
  },
];

// ==================== NOTIFICATIONS ====================
export const mockNotifications: Notification[] = [
  {
    id: 1,
    titre: 'Bienvenue au Grand Magal 2026',
    message: 'Nous sommes heureux de vous accueillir pour le Grand Magal de Touba 2026. Consultez le programme des événements et inscrivez-vous dès maintenant!',
    date_envoi: '2026-01-01T10:00:00',
    type: TypeNotification.INFO,
    type_display: 'Information',
    envoyee: true,
  },
  {
    id: 2,
    titre: 'Rappel: Cérémonie d\'ouverture demain',
    message: 'N\'oubliez pas que la cérémonie d\'ouverture du Grand Magal aura lieu demain à 8h00 à la Grande Mosquée de Touba.',
    date_envoi: '2026-02-14T18:00:00',
    type: TypeNotification.RAPPEL_EVENEMENT,
    type_display: 'Rappel Événement',
    envoyee: true,
  },
  {
    id: 3,
    titre: 'Alerte sécurité: Affluence importante',
    message: 'En raison de l\'affluence importante attendue ce soir, veuillez suivre les consignes de sécurité et éviter les bousculades. Restez calmes et solidaires.',
    date_envoi: '2026-02-15T16:00:00',
    type: TypeNotification.ALERTE_SECURITE,
    type_display: 'Alerte Sécurité',
    envoyee: true,
  },
  {
    id: 4,
    titre: 'Nouvelle conférence ajoutée',
    message: 'Une nouvelle conférence sur "Les miracles de Cheikh Ahmadou Bamba" a été ajoutée au programme. Rendez-vous le 17 février à 14h00.',
    date_envoi: '2026-02-10T09:30:00',
    type: TypeNotification.INFO,
    type_display: 'Information',
    envoyee: true,
  },
  {
    id: 5,
    titre: 'Points d\'eau et restauration',
    message: 'Des points de distribution d\'eau gratuite et des espaces de restauration sont disponibles autour de la Grande Mosquée. Pensez à vous hydrater régulièrement.',
    date_envoi: '2026-02-15T12:00:00',
    type: TypeNotification.INFO,
    type_display: 'Information',
    envoyee: false,
  },
];

// ==================== NOTIFICATIONS UTILISATEUR ====================
export const mockNotificationUsers: NotificationUser[] = [
  {
    id: 1,
    user: mockUsers[1],
    notification: mockNotifications[0],
    lue: true,
  },
  {
    id: 2,
    user: mockUsers[1],
    notification: mockNotifications[1],
    lue: true,
  },
  {
    id: 3,
    user: mockUsers[1],
    notification: mockNotifications[2],
    lue: false,
  },
  {
    id: 4,
    user: mockUsers[2],
    notification: mockNotifications[0],
    lue: true,
  },
  {
    id: 5,
    user: mockUsers[2],
    notification: mockNotifications[3],
    lue: false,
  },
  {
    id: 6,
    user: mockUsers[3],
    notification: mockNotifications[0],
    lue: true,
  },
  {
    id: 7,
    user: mockUsers[3],
    notification: mockNotifications[1],
    lue: true,
  },
  {
    id: 8,
    user: mockUsers[3],
    notification: mockNotifications[2],
    lue: true,
  },
];

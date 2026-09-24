export type Language = 'ar' | 'en';

export interface WeddingConfig {
  groomNameAr: string;
  groomNameEn: string;
  brideNameAr: string;
  brideNameEn: string;
  coupleShortAr: string;
  coupleShortEn: string;
  monogram: string;
  parentsInviteAr: string;
  parentsInviteEn: string;
  weddingDateISO: string;
  dateFormattedAr: string;
  dateFormattedEn: string;
  timeAr: string;
  timeEn: string;
  venueNameAr: string;
  venueNameEn: string;
  venueCityAr: string;
  venueCityEn: string;
  googleMapsUrl: string;
  googleMapsEmbed: string;
  rsvpDeadlineAr: string;
  rsvpDeadlineEn: string;
  hashtag: string;
  hashtagEn: string;
  plannerPhone: string;
  plannerName: string;
  heroImage: string;
  quoteAr: string;
  quoteEn: string;
  subQuoteAr: string;
  subQuoteEn: string;
  dressCodeAr: string;
  dressCodeEn: string;
  dressCodeColors: string[];
  cardTheme: 'royal-gold' | 'rose-blush' | 'emerald' | 'noir-gold';
}

export interface RsvpEntry {
  id: string;
  fullName: string;
  phoneOrEmail: string;
  attendance: 'attending' | 'declined';
  guestCount: number;
  selectedMeal: string;
  dietaryNotes?: string;
  personalMessage?: string;
  submittedAt: string;
}

export interface SongRequest {
  id: string;
  title: string;
  artist: string;
  requestedBy: string;
  dedication?: string;
  upvotes: number;
  status: 'approved' | 'pending';
  isDoNotPlay?: boolean;
}

export interface StoryMilestone {
  id: string;
  year: string;
  titleAr: string;
  titleEn: string;
  dateAr: string;
  dateEn: string;
  descriptionAr: string;
  descriptionEn: string;
  imageUrl: string;
  iconName: string;
}

export interface ScheduleEvent {
  id: string;
  timeAr: string;
  timeEn: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  icon: string;
}

export interface GalleryItem {
  id: string;
  category: 'all' | 'prewedding' | 'engagement' | 'details' | 'family';
  titleAr: string;
  titleEn: string;
  imageUrl: string;
  thumbnailUrl: string;
  captionAr: string;
  captionEn: string;
  isVideo?: boolean;
}

export interface HotelRecommendation {
  id: string;
  nameAr: string;
  nameEn: string;
  stars: number;
  distanceAr: string;
  distanceEn: string;
  descriptionAr: string;
  descriptionEn: string;
  discountCode: string;
  bookingUrl: string;
  imageUrl: string;
}

export interface BridalPartyMember {
  id: string;
  roleAr: string;
  roleEn: string;
  nameAr: string;
  nameEn: string;
  relationAr: string;
  relationEn: string;
  imageUrl: string;
  quoteAr: string;
  quoteEn: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  location?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isItinerary?: boolean;
}

export interface TripPreferences {
  destination: string;
  startDate: string;
  endDate: string;
  budget: 'Budget' | 'Moderate' | 'Luxury' | 'Ultra-Luxury';
  travelStyle: 'Relaxing' | 'Adventure' | 'Cultural' | 'Foodie' | 'Romantic';
  interests: string;
}

export enum NavLinkType {
  HOME = 'Home',
  ABOUT = 'About',
  BLOG = 'Blog',
  FAQ = 'FAQ',
  BOOK = 'Book',
  GROUPS = 'Group Trips',
  CONTACT = 'Contact'
}
const API_BASE_URL = 'http://65.109.100.181:8080';

// ========== TYPE DEFINITIONS ==========
export interface TrackedAnimal {
  id: number;
  herd_id?: number;
  species_name: string;
  age_class: string;
  star_rating: number;
  responds_to_caller: boolean;
  location_notes?: string;
  coordinate_x?: number;
  coordinate_y?: number;
  screenshot_url?: string;
  culling_recommendation?: 'CULL' | 'LEAVE' | 'MONITOR' | 'TROPHY';
}

export interface Herd {
  id: number;
  herd_name: string;
  species_name: string;
  map_name: string;
  animal_count: number;
}

export interface Habitat {
  habitat_id: number;
  habitat_name: string;
  species_name: string;
  map_name: string;
  animals: TrackedAnimal[];
}

export interface HerdsResponse {
  tracking_mode: 'individual' | 'habitat_wide';
  herds?: Herd[];
  habitats?: Habitat[];
}

// ========== UTILITY FUNCTIONS ==========
export function calculateCullingRecommendation(
  ageClass: string,
  starRating: number,
  respondsToCaller: boolean
): 'CULL' | 'LEAVE' | 'MONITOR' | 'TROPHY' {
  if (starRating >= 5) {
    return 'TROPHY';
  }
  if (ageClass === 'Young' || ageClass === 'Juvenile') {
    return 'LEAVE';
  }
  if (starRating === 4 && respondsToCaller && ageClass === 'Adult') {
    return 'LEAVE';
  }
  if (ageClass === 'Old' || ageClass === 'Very Old') {
    if (starRating < 3) {
      return 'CULL';
    }
    return 'MONITOR';
  }
  if (starRating < 3) {
    return 'CULL';
  }
  return 'MONITOR';
}

export function isUserLoggedIn(): boolean {
  if (typeof window === 'undefined') return false;
  const token = localStorage.getItem('discord_token');
  return !!token;
}

// ========== API FUNCTIONS ==========
export async function exchangeCodeForToken(code: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/callback?code=${code}`);
    return await response.json();
  } catch (error) {
    console.error('Error exchanging code for token:', error);
    throw error;
  }
}

export async function fetchUserData(accessToken: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/user`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}

export async function fetchUserHerds(): Promise<HerdsResponse> {
  try {
    const token = localStorage.getItem('discord_token');
    const response = await fetch(`${API_BASE_URL}/api/herds`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching herds:', error);
    throw error;
  }
}

export async function fetchHerdAnimals(herdId: number | string) {
  try {
    const token = localStorage.getItem('discord_token');
    const response = await fetch(`${API_BASE_URL}/api/herds/${herdId}/animals`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching herd animals:', error);
    throw error;
  }
}

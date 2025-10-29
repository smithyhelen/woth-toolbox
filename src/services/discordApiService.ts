const API_BASE_URL = 'http://65.109.100.181:8080';

export function isUserLoggedIn(): boolean {
  if (typeof window === 'undefined') return false;
  const token = localStorage.getItem('discord_token');
  return !!token;
}

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

export async function fetchUserHerds() {
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

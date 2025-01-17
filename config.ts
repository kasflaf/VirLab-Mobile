//config.ts
const API_BASE_URL = 'http://kelas-king.site:4000';

export const API_ENDPOINTS = {
  register: `${API_BASE_URL}/auth/register`,
  login: `${API_BASE_URL}/auth/login`,
  deleteAccount: `${API_BASE_URL}/auth/delete`,
  getScore: `${API_BASE_URL}/user/score`,
  updateScore: `${API_BASE_URL}/user/score/update`,
  leaderboard: `${API_BASE_URL}/leaderboard`, // Added new endpoint for leaderboard
};

interface ApiError {
  message: string;
  status?: number;
}

export const apiCall = async (endpoint: string, options: RequestInit) => {
  try {
    const response = await fetch(endpoint, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    
    let data;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      throw new Error(`Invalid response format: ${text}`);
    }
    
    if (!response.ok) {
      // Handle specific error cases
      if (response.status === 401) {
        throw new Error('Authentication failed. Please log in again.');
      }
      if (response.status === 404) {
        throw new Error('Resource not found.');
      }
      if (response.status === 500) {
        throw new Error('Server error. Please try again later.');
      }
      
      // Handle structured error response
      if (data && data.message) {
        throw new Error(data.message);
      }
      
      throw new Error(`Request failed with status ${response.status}`);
    }
    
    return data;
  } catch (error) {
    // Handle network errors
    if (error instanceof TypeError && error.message === 'Network request failed') {
      throw new Error('Network error. Please check your internet connection.');
    }
    
    // Log the error for debugging
    console.error('API Error:', {
      endpoint,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    });
    
    // Re-throw the error with a clean message
    throw error instanceof Error ? error : new Error('An unexpected error occurred');
  }
};

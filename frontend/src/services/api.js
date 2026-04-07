// API Service for communicating with the backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Generic fetch wrapper
const apiRequest = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Request Failed: ${endpoint}`, error);
    throw error;
  }
};

// Assets API
export const assetsAPI = {
  getAll: () => apiRequest('/assets'),
  getById: (id) => apiRequest(`/assets/${id}`),
  create: (asset) => apiRequest('/assets', { method: 'POST', body: JSON.stringify(asset) }),
  update: (id, asset) => apiRequest(`/assets/${id}`, { method: 'PUT', body: JSON.stringify(asset) }),
  delete: (id) => apiRequest(`/assets/${id}`, { method: 'DELETE' }),
};

// Transfers API
export const transfersAPI = {
  getAll: () => apiRequest('/transfers'),
  create: (transfer) => apiRequest('/transfers', { method: 'POST', body: JSON.stringify(transfer) }),
};

// History API
export const historyAPI = {
  getAll: () => apiRequest('/history'),
  create: (entry) => apiRequest('/history', { method: 'POST', body: JSON.stringify(entry) }),
};

// Buybacks API
export const buybacksAPI = {
  getAll: () => apiRequest('/buybacks'),
  create: (buyback) => apiRequest('/buybacks', { method: 'POST', body: JSON.stringify(buyback) }),
};

// Users API
export const usersAPI = {
  getAll: () => apiRequest('/users'),
  create: (user) => apiRequest('/users', { method: 'POST', body: JSON.stringify(user) }),
  update: (id, user) => apiRequest(`/users/${id}`, { method: 'PUT', body: JSON.stringify(user) }),
};

// Device Types & Makes API
export const equipmentAPI = {
  getDeviceTypes: () => apiRequest('/device-types'),
  updateDeviceTypes: (types) => apiRequest('/device-types', { method: 'PUT', body: JSON.stringify(types) }),
  getMakes: () => apiRequest('/makes'),
  updateMakes: (makes) => apiRequest('/makes', { method: 'PUT', body: JSON.stringify(makes) }),
};

// Hierarchy API (stored as settings with key 'hierarchy')
export const hierarchyAPI = {
  get: () => apiRequest('/settings/hierarchy'),
  update: (hierarchy) => apiRequest('/settings/hierarchy', { method: 'PUT', body: JSON.stringify(hierarchy) }),
};

// Settings API
export const settingsAPI = {
  get: (key) => apiRequest(`/settings/${key}`),
  update: (key, value) => apiRequest(`/settings/${key}`, { method: 'PUT', body: JSON.stringify(value) }),
};

// Initialize data (for first-time setup)
export const initializeData = (data) => {
  return apiRequest('/initialize', { method: 'POST', body: JSON.stringify(data) });
};

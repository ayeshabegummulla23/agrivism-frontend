const API_BASE = import.meta.env.VITE_API_URL || ''

async function request(path, options = {}) {
  const token = localStorage.getItem('agrivism_token')
  const headers = { 'Content-Type': 'application/json', ...options.headers }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.detail || `API error: ${res.status}`)
  }
  return res.json()
}

export async function register(data) {
  const result = await request('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  })
  localStorage.setItem('agrivism_token', result.token)
  localStorage.setItem('agrivism_user', JSON.stringify(result.user))
  return result
}

export async function login(identifier, password) {
  const result = await request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ identifier, password }),
  })
  localStorage.setItem('agrivism_token', result.token)
  localStorage.setItem('agrivism_user', JSON.stringify(result.user))
  return result
}

export async function getMe() {
  return request('/api/auth/me')
}

export function logout() {
  localStorage.removeItem('agrivism_token')
  localStorage.removeItem('agrivism_user')
}

export function getCurrentUser() {
  try {
    const raw = localStorage.getItem('agrivism_user')
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export async function chat(message, language = 'en') {
  return request('/api/chat', {
    method: 'POST',
    body: JSON.stringify({ message, language }),
  })
}

export async function detectDisease(imageUrl, cropType = 'unknown') {
  return request('/api/disease/detect', {
    method: 'POST',
    body: JSON.stringify({ image_url: imageUrl, crop_type: cropType }),
  })
}

export async function recommendCrop(params) {
  return request('/api/crop/recommend', {
    method: 'POST',
    body: JSON.stringify(params),
  })
}

export async function recommendFertilizer(crop = 'rice', stage = 'vegetative') {
  return request(`/api/fertilizer/recommend?crop=${crop}&stage=${stage}`, {
    method: 'POST',
  })
}

export async function checkHealth() {
  return request('/health')
}

export async function getMarketPrices() {
  return request('/api/market/prices')
}

export async function getDashboardStats() {
  return request('/api/dashboard/stats')
}

export async function getDashboardChart() {
  return request('/api/dashboard/chart')
}

export async function getDashboardActivities() {
  return request('/api/dashboard/activities')
}

export async function getDashboardWeather() {
  return request('/api/dashboard/weather')
}

export async function getWaterStatus() {
  return request('/api/water/status')
}

export async function getWaterFarmInfo() {
  return request('/api/water/farm-info')
}

export async function getNotifications() {
  return request('/api/water/notifications')
}

export async function getFarmProfile() {
  return request('/api/farm/profile')
}

export async function registerFarm(data) {
  return request('/api/farm/register', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function getFarmParams() {
  return request('/api/farm/crop-recommendation-params')
}

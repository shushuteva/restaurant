const BASE_URL = 'http://localhost:5143/api';

export async function fetchRestaurants() {
  const response = await fetch(`${BASE_URL}/restaurants`);
  if (!response.ok) throw new Error('Failed to fetch restaurants');
  return response.json();
}

export async function deleteRestaurant(id) {
  const response = await fetch(`${BASE_URL}/restaurants/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to fetch restaurants');
  return response.json();
}
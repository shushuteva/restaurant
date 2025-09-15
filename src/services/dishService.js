const BASE_URL = 'http://localhost:5143/api';

export async function fetchDishes() {
    try {
        const response = await fetch(`${BASE_URL}/dishes`);
        if (!response.ok) {
            throw new Error('Failed to fetch dishes');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching dishes:', error);
        throw error;
    }
}
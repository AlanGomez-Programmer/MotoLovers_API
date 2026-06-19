import { API_KEY } from './config.js';

const BASE_URL = 'https://api.api-ninjas.com/v1/motorcycles';

export async function getMotorcycles(params = {}) {
    const query = new URLSearchParams(params).toString();

    const response = await fetch(`${BASE_URL}?${query}`, {
        headers: { 'X-Api-Key': API_KEY }
    });

    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

    return response.json();
}

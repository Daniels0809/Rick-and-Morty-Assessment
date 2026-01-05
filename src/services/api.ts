import { ApiResponse, Character } from '@/types';

const API_URL = 'https://rickandmortyapi.com/api/character';

interface GetCharactersParams {
  page?: number;
  name?: string;
  status?: string;
}

export async function getCharacters({ page = 1, name = '', status = '' }: GetCharactersParams = {}): Promise<ApiResponse<Character>> {
  try {
    const queryParams = new URLSearchParams();
    if (page) queryParams.append('page', page.toString());
    if (name) queryParams.append('name', name);
    if (status && status !== 'all') queryParams.append('status', status);

    const response = await fetch(`${API_URL}?${queryParams.toString()}`);

    if (!response.ok) {
      if (response.status === 404) {
        // API returns 404 if no results found
        return {
          info: { count: 0, pages: 0, next: null, prev: null },
          results: []
        };
      }
      throw new Error(`Error fetching characters: ${response.statusText}`);
    }

    const data: ApiResponse<Character> = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unknown error occurred while fetching characters');
  }
}

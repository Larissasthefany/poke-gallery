const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

export async function fetchPokemons(offset, limit) {
  try {
    const resp = await fetch(`${BASE_URL}?offset=${offset}&limit=${limit}`);

    if (!resp.ok) {
      throw new Error(`HTTP error! ${resp.status}`);
    }

    const data = await resp.json();
    return data.results;

  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
    return [];
  }
}
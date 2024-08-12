import { PokemonApiResponse } from '@/types/pokemon'

export const getPokemons = async (offset: number, limit: number, name?: string, typeFilter?: string) => {

  try {
    // Validate the necesari parameters
    const headers = {
      'Content-Type': 'application/json',
    }

    let queryStrings = `limit: ${limit}, offset: ${offset}`

    if (typeof name !== 'undefined' && name !== '') {
      queryStrings += `, where: { name: {_ilike: "%${name}%"}}`
    }

    if (typeof typeFilter !== 'undefined' && typeFilter !== '' && typeFilter !== 'all') {
      queryStrings += `, where: {pokemon_v2_pokemontypes: {pokemon_v2_type: {name: {_eq: "${typeFilter}"}}}}`
    }

    queryStrings += `, order_by: {id: asc}`

    const requestBody = {
      query: `query getListOfPokemons {
        pokemon_v2_pokemon(${queryStrings}) {
          id,
          name,
          pokemon_v2_pokemonsprites {
            sprites
          },
          pokemon_v2_pokemontypes{
            type_id
            pokemon_v2_type {
              name
            }
          }
        }
      }`,
    }

    const options = {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody)
    }

    const response = await fetch('https://beta.pokeapi.co/graphql/v1beta', options)
    const data = (await response.json()) as PokemonApiResponse
    return data.data.pokemon_v2_pokemon
  }
  catch (error) {
    throw new Error(`An error happened: ${error}`)
  }
}
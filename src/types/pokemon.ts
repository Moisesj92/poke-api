export interface PokemonSprites {
  sprites: {
    front_default: string
  }
}

export interface PokemonTypes {
  type_id: number,
  pokemon_v2_type: {
    name: string
  }
}

export interface Pokemon {
  id: number
  name: string
  pokemon_v2_pokemonsprites: PokemonSprites[]
  pokemon_v2_pokemontypes: PokemonTypes[]
}


export interface PokemonApiResponse {
  data: {
    pokemon_v2_pokemon: Pokemon[]
  }
}
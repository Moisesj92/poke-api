import Header from '@/components/Header'
import PokemonList from '@/components/PokemonList'
import { getPokemons } from '@/actions/getPokemons'

const INITIAL_NUMBER_OF_POKEMONS = 20

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string
    typeFilter?: string
  }
}) {
  const query = searchParams?.query || '';
  const typeFilter = searchParams?.typeFilter || '';
  const initialPokemons = await getPokemons(0, INITIAL_NUMBER_OF_POKEMONS, query, typeFilter)

  return (
    <>
      <Header />
      <main>
        <PokemonList initialPokemons={initialPokemons} query={query} />
      </main>
    </>
  )
}

'use client'

import { useState } from 'react'
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Pokemon } from '@/types/pokemon'
import PokemonCard from './PokemonCard'
import { getPokemons } from '@/actions/getPokemons'
import { useDebouncedCallback } from 'use-debounce';

type PokemonListProps = {
  initialPokemons: Pokemon[]
  query?: string
}

const NUMBER_OF_POKEMONS_TO_FETCH = 20

export default function PokemonList({ initialPokemons }: PokemonListProps) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const [offset, setOffset] = useState(NUMBER_OF_POKEMONS_TO_FETCH)
  const [pokemons, setPokemons] = useState<Pokemon[]>(initialPokemons)

  const loadMorePokemons = async () => {
    const newPokemons = await getPokemons(pokemons.length, NUMBER_OF_POKEMONS_TO_FETCH)
    setPokemons([...pokemons, ...newPokemons])
    setOffset(offset + NUMBER_OF_POKEMONS_TO_FETCH)
  }

  const searchPokemons = async (queryParams: {
    query?: string
    typeFilter?: string
  }) => {
    const query = queryParams?.query || '';
    const typeFilter = queryParams?.typeFilter || '';

    const response = await getPokemons(offset, NUMBER_OF_POKEMONS_TO_FETCH, query, typeFilter)
    setPokemons(response)
  }

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term)
      params.delete('typeFilter')
      const select = document.getElementById('typeFilter') as HTMLSelectElement
      select.value = 'all'
    } else {
      params.delete('query')
    }
    replace(`${pathname}?${params.toString()}`)
    searchPokemons({ query: term })
    setOffset(0)
  }, 500)

  const handleTypeFilter = async (type: string) => {
    const params = new URLSearchParams(searchParams);
    if (type !== 'all') {
      params.set('typeFilter', type)
      params.delete('query')
      const searchInput = document.getElementById('search') as HTMLInputElement
      searchInput.value = ''
    } else {
      params.delete('typeFilter')
    }
    replace(`${pathname}?${params.toString()}`)
    searchPokemons({ typeFilter: type })
    setOffset(0)
  }

  const loadMoreButton = () => {
    if (searchParams.size === 0) {
      return (
        <button
          onClick={loadMorePokemons}
          type="button"
          className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg col-start-2 col-span-2"
        >
          Load More
        </button>
      )
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className='grid grid-cols-4'>
        <div className='col-span-1 py-5'>
          <label htmlFor="search" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
            Quick search
          </label>
          <input
            id="search"
            name="search"
            type="text"
            className="block rounded-md w-full border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-900 dark:text-white"
            defaultValue={searchParams.get('query')?.toString()}
            onChange={(event) => {
              handleSearch(event.target.value)
            }}
          />
        </div>
        <div className='col-span-1 col-start-4 py-5'>
          <label htmlFor="typeFilter" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
            type filter
          </label>
          <select
            id="typeFilter"
            name="typeFilter"
            className="block rounded-md w-full border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-900 dark:text-white"
            defaultValue={searchParams.get('typeFilter')?.toString()}
            onChange={(event) => {
              handleTypeFilter(event.target.value)
            }}
          >
            <option value="all">All</option>
            <option value="grass">Grass</option>
            <option value="fire">Fire</option>
            <option value="water">Water</option>
          </select>

        </div>
      </div>

      <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon}></PokemonCard>
        ))}
      </ul>
      <div className="grid grid-cols-4">
        {loadMoreButton()}
      </div>
    </div >

  )

}
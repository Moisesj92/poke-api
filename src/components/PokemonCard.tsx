import { Pokemon } from '@/types/pokemon'

type PokemonCardProps = {
  pokemon: Pokemon
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <li
      className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow dark:bg-gray-900"
    >
      <div className="flex flex-1 flex-col p-8">
        <img alt="" src={pokemon.pokemon_v2_pokemonsprites[0].sprites.front_default} className="mx-auto h-32 w-32 flex-shrink-0 rounded-full" />
        <h3 className="mt-6 text-sm font-medium text-gray-900 dark:text-white">{pokemon.name}</h3>
        <dl className="mt-1 flex flex-grow flex-col justify-between">
          <dt className="sr-only">Role</dt>
          <dd className="mt-3">
            {pokemon.pokemon_v2_pokemontypes.map((type) => {
              let typeColor = ''

              switch (type.pokemon_v2_type.name) {
                case 'grass':
                  typeColor = 'bg-green-300 text-green-800 ring-green-600/20'
                  break;

                case 'fire':
                  typeColor = 'bg-red-300 text-red-800 ring-red-600/20'
                  break;

                case 'water':
                  typeColor = 'bg-blue-300 text-blue-800 ring-blue-600/20'
                  break;

                default:
                  typeColor = 'bg-gray-300 text-gray-800 ring-gray-600/20 dark:bg-gray-700 dark:text-gray-200 dark:ring-gray-600/20'
                  break;
              }

              return (
                <span key={type.type_id} className={"inline-flex items-center rounded-full px-1 py-1 mx-1 text-xs font-medium ring-1 ring-inset" + typeColor}>
                  {type.pokemon_v2_type.name}
                </span>
              )
            })}
          </dd>
        </dl>
      </div>
    </li>
  )
}
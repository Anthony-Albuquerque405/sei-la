"use client";

import { useState, useEffect } from "react";
import { DataType } from "../app/api/pokemon/route";

interface PokemonDetail {
  name: string;
  sprites: { front_default: string };
  types: { type: { name: string } }[];
  abilities: { ability: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
}

export default function Home() {
  const [pokemons, setPokemons] = useState<PokemonDetail[]>([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      const res = await fetch("/api/pokemon/?offset=100&limit=250");
      const data: DataType = await res.json();

      const details = await Promise.all(
        data.results.map(async (poke) => {
          const resDetail = await fetch(poke.url);
          const detail = await resDetail.json();
          return {
            name: detail.name,
            sprites: detail.sprites,
            types: detail.types,
            abilities: detail.abilities,
            stats: detail.stats,
          };
        }),
      );

      setPokemons(details);
    };

    fetchPokemon();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {pokemons.map((poke) => (
        <div
          key={poke.name}
          className="bg-yellow-100 border-4 border-yellow-400 rounded-xl shadow-lg p-4 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-2xl"
        >
          <img
            src={poke.sprites.front_default}
            alt={poke.name}
            className="w-24 h-24 mb-2 drop-shadow-md"
          />
          <h2 className="capitalize text-xl font-bold text-red-600 mb-2">
            {poke.name}
          </h2>

          <p className="text-sm text-gray-700 mb-1">
            <strong>Tipos:</strong>{" "}
            {poke.types.map((t) => t.type.name).join(", ")}
          </p>
          <p className="text-sm text-gray-700 mb-1">
            <strong>Habilidades:</strong>{" "}
            {poke.abilities.map((a) => a.ability.name).join(", ")}
          </p>

          <div className="mt-2 w-full">
            <strong className="text-sm text-blue-600">Stats:</strong>
            <ul className="text-xs text-gray-800 mt-1">
              {poke.stats.map((s) => (
                <li key={s.stat.name}>
                  {s.stat.name}: {s.base_stat}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

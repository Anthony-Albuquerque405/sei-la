"use client";

import { useState, useEffect, useCallback } from "react";
import { DataType } from "../app/api/pokemon/route";

interface PokemonDetail {
  id: number;
  name: string;
  sprites: { front_default: string };
  types: { type: { name: string } }[];
  abilities: { ability: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
}

const typeColors: { [key: string]: string } = {
  normal: "bg-gray-400",
  fire: "bg-red-500",
  water: "bg-blue-500",
  electric: "bg-yellow-400",
  grass: "bg-green-500",
  ice: "bg-blue-300",
  fighting: "bg-red-700",
  poison: "bg-purple-500",
  ground: "bg-yellow-600",
  flying: "bg-indigo-400",
  psychic: "bg-pink-500",
  bug: "bg-green-400",
  rock: "bg-yellow-700",
  ghost: "bg-purple-700",
  dragon: "bg-indigo-600",
  dark: "bg-gray-800",
  steel: "bg-gray-500",
  fairy: "bg-pink-300",
};

const LIMIT = 20;

export default function Home() {
  const [pokemons, setPokemons] = useState<PokemonDetail[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchPokemon = useCallback(async (currentOffset: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/pokemon/?offset=${currentOffset}&limit=${LIMIT}`);
      const data: DataType = await res.json();

      if (data.results.length === 0) {
        setHasMore(false);
        setLoading(false);
        return;
      }

      const details = await Promise.all(
        data.results.map(async (poke) => {
          const resDetail = await fetch(poke.url);
          const detail = await resDetail.json();
          return {
            id: detail.id,
            name: detail.name,
            sprites: detail.sprites,
            types: detail.types,
            abilities: detail.abilities,
            stats: detail.stats,
          };
        }),
      );

      setPokemons((prev) => {
        const existingIds = new Set(prev.map(p => p.id));
        const newPokemons = details.filter(p => !existingIds.has(p.id));
        return [...prev, ...newPokemons];
      });
      
      if (!data.next) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to fetch pokemons:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPokemon(0);
  }, [fetchPokemon]);

  const loadMore = () => {
    const newOffset = offset + LIMIT;
    setOffset(newOffset);
    fetchPokemon(newOffset);
  };

  return (
    <div className="min-h-screen pb-12">
      {/* Header Pokédex */}
      <header className="bg-red-600 text-white shadow-md rounded-b-3xl p-6 mb-8 border-b-8 border-red-800 flex items-center justify-center relative overflow-hidden">
        <div className="absolute top-1/2 left-8 -translate-y-1/2 w-16 h-16 bg-blue-400 rounded-full border-4 border-white shadow-[0_0_10px_rgba(255,255,255,0.8)] hidden sm:block"></div>
        <div className="absolute top-4 left-28 w-4 h-4 bg-red-400 rounded-full border-2 border-red-800 hidden sm:block"></div>
        <div className="absolute top-4 left-36 w-4 h-4 bg-yellow-400 rounded-full border-2 border-yellow-800 hidden sm:block"></div>
        <div className="absolute top-4 left-44 w-4 h-4 bg-green-400 rounded-full border-2 border-green-800 hidden sm:block"></div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-wider drop-shadow-lg text-center z-10" style={{ textShadow: "2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 4px 4px 0 #2a75bb" }}>
          Pokédex
        </h1>
      </header>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {pokemons.map((poke) => (
            <div
              key={poke.id}
              className="bg-white/90 backdrop-blur-sm border-2 border-gray-200 rounded-2xl shadow-xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-red-400 group relative"
            >
              {/* Card Header (Image Background) */}
              <div className="bg-gray-100 p-6 flex justify-center relative rounded-b-[40%] mb-4 group-hover:bg-red-50 transition-colors duration-300 border-b-2 border-gray-200 group-hover:border-red-200">
                <span className="absolute top-3 right-4 text-gray-400 font-bold text-lg">#{String(poke.id).padStart(3, '0')}</span>
                <img
                  src={poke.sprites.front_default || "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"}
                  alt={poke.name}
                  className="w-32 h-32 drop-shadow-xl z-10 group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              <div className="px-6 pb-6 flex-grow flex flex-col">
                <h2 className="capitalize text-2xl font-black text-gray-800 mb-3 text-center">
                  {poke.name}
                </h2>

                <div className="flex justify-center gap-2 mb-4">
                  {poke.types.map((t) => (
                    <span
                      key={t.type.name}
                      className={`text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-sm ${typeColors[t.type.name] || 'bg-gray-500'}`}
                    >
                      {t.type.name}
                    </span>
                  ))}
                </div>

                <div className="mt-auto">
                  <p className="text-xs text-gray-500 font-semibold mb-2 uppercase tracking-wider text-center">Stats Base</p>
                  <div className="space-y-2">
                    {poke.stats.map((s) => {
                      let statName = s.stat.name;
                      if (statName === 'special-attack') statName = 'sp.atk';
                      if (statName === 'special-defense') statName = 'sp.def';
                      
                      const percentage = Math.min((s.base_stat / 255) * 100, 100);
                      let barColor = "bg-green-500";
                      if (s.base_stat < 50) barColor = "bg-red-500";
                      else if (s.base_stat < 80) barColor = "bg-yellow-500";

                      return (
                        <div key={s.stat.name} className="flex items-center text-xs">
                          <span className="w-12 font-bold text-gray-600 uppercase">{statName}</span>
                          <span className="w-8 text-right font-medium mr-2">{s.base_stat}</span>
                          <div className="flex-grow bg-gray-200 rounded-full h-2 overflow-hidden">
                            <div className={`h-full rounded-full ${barColor}`} style={{ width: `${percentage}%` }}></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {loading && (
          <div className="flex justify-center my-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-red-600"></div>
          </div>
        )}

        {!loading && hasMore && pokemons.length > 0 && (
          <div className="flex justify-center mt-12 mb-8">
            <button
              onClick={loadMore}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105 active:scale-95 text-lg"
            >
              Carregar Mais Pokémons
            </button>
          </div>
        )}
        
        {!hasMore && (
          <div className="text-center text-gray-500 font-medium mt-12 mb-8">
            Você viu todos os Pokémons!
          </div>
        )}
      </div>
    </div>
  );
}

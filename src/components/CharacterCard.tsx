import React from 'react';
import { Character } from '@/types';

interface CharacterCardProps {
  character: Character;
}

export default function CharacterCard({ character }: CharacterCardProps) {
  const getStatusColor = (status: Character['status']) => {
    switch (status) {
      case 'Alive': return 'var(--primary)';
      case 'Dead': return 'var(--danger)';
      default: return 'var(--text-muted)';
    }
  };

  return (
    <div className="rm-card flex flex-col h-full">
      <div className="relative w-full pt-[100%] overflow-hidden bg-gray-800">
        <img
          src={character.image}
          alt={character.name}
          className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          loading="lazy"
        />
        <div
          className="absolute top-2 right-2 px-2 py-1 rounded text-xs font-bold text-white shadow-md uppercase tracking-wide"
          style={{ backgroundColor: getStatusColor(character.status) }}
        >
          {character.status}
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1 gap-2">
        <h3 className="text-xl font-bold text-ellipsis overflow-hidden whitespace-nowrap" title={character.name}>
          {character.name}
        </h3>

        <div className="flex flex-col gap-1 text-sm mt-auto">
          <div className="flex justify-between border-b border-gray-700 pb-1">
            <span className="text-muted">Species:</span>
            <span className="font-medium text-rick">{character.species}</span>
          </div>
          <div className="flex justify-between border-b border-gray-700 pb-1 pt-1">
            <span className="text-muted">Gender:</span>
            <span className="text-foreground">{character.gender}</span>
          </div>
          <div className="flex justify-between pt-1">
            <span className="text-muted">Origin:</span>
            <span className="text-foreground text-right truncate max-w-[150px]" title={character.origin.name}>
              {character.origin.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

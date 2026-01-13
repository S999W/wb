import React from 'react';
import { Song } from '../types';

const songs: Song[] = [
  { 
    id: '1', 
    title: 'just go', 
    artist: 'steezy', 
    url: 'https://open.spotify.com/album/4Nr9xCqjoLEg6cXRQDqb2K' 
  },
  { 
    id: '2', 
    title: 'return', 
    artist: 'steezy', 
    url: 'https://open.spotify.com/album/1wqFBpDwJwKQvdCZWwgJKn' 
  },
  { 
    id: '3', 
    title: 'ocean', 
    artist: 'steezy', 
    url: 'https://open.spotify.com/album/1HFPPpQViod1FGD7vCD3cJ' 
  },
];

const MusicSection: React.FC = () => {
  return (
    <section className="py-24 px-4 max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mb-12 justify-center">
        <h2 className="text-3xl font-bold tracking-tight text-[#e9dfda]">music</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {songs.map((song) => (
          <a 
            key={song.id} 
            href={song.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group aspect-square bg-neutral-900/50 border border-neutral-800 rounded-xl hover:bg-neutral-900 hover:border-neutral-700 transition-all cursor-pointer flex flex-col items-center justify-center p-8 text-center"
          >
             <h3 className="text-xl font-bold text-[#e9dfda] translate-y-4 group-hover:translate-y-0 transition-all duration-300">{song.title}</h3>
             <p className="text-neutral-400 text-sm translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">{song.artist}</p>
          </a>
        ))}
      </div>

      <div className="pt-12 text-center">
        <a 
          href="https://open.spotify.com/artist/2S9iGc3OMcuZlKEQOXUsDR"
          target="_blank"
          rel="noopener noreferrer" 
          className="text-base font-bold border-b border-[#e9dfda]/30 pb-[3px] hover:pb-1 cursor-pointer hover:border-[#e9dfda] transition-all duration-300 hover:text-[#e9dfda] text-[#e9dfda]/30 inline-block"
        >
          listen on spotify
        </a>
      </div>
    </section>
  );
};

export default MusicSection;
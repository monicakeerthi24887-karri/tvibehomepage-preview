"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipForward, Volume2, VolumeX, Music, X } from "lucide-react";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const audioRef = useRef(null);

  // We are using a free lo-fi placeholder stream for the audio player.
  const src = "https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3";

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
    }
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-24 md:bottom-6 right-6 z-40">
      <div className="bg-white/80 backdrop-blur-xl border border-[#d1d9e6] rounded-full p-2 pr-4 flex items-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative">
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute -top-2 -right-2 bg-white text-gray-500 hover:text-red-500 rounded-full p-1 shadow-md border border-gray-200 transition-all"
        >
          <X className="h-3 w-3" />
        </button>
        <audio ref={audioRef} src={src} loop />
        
        <button 
          onClick={togglePlay}
          className="bg-[#1a1a1a] hover:bg-siri-gradient text-white h-10 w-10 rounded-full flex items-center justify-center transition-all shadow-md group relative"
        >
          {isPlaying ? (
            <Pause strokeWidth={2.5} className="h-4 w-4" />
          ) : (
            <Play strokeWidth={2.5} className="h-4 w-4 ml-1" />
          )}
        </button>

        <div className="ml-4 mr-6">
          <p className="text-[9px] font-black uppercase tracking-widest text-[#ff6b00] animate-pulse">
            TVIBE Radio
          </p>
          <p className="text-[10px] font-bold text-[#1a1a1a] flex items-center gap-1">
            <Music className="h-2 w-2" /> Live Mix
          </p>
        </div>

        <button 
          onClick={toggleMute}
          className="text-[#a0a0a0] hover:text-[#1a1a1a] transition-colors"
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}

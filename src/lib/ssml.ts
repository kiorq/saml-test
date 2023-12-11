"use client";
import { useEffect, useRef, useState } from "react";

type SSML = string;

interface SpeechEngine {
  isSpeaking: boolean;
  speak: (ssml: SSML) => void;
  pause: () => void;
}

export const useSpeechEngine = (): SpeechEngine => {
  const audioRef = useRef<HTMLMediaElement>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
  }, []);

  const speak = (ssml: SSML) => {
    const url = new URL(window.location.origin + "/api/ssml-audio");
    url.searchParams.append("ssml", ssml);
    if (audioRef.current) {
      audioRef.current.src = url.toString();
      audioRef.current.play();
    }
  };
  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  return { isSpeaking, speak, pause };
};

export const textToSSML = (text: string): SSML => {
  let ssml = text
    .replace(/,/g, '<break time="300ms" />')
    .replace(/(\?)/g, '<prosody rate="slow">$1</prosody>')
    .replace(/([A-Z]{2,})/g, '<emphasis level="strong">$1</emphasis>')
    .replace(/(([A-Z]\.){2,})/g, '<emphasis level="strong">$1</emphasis>');

  return `<speak>${ssml}</speak>`;
};

"use client";
import { useEffect, useRef, useState } from "react";

type SSML = string;

interface SpeechEngine {
  isSpeaking: boolean;
  loadSSML: (ssml: SSML) => void;
  play: () => void;
  pause: () => void;
}

export const useSpeechEngine = (): SpeechEngine => {
  const audioRef = useRef<HTMLMediaElement>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string>();

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();

      return () => {
        audioRef.current.addEventListener("ended", () => {
          setIsSpeaking(false);
        });
      };
    }
  }, []);

  const loadSSML = (ssml: SSML) => {
    if (audioRef.current) {
      const newAudioUrl = ssmlAudioUrl(ssml);
      if (audioUrl != newAudioUrl) {
        audioRef.current.src = newAudioUrl;
        setAudioUrl(newAudioUrl);
      }
    }
  };
  const play = () => {
    if (audioRef.current && audioRef.current.src) {
      audioRef.current.play();
      setIsSpeaking(true);
    }
  };
  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsSpeaking(false);
    }
  };

  return { isSpeaking, loadSSML, play, pause };
};

export const textToSSML = (text: string): SSML => {
  let ssml = text
    .replace(/,/g, '<break time="300ms" />')
    .replace(/(\?)/g, '<prosody rate="slow">$1</prosody>')
    .replace(/([A-Z]{2,})/g, '<say-as interpret-as="characters">$1</say-as>')
    .replace(/(([A-Z]\.){2,})/g, '<emphasis level="strong">$1</emphasis>');

  return `<speak>${ssml}</speak>`;
};

export const ssmlAudioUrl = (ssml: SSML) => {
  const url = new URL(window.location.origin + "/api/ssml-audio");
  url.searchParams.append("ssml", ssml);
  return url.toString();
};

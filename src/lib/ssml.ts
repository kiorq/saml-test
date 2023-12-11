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
  let ssml = "<speak>";

  // Split text into sentences using a regular expression
  const sentences = text.match(/[^\.!\?]+[\.!\?]+/g);
  if (sentences) {
    sentences.forEach((sentence) => {
      // Example: Adding a pause after commas
      let ssmlSentence = sentence.replace(/,/g, ',<break time="500ms"/>');

      // Example: Adding emphasis on words that are in all caps
      ssmlSentence = ssmlSentence.replace(
        /\b([A-Z]{2,})\b/g,
        '<emphasis level="strong">$1</emphasis>'
      );

      // Add the processed sentence to the SSML string
      ssml += `<p>${ssmlSentence}</p>`;
    });
  }

  ssml += "</speak>";
  return ssml;
};

export const ssmlAudioUrl = (ssml: SSML) => {
  const url = new URL(window.location.origin + "/api/ssml-audio");
  url.searchParams.append("ssml", ssml);
  return url.toString();
};

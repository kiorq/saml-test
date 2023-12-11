"use client";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import Button from "@/components/Button";
// import SavedItem from "@/components/SavedItem";
import { textToSSML, useSpeechEngine } from "@/lib/ssml";

type FormSpeakingId = 0;
type SpeakingId = FormSpeakingId | number;

const getSSMLById = (id: number) => "";

export default function Home() {
  const { speak, pause, isSpeaking } = useSpeechEngine();
  const [input, setInput] = useState<string>("");
  const [speakingId, setSpeakingId] = useState<SpeakingId>(0);

  // this store the value of the form in state
  const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  // this toggles speak of the input in the form
  const onToggleSpeakInput = useCallback(() => {
    if (isSpeaking) {
      pause();
    }
    setSpeakingId(0); // sir... the form is speaking
    speak(textToSSML(input));
  }, [isSpeaking, pause, speak, input]);

  // const isSpeakingById = useCallback(
  //   (id: number) => isSpeaking && speakingId == id,
  //   [speakingId, isSpeaking]
  // );

  // this handler that will toggle the speech engine
  // const makeToggleSpeakSavedItemHandler = useCallback(
  //   (id: number) => {
  //     return () => {
  //       if (isSpeaking) {
  //         // stop speaking
  //         pause();
  //       }

  //       if (!isSpeaking || speakingId != id) {
  //         // user wants to speek
  //         setSpeakingId(id);
  //         speak(getSSMLById(id));
  //       }
  //     };
  //   },
  //   [isSpeaking, speakingId, pause, speak]
  // );
  return (
    <>
      <nav className="tw-w-full tw-py-3 tw-flex tw-justify-center">
        <Image
          alt="Speechify Icon"
          src="https://speechify.com/wp-content/themes/speechify-custom/assets/images/SpeechifyLogo-test.svg"
          width={200}
          height={35}
        />
      </nav>
      <main className="tw-w-full tw-max-w-3xl tw-mx-auto tw-px-2 md:tw-px-0 tw-flex tw-flex-col tw-gap-5">
        <form>
          <textarea
            className="tw-bg-white tw-border-2 tw-border-dark tw-rounded-lg tw-w-full tw-h-60 tw-p-3 tw-outline-primary tw-text-dark"
            onChange={onInputChange}
            defaultValue={input}
          />
          <div className="tw-w-full tw-flex tw-flex-row tw-gap-3">
            <Button text="Play" onClick={onToggleSpeakInput} />
            <Button text="Save" onClick={() => {}} />
          </div>
        </form>

        {/* <ul>
          <SavedItem
            displayText="This is what the user save and we can replay it and pause it This
              is what the user save and we can replay it and pause it This is
              what the user save and we can replay it and pause it This is what
              the user save and we can replay it and pause it This is what the
              user save and we can replay it and pause it"
            isPlaying={isSpeakingById(1)}
            toggleSpeak={makeToggleSpeakSavedItemHandler(1)}
          />
          <SavedItem
            displayText="This is what the user save and we can replay it and pause it This
              is what the user save and we can replay it and pause it This is
              what the user save and we can replay it and pause it This is what
              the user save and we can replay it and pause it This is what the
              user save and we can replay it and pause it"
            isPlaying={isSpeakingById(1)}
            toggleSpeak={makeToggleSpeakSavedItemHandler(1)}
          />
          <SavedItem
            displayText="This is what the user save and we can replay it and pause it This
              is what the user save and we can replay it and pause it This is
              what the user save and we can replay it and pause it This is what
              the user save and we can replay it and pause it This is what the
              user save and we can replay it and pause it"
            isPlaying={isSpeakingById(1)}
            toggleSpeak={makeToggleSpeakSavedItemHandler(1)}
          />
          <SavedItem
            displayText="This is what the user save and we can replay it and pause it This
              is what the user save and we can replay it and pause it This is
              what the user save and we can replay it and pause it This is what
              the user save and we can replay it and pause it This is what the
              user save and we can replay it and pause it"
            isPlaying={isSpeakingById(1)}
            toggleSpeak={makeToggleSpeakSavedItemHandler(1)}
          />
        </ul> */}
      </main>
    </>
  );
}

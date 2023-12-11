"use client";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import Button from "@/components/Button";
import SavedItem from "@/components/SavedItem";
import { textToSSML, useSpeechEngine } from "@/lib/ssml";
import { Item, useSavedItems } from "@/lib/storage";

export default function Home() {
  const { loadSSML, play, pause, isSpeaking } = useSpeechEngine();
  const [speakingId, setSpeakingId] = useState(0); // 0 for form
  const { items, addItem } = useSavedItems();
  const [input, setInput] = useState<string>("");

  // this store the value of the form in state
  const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  // this toggles speak of the input in the form
  const onToggleSpeakFormInput = useCallback(() => {
    if (isSpeaking) {
      pause();
    } else {
      loadSSML(textToSSML(input));
      play();
      setSpeakingId(0);
    }
  }, [isSpeaking, pause, play, loadSSML, input]);
  // add data in form to saved items storage
  const onSave = useCallback(() => {
    addItem({
      originalText: input,
      ssml: textToSSML(input),
    });
  }, [input, addItem]);

  const makeToggleSpeakSavedItemHandler = useCallback(
    (item: Item) => {
      return () => {
        // we can play a saved item for the first time (expected: play)
        // pause the same item that was played (expected: pause)
        // play a second item while one is already playing (expected: pause & play)
        // play a second item while nothing is play (expected: play)

        if (speakingId == item.id) {
          // toggling same item
          if (!isSpeaking) {
            setSpeakingId(item.id);
            play();
          } else if (isSpeaking) {
            pause();
          }
        } else {
          pause();
          loadSSML(item.ssml);
          play();
          setSpeakingId(item.id);
        }
      };
    },
    [isSpeaking, speakingId, pause, loadSSML, play]
  );

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
            <Button
              text={isSpeaking && speakingId == 0 ? "Pause" : "Speak"}
              onClick={onToggleSpeakFormInput}
            />
            <Button text="Save" onClick={onSave} />
          </div>
        </form>

        {items.length > 0 ? (
          <ul>
            {items.map((item) => (
              <SavedItem
                key={`saved-item-${item.id}`}
                displayText={item.originalText}
                isSpeaking={isSpeaking && speakingId == item.id}
                toggleSpeak={makeToggleSpeakSavedItemHandler(item)}
              />
            ))}
          </ul>
        ) : (
          <p className="tw-text-center tw-text-dark tw-font-medium tw-py-8">
            No Saved Items
          </p>
        )}
      </main>
    </>
  );
}

interface SavedItemProps {
  isPlaying: boolean;
  toggleSpeak: () => void;
  displayText: string;
}

const SavedItem = ({ isPlaying, toggleSpeak, displayText }: SavedItemProps) => {
  return (
    <li className="tw-w-full tw-bg-slate-100 tw-p-3 tw-rounded-lg tw-mb-2 last:tw-mb-0 tw-flex tw-flex-row tw-gap-3">
      <div>
        <button
          className="tw-bg-primary tw-p-2 tw-rounded-full tw-text-white focus:tw-opacity-70 hover:tw-opacity-90"
          onClick={toggleSpeak}
        >
          {isPlaying ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={40}
              height={40}
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={40}
              height={40}
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
            </svg>
          )}
        </button>
      </div>

      <p className="tw-text-dark tw-font-medium">{displayText}</p>
    </li>
  );
};

export default SavedItem;

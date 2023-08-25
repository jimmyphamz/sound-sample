import { useEffect, useState } from "react";
import { PlayingState, createSpeechEngine } from "./speech";

const useSpeech = (sentences: Array<string>) => {
  /*
  Implement a custom useSpeech hook that uses a speech engine defined in 'speech.ts'
  to play the sentences that have been fetched and parsed previously.
  
  This hook should return react friendly controls for playing, and pausing audio as well as provide information about
  the currently read word and sentence
  */
  const options = {
    onBoundary: (e: SpeechSynthesisEvent) => {
      // update current playing word
      const current = currentSentence.substring(e.charIndex, e.charIndex + e.charLength);
      setCurrentWord(current);
    },
    onEnd: (e: SpeechSynthesisEvent) => {
      // end of each sentence
      if (currentIndex === sentences.length - 1) {
        setCurrentIndex(0);
        setCurrentSentence(sentences[0]);
        setCurrentWord('');
      } else {
        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);
        setCurrentSentence(sentences[nextIndex]);
        setCurrentWord('');
      }
    },
    onStateUpdate: (state: PlayingState) => setPlayState(state)
  };

  const {
    play,
    pause,
    load,
  } = createSpeechEngine(options);

  const [playState, setPlayState] = useState<PlayingState>('initialized');
  const [currentWord, setCurrentWord] = useState<string>('');
  const [currentSentence, setCurrentSentence] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    if (sentences.length > 0) {
      setCurrentSentence(sentences[0]);
      setCurrentIndex(0);
    }
  }, [sentences])

  const controlPlay = () => {
    load(currentSentence);
    play();
  }

  return {
    currentWord, currentSentence, controls: {
      state: playState,
      play: controlPlay,
      pause
    }
  }
};

export { useSpeech };

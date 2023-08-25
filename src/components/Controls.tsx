import { PlayingState } from "../lib/speech";

// Implement a component that provides basic UI options such as playing, pausing and loading new content
export const Controls = ({
  state,
  play,
  pause,
  fetchSentences
}: {
  state: PlayingState;
  play: () => void,
  pause: () => void,
  fetchSentences: () => void,
}) => {
  return <div>
    {state === 'playing' ? <button onClick={() => pause()}>Pause</button> : <button onClick={() => play()}>Play</button>}
    <button onClick={fetchSentences}>Load new Content</button>
  </div>;
};

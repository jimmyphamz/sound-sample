import { useEffect, useState } from 'react';
import './App.css';

import { Controls } from './components/Controls';
import { CurrentlyReading } from './components/CurrentlyReading';
import { fetchContent, parseContentIntoSentences } from './lib/content';
import { useSpeech } from './lib/useSpeech';

function App() {
  const [sentences, setSentences] = useState<Array<string>>([]);
  const { currentWord, currentSentence, controls: {
    state,
    play,
    pause
  } } = useSpeech(sentences);

  const fetchSentences = async () => {
    const fetchedContent = await fetchContent();
    const sentences = parseContentIntoSentences(fetchedContent.content);
    setSentences(sentences);
  }

  useEffect(() => {
    fetchSentences();
  }, [])

  return (
    <div className="App">
      <h1>Text to speech</h1>
      <div>
        <CurrentlyReading sentences={sentences} currentWord={currentWord} currentSentence={currentSentence} />
      </div>
      <div>
        <Controls state={state} play={play} pause={pause} fetchSentences={fetchSentences}/>
      </div>
    </div>
  );
}

export default App;

// Implement a component that displays the currently read word and sentence 
export const CurrentlyReading = ({ sentences, currentWord, currentSentence }: { sentences: string[]; currentWord: string; currentSentence: string; }) => {
  const words = currentSentence.split(' ');
  const highlightedText = words.map((word, index) => (
    <span key={index}>
      {word === currentWord ? (
        <span style={{ color: 'red' }}>{word}</span>
      ) : (
        word
      )}
      {index < words.length - 1 && ' '} 
    </span>
  ));
  return (
    <div className="currently-reading">
      <div>{highlightedText}</div>
      <div>{sentences && sentences.join(' ')}</div>
    </div>
  );
};

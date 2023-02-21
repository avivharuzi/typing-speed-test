export interface Word {
  letters: WordLetter[];
  text: string;
  fullText: string;
  status: WordStatus;
  isHidden: boolean;
  lastValue: string;
}

export interface WordLetter {
  value: string;
  hasMatch: boolean;
}

export type WordStatus = 'valid' | 'invalid' | 'active' | 'none';

export interface WordItemProps {
  word: Word;
}

const WORD_STATUS_CLASS_RECORD: Record<WordStatus, string> = {
  valid: 'text-blue-700',
  invalid: 'text-red-700',
  active: 'bg-lime-300',
  none: '',
};

const WordItem = ({ word }: WordItemProps) => {
  const { letters, text, status, isHidden } = word;

  return (
    <span
      className={`text-3xl tracking-wide p-1 rounded-lg ${
        WORD_STATUS_CLASS_RECORD[status]
      } ${isHidden ? 'hidden' : ''}`}
    >
      {letters.map((letter, index) => (
        <span
          className={letter.hasMatch ? 'text-white' : 'text-red-700'}
          key={index}
        >
          {letter.value}
        </span>
      ))}
      {text}
    </span>
  );
};

export default WordItem;

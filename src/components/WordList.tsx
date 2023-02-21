import WordItem, { Word } from './WordItem';

export interface WordListProps {
  words: Word[];
}

const WordList = ({ words }: WordListProps) => {
  return (
    <div className="p-3 flex">
      <div className="grid gap-4 lg:gap-8 grid-cols-3 lg:grid-cols-4 justify-items-center w-full">
        {words.map((word, index) => {
          return <WordItem key={index} word={word} />;
        })}
      </div>
    </div>
  );
};

export default WordList;

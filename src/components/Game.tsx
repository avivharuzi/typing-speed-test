import { useEffect, useState } from 'react';

import { getWordBank, shuffleArray } from '../utils';
import GameLayout from './GameLayout';
import GameResult, { GameResultProps } from './GameResult';
import { GameResultMistake } from './GameResultMistakeList';
import GameScore from './GameScore';
import Input from './Input';
import { Word, WordLetter } from './WordItem';
import WordList from './WordList';

// 4 each row * 3
const MAX_VISIBLE_WORDS = 12;

// 60 seconds
const DEFAULT_TIME_LEFT = 60;

const createWordList = (): Word[] => {
  return shuffleArray(getWordBank()).map((word, index) => {
    return {
      letters: [],
      text: word,
      fullText: word,
      status: index === 0 ? 'active' : 'none',
      isHidden: index >= MAX_VISIBLE_WORDS,
      lastValue: '',
    };
  });
};

const calcCPM = (wordList: Word[]): number => {
  return wordList.reduce(
    (currentCPM, word) => currentCPM + word.lastValue.length,
    0
  );
};

const Game = () => {
  const [timeLeft, setTimeLeft] = useState(DEFAULT_TIME_LEFT);
  const [currentValue, setCurrentValue] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [wordList, setWordList] = useState<Word[]>(createWordList());
  const [result, setResult] = useState<GameResultProps | null>(null);

  useEffect(() => {
    if (currentValue.trim() !== '' && !isPlaying) {
      startGame();

      return;
    }

    if (!isPlaying) {
      return;
    }

    // If we need to go the next word.
    const isFinishedWord = currentValue.endsWith(' ');
    // Calculate the visible indexes.
    const firstVisibleIndex = activeIndex - (activeIndex % MAX_VISIBLE_WORDS);
    const lastVisibleIndex = firstVisibleIndex + MAX_VISIBLE_WORDS - 1;

    setWordList((wordList) => {
      return wordList.map((word, index) => {
        const isHidden = index < firstVisibleIndex || index > lastVisibleIndex;

        if (activeIndex !== index) {
          return {
            ...word,
            isHidden,
          };
        }

        const fullText = word.fullText;

        const lastValue = currentValue.trim();

        if (isFinishedWord) {
          return {
            ...word,
            letters: [],
            text: fullText,
            status: lastValue === word.fullText ? 'valid' : 'invalid',
            isHidden,
            lastValue,
          };
        }

        const letters: WordLetter[] = fullText
          .substring(0, currentValue.length)
          .split('')
          .map((letter, index) => {
            return {
              value: letter,
              hasMatch: letter === currentValue[index],
            };
          });

        const text = fullText.substring(currentValue.length, fullText.length);

        return {
          ...word,
          letters,
          text,
          status: 'active',
          isHidden,
        };
      });
    });

    if (isFinishedWord) {
      setCurrentValue('');
      setActiveIndex(activeIndex + 1);
    }
  }, [currentValue, activeIndex, isPlaying]);

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    let intervalId: number | null = null;

    if (isPlaying && timeLeft > 0) {
      intervalId = window.setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else {
      finishGame();
    }

    // Remove interval when destroyed.
    return () => {
      if (intervalId !== null) {
        window.clearInterval(intervalId);
      }
    };
  }, [isPlaying, timeLeft]);

  const startGame = () => {
    setIsPlaying(true);
    setTimeLeft(DEFAULT_TIME_LEFT);
    setActiveIndex(0);
    setResult(null);
  };

  const restartGame = () => {
    setCurrentValue('');
    setWordList(createWordList());
    startGame();
  };

  const finishGame = () => {
    const validWords = wordList.filter((word) => word.status === 'valid');
    const invalidWords = wordList.filter((word) => word.status === 'invalid');
    const usedWords = [...validWords, ...invalidWords];

    const cpm = calcCPM(validWords);
    const overallCPM = calcCPM(usedWords);
    const mistakes: GameResultMistake[] = invalidWords.map((word) => {
      return {
        value: word.lastValue,
        text: word.text,
      };
    });

    setResult({
      wpm: validWords.length,
      cpm,
      overallCPM,
      totalWords: usedWords.length,
      mistakes,
    });
  };

  const updateValue = (value: string) => {
    setCurrentValue(value);
  };

  return (
    <GameLayout>
      <GameScore timeLeft={timeLeft} onRestart={restartGame} />
      {result ? (
        <GameResult {...result} />
      ) : (
        <>
          <WordList words={wordList} />
          <div className="border-t-2">
            <Input
              value={currentValue}
              onValueChanged={updateValue}
              placeholder="type the words here"
            />
          </div>
        </>
      )}
    </GameLayout>
  );
};

export default Game;

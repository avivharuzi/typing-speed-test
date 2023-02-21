import { useEffect, useRef } from 'react';

export interface InputProps {
  placeholder?: string;
  value?: string;
  onValueChanged?: (value: string) => void;
}

const Input = ({
  placeholder = '',
  value = '',
  onValueChanged,
}: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const input = inputRef.current;

    if (!input) {
      return;
    }

    input.value = value;
  }, [value]);

  return (
    <input
      ref={inputRef}
      className="w-full h-12 p-2 rounded-b-lg focus:outline-none text-center text-2xl focus:ring-2 focus:ring-purple-300"
      type="text"
      placeholder={placeholder}
      onInput={(event) =>
        onValueChanged &&
        onValueChanged((event.target as HTMLInputElement).value)
      }
    />
  );
};

export default Input;

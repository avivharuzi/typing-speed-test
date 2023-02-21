import { FormEventHandler, forwardRef } from 'react';

export interface InputProps {
  placeholder?: string;
  value?: string;
  onInput: FormEventHandler<HTMLInputElement>;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder = '', value = '', onInput }, ref) => {
    return (
      <input
        className="w-full h-12 p-2 rounded-b-lg focus:outline-none text-center text-2xl focus:ring-2 focus:ring-purple-300"
        type="text"
        placeholder={placeholder}
        value={value}
        onInput={onInput}
        ref={ref}
      />
    );
  }
);

export default Input;

import React from 'react';

interface InputFieldProps {
  className?: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  className = '',
  type,
  name,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className="w-full mb-4">
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className={`w-full px-4 py-2 rounded-xl bg-white border border-gray-300 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition duration-300 placeholder:text-sm placeholder:text-gray-400 ${className}`}
      />
    </div>
  );
};

export default InputField;

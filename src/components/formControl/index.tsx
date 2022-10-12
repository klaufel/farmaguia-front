import { type ReactElement } from 'react';

interface FormControlProps {
  children: ReactElement;
  id?: string;
  label?: string;
}

export default function FormControl({ children, id, label }: FormControlProps) {
  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-semibold text-gray-900"
        >
          {label}
        </label>
      )}
      {children}
    </div>
  );
}

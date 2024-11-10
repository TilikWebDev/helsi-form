import * as React from 'react';
import { CalendarIcon } from 'lucide-react'; // Replace with the actual path to your calendar icon
import { cn } from '@utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, onFocus, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const handleClick = () => {
      if (inputRef.current) {
        inputRef.current.focus();
        if (type === 'date') {
          inputRef.current.showPicker && inputRef.current.showPicker(); // Open the date picker if supported
        }
      }
    };

    return (
      <div className="relative flex items-center" onClick={handleClick}>
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pr-10 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            className
          )}
          ref={inputRef}
          onFocus={onFocus}
          {...props}
        />
        {type === 'date' && (
          <span
            className="absolute right-3"
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
          >
            <CalendarIcon size={16} />
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };

import React, { ReactNode } from 'react';
import { Switch } from '@ui/switch';

interface FormControlProps {
  label?: string;
  error?: string | null;
  additionalText?: string;
  children: ReactNode;
  optional?: boolean;
  optionalValue?: boolean;
  onSwitchChange?: (checked: boolean) => void;
}

const FormControl: React.FC<FormControlProps> = ({
  label,
  error,
  additionalText = '',
  children,
  optional = false,
  optionalValue = false,
  onSwitchChange,
}) => {
  const handleSwitchChange = (checked: boolean) => {
    if (onSwitchChange) {
      onSwitchChange(checked);
    }
  };

  return (
    <div className="mb-4 relative">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      <div className="relative">
        {children}

        {optional && (
          <div className="flex absolute right-2 top-1/2 transform -translate-y-1/2">
            <Switch
              checked={optionalValue}
              onCheckedChange={handleSwitchChange}
            />
          </div>
        )}
      </div>

      {error ? (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      ) : (
        <p className="text-sm text-gray-500 mt-1">
          {additionalText && additionalText}
        </p>
      )}
    </div>
  );
};

export default FormControl;

import React from 'react';
import InputMask from 'react-input-mask';
import { Field } from 'react-final-form';
import { Input } from '@ui/input';
import FormControl from '@components/form-control';

interface InputFieldProps {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  additionalText?: string;
  optional?: boolean;
  optionalValue?: boolean;
  onOptionalChange?: (checked: boolean) => void;
  mask?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  type = 'text',
  placeholder,
  additionalText,
  optional = false,
  optionalValue = false,
  onOptionalChange,
  mask,
}) => (
  <Field name={name}>
    {({ input, meta }) => (
      <FormControl
        label={label}
        error={
          meta.submitFailed && meta.touched && meta.error ? meta.error : null
        }
        additionalText={additionalText}
        optional={optional}
        optionalValue={optionalValue}
        onSwitchChange={onOptionalChange}
      >
        {mask ? (
          <InputMask
            {...input}
            mask={mask}
            placeholder={placeholder}
            disabled={optional && !optionalValue}
            maskChar=""
            formatChars={{
              a: '[A-Za-zА-Яа-яЇїІіЄєҐґ]',
              '9': '[0-9]',
            }}
          >
            {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
              <Input {...inputProps} type="text" />
            )}
          </InputMask>
        ) : (
          <Input
            {...input}
            disabled={optional && !optionalValue}
            type={type}
            placeholder={placeholder}
          />
        )}
      </FormControl>
    )}
  </Field>
);

export default React.memo(InputField);

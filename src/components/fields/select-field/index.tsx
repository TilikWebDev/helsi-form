import React from 'react';
import { Field } from 'react-final-form';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@ui/select';
import FormControl from '@components/form-control';

interface SelectFieldProps {
  name: string;
  label?: string;
  options: { label: string; value: string }[];
}

const SelectField: React.FC<SelectFieldProps> = ({ name, label, options }) => (
  <Field name={name}>
    {({ input, meta }) => (
      <FormControl
        label={label}
        error={meta.touched && meta.error ? meta.error : null}
      >
        <Select {...input} onValueChange={input.onChange}>
          <SelectTrigger>
            <SelectValue placeholder="-- Вибрати --" />
          </SelectTrigger>

          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormControl>
    )}
  </Field>
);

export default React.memo(SelectField);

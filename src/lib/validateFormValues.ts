import * as Yup from 'yup';

export const validateFormValues = async <T extends object>(
  values: T,
  schema: Yup.ObjectSchema<T>
): Promise<Partial<Record<keyof T, string>>> => {
  try {
    await schema.validate(values, { abortEarly: false });
    return {};
  } catch (error) {
    const errors: Partial<Record<keyof T, string>> = {};
    if (error instanceof Yup.ValidationError) {
      error.inner.forEach((err) => {
        if (err.path) {
          errors[err.path as keyof T] = err.message;
        }
      });
    }
    return errors;
  }
};

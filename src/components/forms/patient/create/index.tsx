import React, { useState } from 'react';
import { Form } from 'react-final-form';
import * as Yup from 'yup';
import { Button } from '@ui/button';
import InputField from '@components/fields/input-field';
import SelectField from '@components/fields/select-field';
import { validateFormValues } from '@lib/validateFormValues';

const validationSchema = Yup.object().shape({
  lastName: Yup.string().required('Поле не може бути пустим'),
  firstName: Yup.string().required('Поле не може бути пустим'),
  hasMiddleName: Yup.bool(),
  middleName: Yup.string().when('hasMiddleName', {
    is: true,
    then: (schema) => schema.required('Поле не може бути пустим'),
    otherwise: (schema) => schema.notRequired(),
  }),
  hasTaxId: Yup.bool(),
  taxId: Yup.string().when('hasTaxId', {
    is: true,
    then: (schema) =>
      schema
        .required('Поле не може бути пустим')
        .length(10, 'Ідентифікаційний номер повинен містити 10 символів'),
    otherwise: (schema) => schema.notRequired(),
  }),
  dob: Yup.string().required('Поле не може бути пустим'),
  gender: Yup.string().required('Поле не може бути пустим'),
  birthCountry: Yup.string().required('Поле не може бути пустим'),
  birthPlace: Yup.string().required('Поле не може бути пустим'),
  contactMethod: Yup.string().required('Поле не може бути пустим'),
  secretWord: Yup.string()
    .min(6, 'Секретне слово повинно містити не менше 6 символів')
    .required('Поле не може бути пустим'),
  phone: Yup.string().matches(
    /^\+38\s?\(?0\d{2}\)?\s?\d{3}-?\d{2}-?\d{2}$/,
    'Некоректний номер телефону. Приклад: +38 (093) 999-88-77'
  ),
  email: Yup.string().email('Невірний формат email'),
  docType: Yup.string().required('Поле не може бути пустим'),
  docNumber: Yup.string()
    .matches(
      /^[А-ЩЬЮЯЄІЇҐа-щьюяєіїґ]{3}\d{5,9}$/,
      'Документ повинен містити 3 українські літери та від 5 до 9 цифр'
    )
    .required('Поле не може бути пустим'),
  docIssueDate: Yup.string().required('Поле не може бути пустим'),
  docIssuer: Yup.string().required('Поле не може бути пустим'),
  unrzNumber: Yup.string(),
});

interface PatientFormValues {
  lastName: string;
  firstName: string;
  hasMiddleName: boolean;
  middleName: string;
  hasTaxId: boolean;
  taxId: string;
  dob: string;
  gender: string;
  birthCountry: string;
  birthPlace: string;
  contactMethod: string;
  phone: string;
  secretWord: string;
  email: string;
  docType: string;
  docNumber: string;
  docIssueDate: string;
  docExpiryDate: string;
  docIssuer: string;
  unrzNumber: string;
}

const PatientForm: React.FC = () => {
  const [submittedData, setSubmittedData] = useState<Omit<
    PatientFormValues,
    'hasTaxId' | 'hasMiddleName'
  > | null>(null);

  const onSubmit = (values: PatientFormValues) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hasTaxId, hasMiddleName, ...filteredValues } = values;
    setSubmittedData(filteredValues);
  };

  return (
    <div className="p-8 bg-gray-100">
      <h1 className="text-xl font-bold mb-4">Дані пацієнта</h1>

      <Form
        onSubmit={onSubmit}
        validate={(values) => validateFormValues(values, validationSchema)}
        render={({ handleSubmit, form, values, submitting }) => (
          <form onSubmit={handleSubmit} className="space-y-6">
            <section className="bg-white p-6 rounded-md shadow">
              <h2 className="text-lg font-semibold mb-4">Дані пацієнта</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <InputField key="lastName" name="lastName" label="Прізвище*" />

                <InputField key="firstName" name="firstName" label="Ім'я*" />

                <InputField
                  key="middleName"
                  optional
                  optionalValue={values && values.hasMiddleName}
                  onOptionalChange={(checked) => {
                    form.change('hasMiddleName', checked);

                    if (checked) {
                      form.resetFieldState('middleName');
                    }
                  }}
                  name="middleName"
                  label="По батькові*"
                  additionalText={
                    !values.hasMiddleName
                      ? 'Немає по батькові згідно документів'
                      : undefined
                  }
                />

                <InputField
                  key="taxId"
                  optional
                  optionalValue={values && values.hasTaxId}
                  onOptionalChange={(checked) => {
                    form.change('hasTaxId', checked);

                    if (checked) {
                      form.resetFieldState('taxId');
                    }
                  }}
                  name="taxId"
                  label="РНОКПП (IПН)*"
                  mask="9999999999"
                  additionalText={
                    !values.hasTaxId
                      ? 'Немає IПН за віком чи має відмітку у паспорті'
                      : undefined
                  }
                />

                <InputField
                  key="dob"
                  name="dob"
                  label="Дата народження*"
                  type="date"
                />

                <SelectField
                  key="gender"
                  name="gender"
                  label="Стать*"
                  options={[
                    { label: 'Чоловіча', value: 'male' },
                    { label: 'Жіноча', value: 'female' },
                  ]}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <InputField
                  key="birthCountry"
                  name="birthCountry"
                  label="Країна народження*"
                />

                <InputField
                  key="birthPlace"
                  name="birthPlace"
                  label="Місце народження*"
                />

                <SelectField
                  key="contactMethod"
                  name="contactMethod"
                  label="Бажаний спосіб зв'язку із пацієнтом"
                  options={[
                    { label: 'Електронно поштою', value: 'email' },
                    { label: 'Телефоном', value: 'phone' },
                  ]}
                />

                <InputField
                  key="secretWord"
                  name="secretWord"
                  label="Секретне слово (не менше 6 символів)*"
                />

                <InputField
                  key="phone"
                  name="phone"
                  label="Контактний номер телефону"
                  mask="+38 (999) 999-99-99"
                  placeholder="+38 (999) 999-99-99"
                />

                <InputField
                  key="email"
                  name="email"
                  label="Адреса електронної пошти"
                  placeholder="example@example.com"
                />
              </div>
            </section>

            <section className="bg-white p-6 rounded-md shadow mt-6">
              <h2 className="text-lg font-semibold mb-4">
                Документ, що посвідчує особу
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <SelectField
                  key="docType"
                  name="docType"
                  label="Тип документу*"
                  options={[
                    {
                      label:
                        'Посвідчення особи, яка потребує додаткового захисту',
                      value: 'protection_certificate',
                    },
                    { label: 'Паспорт (ID-карта)', value: 'id-card' },
                    { label: 'Паспорт (книжечка)', value: 'passport_booklet' },
                    {
                      label: 'Посвідка на постійне проживання в Україні',
                      value: 'permanent_residence_permit',
                    },
                    { label: 'Посвідка біженця', value: 'refugee_certificate' },
                    {
                      label: 'Посвідка на проживання',
                      value: 'residence_permit',
                    },
                    {
                      label: 'Тимчасове посвідчення громадянина України',
                      value: 'temporary_ukrainian_certificate',
                    },
                  ]}
                />

                <InputField
                  key="docNumber"
                  name="docNumber"
                  label="Серія (за наявності), номер*"
                  placeholder="AB123456"
                />

                <InputField
                  key="docIssueDate"
                  name="docIssueDate"
                  label="Коли видано*"
                  type="date"
                />

                <InputField
                  key="docExpiryDate"
                  name="docExpiryDate"
                  label="Діє до"
                  type="date"
                />

                <InputField
                  key="docIssuer"
                  name="docIssuer"
                  label="Ким видано*"
                  placeholder="Орган, що видав документ"
                />

                <InputField
                  key="unrzNumber"
                  name="unrzNumber"
                  label="Запис № (УНЗР)"
                  placeholder="РРРРММДД-ХХХХХ"
                  mask="99999999-aaaaa"
                />
              </div>
            </section>

            <div className="flex justify-center mt-6">
              <Button type="submit" className="w-1/2" disabled={submitting}>
                Зберегти
              </Button>
            </div>
          </form>
        )}
      />

      {submittedData && (
        <div className="mt-6 p-4 bg-white rounded-md shadow">
          <h2 className="text-lg font-semibold mb-2">
            Дані форми у форматі JSON:
          </h2>
          <pre className="text-sm bg-gray-100 p-2 rounded overflow-x-auto">
            {JSON.stringify(submittedData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default PatientForm;

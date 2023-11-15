import React from 'react';

import isEmail from 'validator/es/lib/isEmail';

export const useFormWithValidation = () => {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  function handleChange(evt) {
    // инпут в кот вводят значение
    const input = evt.target;
    // введенное значение инпута
    const value = input.value;
    // имя инпута
    const name = input.name;

    if (name === 'email') {
      if (!isEmail(value)) {
        input.setCustomValidity('Некорректый адрес почты');
      } else {
        input.setCustomValidity('');
      }
    }
    

    // /^[а-яА-ЯЁёa-zA-Z -

    if (name === 'name') {
      if (!/^[\wа-яА-ЯЁёa-zA-Z\s-]+$/.test(value)) {
        input.setCustomValidity('Укажите корректное имя');
      } else {
        input.setCustomValidity('');
      }
    }

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: input.validationMessage });
    setIsValid(input.closest('form').checkValidity());
  }

  // const resetForm = React.useCallback(
  //   (newValues = {}, newErrors = {}, newIsValid = false) => {
  //     setValues(newValues);
  //     setErrors(newErrors);
  //     setIsValid(newIsValid);
  //   },
  //   [setValues, setErrors, setIsValid]
  // );

  return { values, setValues, handleChange, errors, isValid, setIsValid };
}

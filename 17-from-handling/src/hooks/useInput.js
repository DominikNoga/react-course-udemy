import { useState } from "react";

const useInput = (validationFn = (value) => true, defaultValue = '') => {
  const [enteredValue, setEnteredValue] = useState({
    value: defaultValue,
    edited: false
  });

  const isValid = validationFn(enteredValue.value);
  console.log(isValid);

  function handleInputBlur() {
    setEnteredValue((prevValues) => ({
      ...prevValues,
      edited: true
    }));
  }

  function handleInputChange(value) {
    setEnteredValue({
      edited: false,
      value
    });
  }

  return {
    enteredValue,
    handleInputBlur,
    handleInputChange,
    hasErrors: enteredValue.edited && !isValid
  };
};

export default useInput;

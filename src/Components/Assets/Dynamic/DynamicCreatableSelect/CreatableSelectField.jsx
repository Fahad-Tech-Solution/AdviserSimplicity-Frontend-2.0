// import React, { useState } from "react";
// import CreatableSelect from "react-select/creatable";

// const createOption = (label) => ({
//   label,
//   value: label.toLowerCase().replace(/\W/g, ""),
// });

// const CreatableSelectField = ({
//   field,
//   form,
//   defaultOptions = [],
//   customStyles = {},
//   placeholder = "Select or create...",
//   isClearable = true,
//   disabled = false,
//   minHeight = "42px",
//   height = "42px",
// }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [options, setOptions] = useState(defaultOptions);
//   const [value, setValue] = useState(null);

//   const handleCreate = (inputValue) => {
//     setIsLoading(true);
//     setTimeout(() => {
//       const newOption = createOption(inputValue);
//       setIsLoading(false);
//       setOptions((prev) => [...prev, newOption]);
//       setValue(newOption);
//       form.setFieldValue(field.name, newOption.value);
//     }, 1000);
//   };

//   const defaultCustomStyles = {
//     control: (provided, state) => ({
//       ...provided,
//       border: state.isFocused ? "2px solid #36b446" : "1px solid #36b446",
//       boxShadow: state.isFocused ? "0 0 0 0px #4CAF50" : "none",
//       "&:hover": {
//         border: state.isFocused ? "2px solid #36b446" : "1px solid #36b446",
//       },
//       minHeight: minHeight,
//       height: height,
//     }),
//     valueContainer: (provided) => ({
//       ...provided,
//       height: value && value.length > 0 ? "auto" : "44px",
//       padding: "0 8px",
//     }),
//     input: (provided) => ({
//       ...provided,
//       margin: "0",
//       padding: "0",
//     }),
//     indicatorsContainer: (provided) => ({
//       ...provided,
//       height: height,
//     }),
//     menu: (provided) => ({
//       ...provided,
//       zIndex: 9999,
//     }),
//     menuPortal: (provided) => ({
//       ...provided,
//       zIndex: 9999,
//     }),
//   };

//   const mergedStyles = { ...defaultCustomStyles, ...customStyles };

//   return (
//     <CreatableSelect
//       isClearable={isClearable}
//       isDisabled={disabled || isLoading}
//       isLoading={isLoading}
//       onChange={(newValue) => {
//         setValue(newValue);
//         form.setFieldValue(field.name, newValue ? newValue.value : null);
//       }}
//       onCreateOption={handleCreate}
//       options={options}
//       value={options.find((option) => option.value === field.value) || null}
//       styles={mergedStyles}
//       placeholder={placeholder}
//       menuPortalTarget={document.body}
//     />
//   );
// };

// export default CreatableSelectField;



import React, { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";

const createOption = (label) => ({
  label,
  value: label.toLowerCase().replace(/\W/g, ""),
});

const CreatableSelectField = ({
  field,
  form,
  defaultOptions = [],
  customStyles = {},
  placeholder = "Select or create...",
  isClearable = true,
  disabled = false,
  minHeight = "42px",
  height = "42px",
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState(defaultOptions);
  const [value, setValue] = useState(
    defaultOptions.find((option) => option.value === field.value) || null
  );

  const handleCreate = (inputValue) => {
    setIsLoading(true);
    setTimeout(() => {
      const newOption = createOption(inputValue);
      setIsLoading(false);
      setOptions((prev) => [...prev, newOption]);
      setValue(newOption);
      form.setFieldValue(field.name, newOption.value);
    }, 1000);
  };

  // Similar to useEffect in CreatableReactSelect to handle field.value changes
  useEffect(() => {
    if (field.value && !options.find((option) => option.value === field.value)) {
      const newOption = { label: field.value, value: field.value };
      setOptions((prev) => [...prev, newOption]);
      setValue(newOption);
    } else {
      setValue(options.find((option) => option.value === field.value));
    }
  }, [field.value, options]);

  const defaultCustomStyles = {
    control: (provided, state) => ({
      ...provided,
      border: state.isFocused ? "2px solid #36b446" : "1px solid #36b446",
      boxShadow: state.isFocused ? "0 0 0 0px #4CAF50" : "none",
      "&:hover": {
        border: state.isFocused ? "2px solid #36b446" : "1px solid #36b446",
      },
      minHeight: minHeight,
      height: height,
    }),
    valueContainer: (provided) => ({
      ...provided,
      height: value && value.length > 0 ? "auto" : "44px",
      padding: "0 8px",
    }),
    input: (provided) => ({
      ...provided,
      margin: "0",
      padding: "0",
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: height,
    }),
    menu: (provided) => ({
      ...provided,
      maxHeight: "15rem",
      overflowY: "auto",
      zIndex: 9999,
    }),
    menuList: (provided) => ({
      ...provided,
      maxHeight: "15rem",
      overflowY: "auto",
    }),
    menuPortal: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
  };

  const mergedStyles = { ...defaultCustomStyles, ...customStyles };

  return (
    <CreatableSelect
      isClearable={isClearable}
      isDisabled={disabled || isLoading}
      isLoading={isLoading}
      onChange={(newValue) => {
        setValue(newValue);
        form.setFieldValue(field.name, newValue ? newValue.value : null);
      }}
      onCreateOption={handleCreate}
      options={options}
      value={value}
      styles={mergedStyles}
      placeholder={placeholder}
      menuPortalTarget={document.body}
    />
  );
};

export default CreatableSelectField;

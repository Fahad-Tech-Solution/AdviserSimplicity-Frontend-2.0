import React from 'react';
import Select from 'react-select/creatable';

const CreatableMultiSelectField = ({ options, field, form }) => {
  const handleChange = (selectedOptions) => {
    form.setFieldValue(
      field.name,
      selectedOptions ? selectedOptions.map(option => option.value) : []
    );
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: state.isFocused ? '1px solid #36b446' : '1px solid #36b446',
      boxShadow: state.isFocused ? '0 0 0 0px #36b446' : 'none',
      '&:hover': {
        border: state.isFocused ? '1px solid #4CAF50' : '1px solid #36b446'
      },
      minHeight: '42px', // Set the minimum height
      height: field.value && field.value.length > 0 ? 'auto' : '42px', // Set the height
    }),
    valueContainer: (provided) => ({
      ...provided,
      height: field.value && field.value.length > 0 ? 'auto' : '42px', // Ensure value container matches the control height
      // padding: '0 8px' // Adjust padding as needed
    }),
    input: (provided) => ({
      ...provided,
      margin: '0', // Ensure input has no margin
      padding: '0' // Ensure input has no padding
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: '44px' // Ensure indicators container matches the control height
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999, // Ensure the menu is on top of other elements
    }),
    menuPortal: (provided) => ({
      ...provided,
      zIndex: 9999 // Ensure the menu portal is on top of other elements
    })
  };

  return (
    <Select
      isMulti
      name={field.name}
      className=''
      value={
        options
          ? options.filter(option =>
            Array.isArray(field.value)
              ? field.value.includes(option.value)
              : false
          )
          : []
      }
      onChange={handleChange}
      options={options}
      styles={customStyles}
      menuPortalTarget={document.body}
    />
  );
};

export default CreatableMultiSelectField;
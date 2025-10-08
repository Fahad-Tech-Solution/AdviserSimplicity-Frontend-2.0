import React from 'react';
import Select from 'react-select/creatable';

const CreatableMultiSelectField = ({ options, field, form }) => {
  const handleChange = (selectedOptions) => {
    form.setFieldValue(
      field.name,
      selectedOptions ? selectedOptions.map(option => option.value) : []
    );
  };

  return (
    <Select
      isMulti
      name={field.name}
      className='inputDesign'
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
    />
  );
};

export default CreatableMultiSelectField;

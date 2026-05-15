import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';

const CreatableReactSelect = ({ optionsGiven, field, form }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState(optionsGiven);
    const [value, setValue] = useState(null);

    const createOption = (label) => ({
        label,
        value: label.toLowerCase().replace(/\W/g, ''),
    });

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

    useEffect(() => {
        if (field.value && !options.find(option => option.value === field.value)) {
            const newOption = { label: field.value, value: field.value };
            setOptions((prev) => [...prev, newOption]);
            setValue(newOption);
        } else {
            setValue(options.find(option => option.value === field.value));
        }
    }, [field.value, options]);

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            border: state.isFocused ? '2px solid #36b446' : '1px solid #36b446',
            boxShadow: state.isFocused ? '0 0 0 0px #4CAF50' : 'none',
            '&:hover': {
                border: state.isFocused ? '2px solid #36b446' : '1px solid #36b446'
            },
            minHeight: '38px',
            height: '38px',
            minWidth: '150px',
        }),
        valueContainer: (provided) => ({
            ...provided,
            height: field.value && field.value.length > 0 ? 'auto' : '40px',
            padding: '0 8px'
        }),
        input: (provided) => ({
            ...provided,
            margin: '0',
            padding: '0'
        }),
        indicatorsContainer: (provided) => ({
            ...provided,
            height: '38px'
        }),
        menu: (provided) => ({
            ...provided,
            maxHeight: '15rem',
            overflowY: 'auto',
            zIndex: 9999
        }),
        menuList: (provided) => ({
            ...provided,
            maxHeight: '15rem',
            overflowY: 'auto'
        }),
        menuPortal: (provided) => ({
            ...provided,
            zIndex: 9999
        })
    }

    return (
        <CreatableSelect
            isClearable
            isDisabled={isLoading}
            isLoading={isLoading}
            onChange={(newValue) => {
                setValue(newValue);
                form.setFieldValue(field.name, newValue ? newValue.value : null);
                console.log(newValue ? newValue.value : null);
            }}
            onCreateOption={handleCreate}
            options={options}
            value={value}
            styles={customStyles}
            menuPortalTarget={document.body}
        />
    );
}

export default CreatableReactSelect;

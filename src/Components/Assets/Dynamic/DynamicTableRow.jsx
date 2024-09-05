import DynamicFormField from "./DynamicFormField";

const DynamicTableRow = ({
    rowConfig,  // Array defining what fields to show and their types
    values,
    setFieldValue,
    handleChange,
    handleBlur,
    handleInnerModal,
  }) => {
    return (
      <tr>
        {rowConfig.map((field, index) => (
          <td key={index}>
            <DynamicFormField
              fieldType={field.type}
              name={field.name}
              placeholder={field.placeholder}
              options={field.options}
              values={values}
              setFieldValue={setFieldValue}
              handleChange={handleChange}
              handleBlur={handleBlur}
              handleInnerModal={handleInnerModal}
            />
          </td>
        ))}
      </tr>
    );
  };
  
  export default DynamicTableRow;
  
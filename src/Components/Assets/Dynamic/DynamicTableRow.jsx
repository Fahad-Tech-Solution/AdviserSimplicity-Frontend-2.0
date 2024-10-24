import { RenderName } from "../Api/Api";
import DynamicFormField from "./DynamicFormField";

const DynamicTableRow = ({
  rowConfig, // Array defining what fields to show and their types
  values,
  setFieldValue,
  handleChange,
  handleBlur,
  handleInnerModal,
  stakeHolder,
}) => {
  return (
    <tr>

      {stakeHolder == "client." ? (
        <td>
          <th>{RenderName("client")} </th>
        </td>
      ) : stakeHolder == "partner." ? (
        <td>
          <th>{RenderName("partner")} </th>
        </td>
      ) : stakeHolder == "joint." ? (
        <td>
          <th>{RenderName("client")}
            {(localStorage.getItem('UserStatus') === "Married" && (" + " + RenderName("partner")))}</th>
        </td>
      ) : (
        ""
      )}




      {rowConfig.map((field, index) => {

        if (field.type === "plainText") {
          return (<td
            key={index}
            style={
              field?.styleSet ? field.styleSet : {}
            }>
            {RenderName(field.text)}
          </td>)
        }
        else if (field.type === "plainText2.0") {
          return (<td
            key={index}
            style={
              field?.styleSet ? field.styleSet : {}
            }>
            {field.value}
          </td>)
        }
        else {
          return (
            <td key={index}
              style={
                field?.styleSet ? field.styleSet : {}
              }
            >
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
                stakeHolder={stakeHolder}
                innerModalTitle={field.innerModalTitle}
                all={field}
              />
            </td>
          )
        }

      })}

    </tr>
  );
};

export default DynamicTableRow;

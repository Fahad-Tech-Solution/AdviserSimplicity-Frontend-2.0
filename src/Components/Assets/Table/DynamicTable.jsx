import React from 'react';
import { Table } from 'react-bootstrap';
import Custom_DropDown from '../CustomDropDown/CustomDropDown';

// Function to get nested property value
function getValueByPath(obj, path) {
  return path.split('.').reduce((o, key) => (o ? o[key] : undefined), obj);
}

const DynamicTable = (props) => {
  let TableHead = props.TableHead || [];
  let TableData = props.TData || [];

  return (
    <div>
      <Table striped bordered responsive hover>
        <thead>
          <tr>
            <th>#</th>
            {TableHead.map((elem, index) => (
              <th key={index}>{elem.Thead}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TableData.map((elem, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              {TableHead.map((name, index) => (
                <td key={index}>
                  {(() => {
                    if (name.key === "Fixed") {
                      return props.Fixed;
                    } else if (name.type) {
                      if (name.type === "bool") {
                        return elem[name.key] ? name.trueCase : name.falseCase;
                      }
                    } else if (name.key === "Opt") {
                      return (
                        <Custom_DropDown
                          View={props.View}
                          Operations={props.Formik ? props.Operations : () => { }}
                          FormikFun={props.Formik ? props.FormikFun : () => { }}
                          Data={elem}
                        />
                      );
                    } if (name.key === "client.clientGivenName") {

                      if (elem.client.clientMaritalStatus === "Single" ||
                        elem.client.clientMaritalStatus === "Widowed") {
                        return getValueByPath(elem, name.key);
                      }
                      else {

                        let partner = getValueByPath(elem, "partner.partnerGivenName");

                        return getValueByPath(elem, name.key) + (partner ? " & " + partner : "");
                        // return getValueByPath(elem, name.key) + " & " + partner;
                      }

                    }
                    else {
                      return getValueByPath(elem, name.key);
                    }
                  })()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DynamicTable;

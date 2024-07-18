import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap';
import Custom_DropDown from '../CustomDropDown/CustomDropDown';

const DynamicTable = (props) => {
  let TableHead = props.TableHead || [];
  let TableData = props.TData || [];
  return (
    <div>
      <Table striped bordered responsive hover>
        <thead>
          <tr>
            <th>#</th>
            {TableHead.map((elem, index) => {
              return (
                <th key={index}>
                  {elem.Thead}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {TableData.map((elem, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                {TableHead.map((name, index) => {
                  return (
                    <td>
                      {(() => {
                        if (name.key === "Fixed") {
                          return props.Fixed;
                        }
                        else if (name.type) {

                          if (name.type === "bool") {
                            return elem[name.key] ? name.trueCase : name.falseCase;
                          }

                        } else if (name.key === "Opt") {
                          return (
                            <Custom_DropDown
                              View={props.View}
                              Operations={props.Formik ? props.Operations : () => { }}
                              FormikFun={props.Formik ? props.FormikFun : () => { }}
                              Data={elem} />
                          );
                        } else {
                          return elem[name.key];
                        }
                      })()}

                    </td>
                  )
                })}
              </tr>
            )
          })}

        </tbody>
      </Table>
    </div>
  )
}

export default DynamicTable

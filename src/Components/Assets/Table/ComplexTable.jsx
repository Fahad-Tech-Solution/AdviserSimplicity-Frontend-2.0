import React from 'react'
import { Table } from 'react-bootstrap';

const ComplexTable = (props) => {
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
                                <th>
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
                                        <td key={index}>
                                            {name.key === "Opt" ? name.Comp : name.key === "Gender" ? elem[`${name.key}`] ? "female" : "Male" : elem[`${name.key}`]}
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

export default ComplexTable

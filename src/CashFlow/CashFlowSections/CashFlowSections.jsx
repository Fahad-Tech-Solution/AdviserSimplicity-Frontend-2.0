import React from 'react'
import PersonalDetails_cashFlow from '../Income&ExpenseComponents/PersonalDetails_CashFlow/PersonalDetails_cashFlow'

const CashFlowSections = (props) => {
    if (props.Data.subTitle === "Personal Details") {
        return (<PersonalDetails_cashFlow />)
    }
    else {

        return (
            <div>
                {props.Data.subTitle}
            </div>
        )
    }
}

export default CashFlowSections

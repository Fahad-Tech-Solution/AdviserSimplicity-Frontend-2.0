import React, { useEffect } from 'react'
import PersonalDetails_cashFlow from '../Income&ExpenseComponents/PersonalDetails_CashFlow/PersonalDetails_cashFlow'
import CashFlowCardSet from './CashFlowCardSet'

const CashFlowSections = (props) => {


    if (props.Data.subTitle === "Personal Details") {
        return (<PersonalDetails_cashFlow />)
    }
    else {
        return (<CashFlowCardSet Data={props.Data} />)
    }
}

export default CashFlowSections

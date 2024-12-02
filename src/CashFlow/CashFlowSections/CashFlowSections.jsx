import React, { useEffect } from 'react'
import PersonalDetails_cashFlow from '../Income&ExpenseComponents/PersonalDetails_CashFlow/PersonalDetails_cashFlow'
import CashFlowCardSet from './CashFlowCardSet'
import { useLocation } from 'react-router-dom'
import { GetAxios } from '../../Components/Assets/Api/Api'
import { CashFlowData, CashFlowScenarioData, CashFlowScenarioType, CFQObject, defaultUrl, PersonalDetailsData, QuestionDetail } from '../../Store/Store'
import { useRecoilState, useRecoilValue } from 'recoil'

const CashFlowSections = (props) => {


    let location = useLocation();
    let DefaultUrl = useRecoilValue(defaultUrl)

    let [questionDetail, setQuestionDetail] = useRecoilState(QuestionDetail);
    let [PersonalDetailObj, setPersonalDetailObj] = useRecoilState(PersonalDetailsData);
    let [cashFlowScenarioData, setCashFlowScenarioData] = useRecoilState(CashFlowScenarioData);
    let [cashFlowScenarioType, setCashFlowScenarioType] = useRecoilState(CashFlowScenarioType);
    let [cashFlowData, setCashFlowData] = useRecoilState(CashFlowData);
    let [CFObject, setCFObject] = useRecoilState(CFQObject);

    useEffect(() => {
        let ScenarioObj = JSON.parse(localStorage.getItem("ScenarioObj"));
        setCashFlowScenarioType(ScenarioObj.selectedSource);
        FetchData(ScenarioObj);
    }, [])


    async function FetchData(ScenarioObj) {
        if (ScenarioObj.selectedSource !== "discoveryForm") {

            try {
                let GetFromDiscoveryFormOfThatScenario = await GetAxios(`${DefaultUrl}/api/CF/dataOfAllSection/${ScenarioObj.selectedSource}`);
                if (GetFromDiscoveryFormOfThatScenario) {
                    console.log(GetFromDiscoveryFormOfThatScenario, "CashFlow ma us Scenario ka data Fetch kea hai ya");
                    setCashFlowScenarioData(GetFromDiscoveryFormOfThatScenario);
                }

            } catch (error) {
                console.log(error, "Personal Detail ka Data Fetch nahi huwa")
            }
        }
        else {
            try {
                let GetFromDiscoveryFormOfPersonalDetails = await GetAxios(`${DefaultUrl}/api/personalDetails/getUserById/${ScenarioObj.clientFK}`);
                if (GetFromDiscoveryFormOfPersonalDetails) {
                    // console.log(GetFromDiscoveryFormOfPersonalDetails, "CashFlow ma Discovery Form ka PersonalDetail Fetch kea hai ya");
                    setPersonalDetailObj(GetFromDiscoveryFormOfPersonalDetails);

                    fetchDataAllInOne(GetFromDiscoveryFormOfPersonalDetails._id);
                }


            } catch (error) {
                console.log(error, "Personal Detail ka Data Fetch nahi huwa")
            }
        }


        try {
            const res = await GetAxios(`${DefaultUrl}/api/CF/dataOfAllSection/${ScenarioObj._id}`);
            if (res) {
                // console.log(JSON.stringify(res.cf_personalDetails), ":res cashFlow Data")
                setCashFlowData(res);
            }
        } catch (error) {
            console.error("Error fetching questions:", error);
        }



        FetchCFQObject();

    }

    const fetchDataAllInOne = async (id) => {
        try {
            const res = await GetAxios(`${DefaultUrl}/api/dataOfAllSection/${id}`);
            // console.log(JSON.stringify(res), ":res of get all inner Question Data")
            if (res) {
                setQuestionDetail(res);
            }
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    };


    const FetchCFQObject = async () => {
        try {
            const res = await GetAxios(`${DefaultUrl}/api/CF/cf_basicQuestions/${(JSON.parse(localStorage.getItem("ScenarioObj")))._id}`);
            console.log(JSON.stringify(res), ":res of cf_basicQuestions Data")
            if (res) {
                setCFObject(res);
            }
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    };



    if (props.Data.subTitle === "Personal Details") {
        return (<PersonalDetails_cashFlow />)
    }
    else {
        return (<CashFlowCardSet Data={props.Data} />)
    }



}

export default CashFlowSections

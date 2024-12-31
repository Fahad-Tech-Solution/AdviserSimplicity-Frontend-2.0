import React, { useEffect } from 'react'
import PersonalDetails_cashFlow from '../Income&ExpenseComponents/PersonalDetails_CashFlow/PersonalDetails_cashFlow'
import CashFlowCardSet from './CashFlowCardSet'
import { useLocation } from 'react-router-dom'
import { GetAxios } from '../../Components/Assets/Api/Api'
import { CashFlowData, CashFlowScenarioData, CashFlowScenarioType, CFQObject, defaultUrl, GoalsDetail, GQState, Loading, PersonalDetailsData, QuestionDetail } from '../../Store/Store'
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

    let [GQObject, setGQObject] = useRecoilState(GQState);
    let [goalsDetail, setGoalsDetail] = useRecoilState(GoalsDetail);

    let [loadingState, setLoadingState] = useRecoilState(Loading);

    // Runs on component mount
    useEffect(() => {
        const scenarioObj = JSON.parse(localStorage.getItem("ScenarioObj"));
        if (scenarioObj) {
            setCashFlowScenarioType(scenarioObj.selectedSource);
            fetchData(scenarioObj);
        }
    }, []);

    // Fetch all required data based on Scenario
    const fetchData = async (scenarioObj) => {
        try {
            setLoadingState(true);

            if (scenarioObj?.selectedSource !== "discoveryForm") {
                await fetchScenarioData(scenarioObj.selectedSource);
            } else {
                await fetchPersonalDetails(scenarioObj.clientFK);
                await GetGoals(scenarioObj.clientFK);
                await GetGoalsQuestion(scenarioObj.clientFK);
            }

            await fetchCashFlowData(scenarioObj._id);
            await fetchCFQObject();

            setLoadingState(false);
        } catch (error) {
            console.error("Error in fetchData:", error);
            setLoadingState(false);
        }
    };

    // Fetch data based on scenario source
    const fetchScenarioData = async (source) => {
        try {
            const response = await GetAxios(`${DefaultUrl}/api/CF/dataOfAllSection/${source}`);
            if (response) {
                console.log("Fetched scenario data:", response);
                setCashFlowScenarioData(response);
            }
        } catch (error) {
            console.error("Error fetching scenario data:", error);
        }
    };

    // Fetch personal details
    const fetchPersonalDetails = async (clientId) => {
        try {
            const response = await GetAxios(`${DefaultUrl}/api/personalDetails/getUserById/${clientId}`);
            if (response) {
                console.log("Fetched personal details:", response);
                setPersonalDetailObj(response);

                // Fetch additional data related to personal details
                await fetchDataAllInOne(response._id);
            }
        } catch (error) {
            console.error("Error fetching personal details:", error);
        }
    };

    // Fetch all related data for a given ID
    const fetchDataAllInOne = async (id) => {
        try {
            const response = await GetAxios(`${DefaultUrl}/api/dataOfAllSection/${id}`);
            if (response) {
                console.log("Fetched all related data:", response);
                setQuestionDetail(response);
            }
        } catch (error) {
            console.error("Error fetching all related data:", error);
        }
    };

    // Fetch cash flow data
    const fetchCashFlowData = async (scenarioId) => {
        try {
            const response = await GetAxios(`${DefaultUrl}/api/CF/dataOfAllSection/${scenarioId}`);
            if (response) {
                console.log("Fetched cash flow data:", response);
                setCashFlowData(response);
            }
        } catch (error) {
            console.error("Error fetching cash flow data:", error);
        }
    };

    // Fetch CF Object
    const fetchCFQObject = async () => {
        try {
            const scenarioId = JSON.parse(localStorage.getItem("ScenarioObj"))?._id;
            const response = await GetAxios(`${DefaultUrl}/api/CF/cf_basicQuestions/${scenarioId}`);
            if (response) {
                console.log("Fetched CF Object:", response);
                setCFObject(response);
            }
        } catch (error) {
            console.error("Error fetching CF Object:", error);
        }
    };

    let GetGoals = async (clientId) => {
        try {
            const res = await GetAxios(`${DefaultUrl}/api/CombinedGoalsAndObjectives/${clientId}`);
            // console.log(JSON.stringify(res))
            if (res) {
                setGoalsDetail(res);
            }
        } catch (error) {
            console.error("Error fetching Goals:", error);
        }
    };

    let GetGoalsQuestion = async (clientId) => {
        try {
            const res = await GetAxios(`${DefaultUrl}/api/goalsQuestions/getByClient/${clientId}`);
            // console.log(JSON.stringify(res))
            if (res) {
                setGQObject(res);
            }
        } catch (error) {
            console.error("Error fetching Goals:", error);
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

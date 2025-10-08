import React, { useEffect } from 'react'
import { GetAxios } from '../Api/Api'
import { useRecoilState } from 'recoil';
import { Loading, PersonalDetailsData, allAPIs, defaultUrl } from '../../../Store/Store';

const PersonalDetailsGetApi = (props) => {

    let [defaultURL] = useRecoilState(defaultUrl); // eslint-disable-line no-unused-vars
    let [key] = useRecoilState(allAPIs); // eslint-disable-line no-unused-vars
    let [PersonalData, setPersonalData] = useRecoilState(PersonalDetailsData); // eslint-disable-line no-unused-vars
    let [load, setLoad] = useRecoilState(Loading); // eslint-disable-line no-unused-vars

    useEffect(() => {
        if (PersonalData.Child.length>0 && PersonalData.Client._id && PersonalData.Partner._id) {
            setLoad(false)
        }
        else {
            FetchData()
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    async function FetchData() {
        let Copy = JSON.parse(JSON.stringify(PersonalData));
        
        // let Data = GetAxios(`${API}/${localStorage.getItem("UserID")}`);
        let Data = await GetAxios(`${defaultURL}/${key.Client}/`);
        if (Data) {
            console.log("PersonalDetails Client = ", Data);
            Copy.Client = Data[0];
            // setPersonalData(Copy);
            // props.setLoad(false);
        }

        Data = await GetAxios(`${defaultURL}/${key.Child}/${localStorage.getItem("UserID")}`);
        if (Data) {
            console.log("PersonalDetails Childe = ", Data);
            Copy.Child = Data;
            setLoad(false)
        }
        
        setPersonalData(Copy);
    }

    return (
        <div>
        </div>
    )
}

export default PersonalDetailsGetApi

import React, { useEffect, useState } from 'react'
import DynamicTable from '../Table/DynamicTable'
import axios from 'axios';
import { AllUsers, defaultUrl } from '../../../Store/Store';
import { useRecoilState, useRecoilValue } from 'recoil';

const NewAllClients = (props) => {


    let DefaultUrl = useRecoilValue(defaultUrl)

    let TableHead = [
        { Thead: "Title", key: "client.clientTitle" },
        { Thead: "Given Name", key: "client.clientGivenName" },
        { Thead: "Maridal Status", key: "client.clientMaritalStatus" },
        { Thead: "Mobile No", key: "client.clientWorkPhone" },
        { Thead: "Email", key: "client.Email" },
        { Thead: "Operations", key: "Opt" },
    ];

    const [PerosnalDetail2, setPerosnalDetail] = useRecoilState(AllUsers);
    const PerosnalDetail = useRecoilValue(AllUsers);

    useEffect(() => {
        axios
            .get(`${DefaultUrl}/api/personalDetails`)
            .then((res) => {
                console.log(JSON.stringify(res.data[0]));
                setPerosnalDetail(res.data);
            });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps



    return (
        <div className='All_Client'>
            <DynamicTable TableHead={TableHead} TData={PerosnalDetail} View={true} />
        </div>
    )
}

export default NewAllClients

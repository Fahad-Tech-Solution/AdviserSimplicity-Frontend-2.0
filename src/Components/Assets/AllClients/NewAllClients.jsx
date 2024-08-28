import React, { useEffect, useState } from 'react'
import DynamicTable from '../Table/DynamicTable'
import axios from 'axios';
import { defaultUrl } from '../../../Store/Store';
import { useRecoilValue } from 'recoil';

const NewAllClients = (props) => {


    let DefaultUrl = useRecoilValue(defaultUrl)

    let TableHead = [
        { Thead: "Title", key: "clientTitle" },
        { Thead: "Given Name", key: "clientGivenName" },
        { Thead: "Mobile No", key: "clientWorkPhone" },
        { Thead: "Email", key: "Email" },
        { Thead: "Operations", key: "Opt" },
    ];
    
    const [Clients, setClients] = useState([]);

    useEffect(() => {
        axios
            .get(`${DefaultUrl}/api/Client`)
            .then((res) => {
                console.log(res.data);
                setClients(res.data);
            });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps



    return (
        <div className='All_Client'>
            <DynamicTable TableHead={TableHead} TData={Clients} View={true} />
        </div>
    )
}

export default NewAllClients

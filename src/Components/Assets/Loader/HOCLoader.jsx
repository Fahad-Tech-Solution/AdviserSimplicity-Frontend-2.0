import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { Loading } from '../../../Store/Store'
import { Card } from 'react-bootstrap';


const HOCLoader = (props) => {
    let [Load, setLoad] = useRecoilState(Loading);

    return (
        <div>

            <div className={`container-fluid mt-4 ${!Load && "d-none"}`}>
                <div className="row m-0 p-0 ">
                    <div className="col-12">

                        <Card className='d-flex justify-content-center align-content-center p-3' style={{ height: "60vh" }}>
                            <div className='d-flex justify-content-center align-content-center'>
                                <span className="loader"></span>
                            </div>
                            <h4 className="text-center PoppinsFamily green_Text mt-2">Loading...</h4>
                        </Card>

                    </div>
                </div>
            </div>
            <div className={`${Load && "d-none"}`}>
                {props.children}
            </div>
        </div>
    )


}

export default HOCLoader

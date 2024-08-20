import React from 'react';
import { Image } from 'react-bootstrap';


import ClientPic from "../Svgs/single-2.svg"
import PartnerPic from "../Svgs/couple-2.svg"

const RiskQuestion1 = (props) => {
    const { setFieldValue, values } = props.Obj;
    const { question, key, imgUrl } = props.QuestionProps;
    const { choices = [] } = props.QuestionProps;

    const handleRadioChange = (type, index) => {
        // Determine if the current question is a simple value or an object
        const isSimpleValue = typeof values[key] === 'number';

        // Update the state accordingly
        if (isSimpleValue) {
            setFieldValue(key, {
                [type]: index,
            });
        } else {
            setFieldValue(key, {
                ...values[key], // Retain existing client/partner values
                [type]: index,  // Update the specific client/partner value
            });
        }
    };

    return (
        <div  >

            <div className='d-flex justify-content-start align-items-center gap-4'>
                <div style={{ width: "7%" }}>
                    <Image src={imgUrl} alt={key} fluid />
                </div>
                <div className='' style={{ width: "90%" }}>
                    <h5 className="my-3">
                        <b>{question || 'No Question Added'}</b>
                    </h5>
                </div>
            </div>

            <div className="my-3 Risk-fade-in-fwd">
                <h5 className="my-3 d-none">
                    <b>{question || 'No Question Added'}</b>
                </h5>
                <div className='RiskCard'>
                    <h4 className="mainHeading d-flex justify-content-start align-items-center  gap-2 ">

                        <b>Client</b>

                        <div style={{ width: "2%", marginTop: "-10px" }} >
                            <Image src={ClientPic} alt='Client' fluid />
                        </div>
                    </h4>
                    {choices.map((elem, index) => (
                        <React.Fragment key={`client-${index}`}>
                            <label htmlFor={`client-${index}`} className="myLabel my-1">
                                <input
                                    className="mx-2"
                                    type="radio"
                                    id={`client-${index}`}
                                    name={`${key}.client`}
                                    value={index}
                                    checked={values[key]?.client === index}
                                    onChange={() => handleRadioChange('client', index)}
                                />
                                {elem}
                            </label>
                            <br />
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {values.joinedProfile === "No" &&
                <div className='RiskCard'>
                    <h4 className="mainHeading d-flex justify-content-start align-items-center  gap-2 ">
                        <b>Partner</b>
                        <div style={{ width: "2%" }}>
                            <Image src={PartnerPic} alt='partner' fluid />
                        </div>
                    </h4>
                    {choices.map((elem, index) => (
                        <React.Fragment key={`partner-${index}`}>
                            <label htmlFor={`partner-${index}`} className="myLabel my-1">
                                <input
                                    className="mx-2"
                                    type="radio"
                                    id={`partner-${index}`}
                                    name={`${key}.partner`}
                                    value={index}
                                    checked={values[key]?.partner === index}
                                    onChange={() => handleRadioChange('partner', index)}
                                />
                                {elem}
                            </label>
                            <br />
                        </React.Fragment>
                    ))}
                </div>
            }


        </div>
    );
};

export default RiskQuestion1;

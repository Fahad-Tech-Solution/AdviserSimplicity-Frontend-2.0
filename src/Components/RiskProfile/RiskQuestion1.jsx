import React from 'react';
import { Image } from 'react-bootstrap';

import parse from 'html-react-parser';

import ClientPic from "../Svgs/single-2.svg"
import PartnerPic from "../Svgs/couple-2.svg"
import DynamicYesNo from '../Questions/FinancialInvestments/QuestionsDetail/DynamicYesNo';

const RiskQuestion1 = (props) => {
    const { setFieldValue, values, handleChange, } = props.Obj;
    const { question, key, imgUrl } = props.QuestionProps;
    const { choices = [] } = props.QuestionProps;

    const handleRadioChange = (type, index) => {
        // alert(type + "--" + key)
        // Determine if the current question is a simple value or an object
        const isSimpleValue = typeof values[`${type}.${key}`] === 'number';

        // Update the state accordingly
        if (isSimpleValue) {
            setFieldValue(`${type}.${key}`, index);
        } else {
            setFieldValue(`${type}.${key}`, index,);
        }
    };

    if (key === "LandingPage") {
        return (<React.Fragment>
            <h3 className="text-center text-green " onClick={() => { console.log(JSON.stringify(values)) }}>
                <b>RISK PROFILE QUESTIONNAIRE</b>
            </h3>

            <div className='d-flex justify-content-center'>
                <Image src={imgUrl} fluid />
            </div>

            <h5 className='text-center'>RISK PROFILER: YOUR ATTITUDE TO INVESTING</h5>
            <p className='text-center'>The Risk Profiler is a tool that can assist you in determining your tolerance to risk and how that relates to particular investments.
                Your risk profile is not the only information you should take into account before making an investment decision.
                These tools do not take into account your individual investment objectives, financial situation or particular needs.
            </p>
            <p className='text-center'>
                Because of this, before making any investment decision you should consider whether the funds matched to your risk profile are appropriate in light of your individual investment objectives, financial circumstances and needs.
                This may include your need to access funds, any pre-existing financial commitments you may have and what other financial assets that you own.
            </p>
            <p className='text-center'>
                This Risk Profiler questionnaire poses a series of questions and assigns a weighting (score) against your responses. Your overall score will reflect your approximate Risk profile based on certain industry standards
            </p>

            {/* question  */}
            <div className="mb-3">
                <label className="form-label w-100 text-center">Would you like to answer this questionnaire individually or as a couple?</label>
                {/* switch button style */}
                <div className='d-flex justify-content-center mt-3'>
                    <div className="w-25">
                        <DynamicYesNo name={`joinedProfile`} values={values} handleChange={handleChange} />
                    </div>
                </div>
            </div>
        </React.Fragment>);
    }
    else {

        return (
            <div>

                <div className='d-flex justify-content-start align-items-center gap-4'>
                    <div style={{ width: "7%" }}>
                        <Image src={imgUrl} alt={key} fluid />
                    </div>
                    <div className='' style={{ width: "90%" }}>
                        <h5 className="my-3">
                            <b>{parse(question) || 'No Question Added'}</b>
                        </h5>
                    </div>
                </div>

                <div className="my-3 Risk-fade-in-fwd">
                    <h5 className="my-3 d-none">
                        <b>{question || 'No Question Added'}</b>
                    </h5>
                    <div className='RiskCard'>
                        <h4 className="mainHeading d-flex justify-content-start align-items-center  gap-2 ">

                            <div style={{ width: "2%", marginTop: "-10px" }} >
                                <Image src={ClientPic} alt='Client' fluid />
                            </div>

                            <b>Client</b>
                        </h4>
                        {choices.map((elem, index) => (
                            <React.Fragment key={`client-${index}`}>
                                <label htmlFor={`client-${index}`} className="myLabel my-1">
                                    <input
                                        className="mx-2"
                                        type="radio"
                                        id={`client-${index}`}
                                        name={`client.${key}`}
                                        value={index}
                                        checked={values?.client?.[key] === index}
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
                            <div style={{ width: "2%" }}>
                                <Image src={PartnerPic} alt='partner' fluid />
                            </div>
                            <b>Partner</b>
                        </h4>
                        {choices.map((elem, index) => (
                            <React.Fragment key={`partner-${index}`}>
                                <label htmlFor={`partner-${index}`} className="myLabel my-1">
                                    <input
                                        className="mx-2"
                                        type="radio"
                                        id={`partner-${index}`}
                                        name={`partner.${key}`}
                                        value={index}
                                        checked={values?.partner?.[key] === index}
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

    }
};

export default RiskQuestion1;

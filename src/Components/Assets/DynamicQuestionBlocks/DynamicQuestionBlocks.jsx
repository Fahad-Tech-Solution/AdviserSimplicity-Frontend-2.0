import React from 'react'
import { Image } from 'react-bootstrap';

const DynamicQuestionBlocks = (props) => {
    let { QuestionArray,
        QuestionClick,
        values,
        setFieldValue } = props
    return (
        <>
            {QuestionArray.map((elem, index) => {
                return (
                    <div className="col-md-4 px-2 pb-3 d-flex ">
                        <div className=" flex-grow-1 d-flex">
                            <div
                                className={`${values[elem.key] == "Yes" ? "customBorder p-3" : "border p-3"
                                    }  flex-grow-1`}
                                onClick={() =>
                                    QuestionClick(index, elem, values, setFieldValue)
                                }
                            >
                                <div className="text-center">
                                    <div className="mx-auto" style={{ width: "20%" }}>
                                        <Image src={elem.img} fluid />
                                    </div>
                                </div>
                                <p htmlFor={elem.key} className="form-label-Questions">
                                    {elem.title}
                                </p>
                            </div>

                        </div>
                    </div>
                );
            })}
        </>
    )
}

export default DynamicQuestionBlocks

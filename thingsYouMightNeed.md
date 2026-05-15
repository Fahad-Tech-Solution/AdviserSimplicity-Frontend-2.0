#Code of Cards Form Component
`
if (cardSwitch) {
const getInitialValues = () => {
let initialValues = {};

                                initialValues[`client${elem.key}`] = questionDetail && questionDetail[elem.key]?.clientTotal
                                    ? questionDetail[elem.key].clientTotal
                                    : "";

                                initialValues[`partner${elem.key}`] = questionDetail && questionDetail[elem.key]?.partnerTotal
                                    ? questionDetail[elem.key].partnerTotal
                                    : "";

                                initialValues[`api`] = elem.api;
                                initialValues[`key`] = elem.key;

                                return initialValues;
                            };

                            return (
                                <div className={`col-md-3 mb-4`} key={index}>
                                    <Card className="py-4 shadow borderOverAll" style={{ borderRadius: "20px", height: "100%" }}>
                                        <h5 className='text-center' onClick={() => { console.log(questionDetail) }}>{elem.title}</h5>
                                        <div className="QuestionIcon w-25">
                                            <img className="img-fluid" src={elem.img} alt="" />
                                        </div>
                                        <Formik
                                            initialValues={getInitialValues()}
                                            onSubmit={handleSubmit}
                                            enableReinitialize
                                        >
                                            {({ values }) => {
                                                return (<Form>
                                                    <div
                                                        className="row justify-content-center align-items-center my-2"
                                                    >
                                                        <div className='col-12 p-0 '>
                                                            <label
                                                                className=" d-block text-center"
                                                                htmlFor={"client" + elem.key}
                                                            >{localStorage.getItem("UserName") || "You"}</label>
                                                        </div>
                                                    </div>
                                                    <Field
                                                        type="text"
                                                        className="form-control inputDesign "
                                                        id={"client" + elem.key}
                                                        placeholder={"Client " + elem.title}
                                                        name={"client" + elem.key}
                                                    />
                                                    <div
                                                        className={`row justify-content-center align-items-center my-2 ${PartnerClass}`}
                                                    >
                                                        <div className='col-12 p-0 '>
                                                            <label
                                                                className=" d-block text-center"
                                                                htmlFor={"partner" + elem.key}
                                                            >{localStorage.getItem("PartnerName") || "Partner"}</label>
                                                        </div>
                                                    </div>
                                                    <Field
                                                        type="text"
                                                        className={`form-control inputDesign ${PartnerClass}`}
                                                        id={"partner" + elem.key}
                                                        placeholder={"Partner " + elem.title}
                                                        name={"partner" + elem.key}
                                                    />
                                                    <button type='submit' className='btn bgColor modalBtn w-100 mt-4'>
                                                        {questionDetail && questionDetail[elem.key]?.clientTotal
                                                            ? "Update"
                                                            : "Save"}
                                                    </button>
                                                </Form>)
                                            }}

                                        </Formik>
                                    </Card>
                                </div>
                            );
                        }
                        else

`

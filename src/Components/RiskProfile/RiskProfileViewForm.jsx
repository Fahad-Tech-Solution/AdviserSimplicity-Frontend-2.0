import { ConfigProvider, Descriptions, Divider } from "antd";
import { Form, Formik } from "formik";
import React from "react";
import { ConvertDate, toCommaAndDollar } from "../Assets/Api/Api";
import parse from "html-react-parser";

const RiskProfileViewForm = (props) => {
  const Data = props?.modalObject?.row || {};

  const sharedItemStyle = {
    style: { textAlign: "left" },
    labelStyle: { width: "60%" }, // fixed width for label column
    contentStyle: { width: "40%" }, // fixed width for value column
  };

  let QuestionArray = [
    {
      route: "/Q1",
      key: "question1",
      question:
        "<div className='d-inline-block text-green'>Question 1: Accessibility of your Funds - Desired Liquidity.</div> Based on your stated goals, how long do you envisage these funds can be invested before you require access to them?",
      choices: [
        "Less than one year",
        "1 – 3 years",
        "3 – 5 years",
        "More than 5 years",
      ],
    },
    {
      route: "/Q2",
      key: "question2",
      question:
        "<div className='d-inline-block text-green'>Question 2: Your desired rate of return.</div> What annual rate of return do you expect your investments to achieve in order to satisfy your previously stated goals?",
      choices: ["Less than 5%", "5% - 10%", "More than 10%"],
    },
    {
      route: "/Q3",
      key: "question3",
      question:
        "<div className='d-inline-block text-green'>Question 3: Your attitude to Capital Risk.</div> Which response best describes your attitude toward investing?",
      choices: [
        "The safety of my capital is of primary importance to me. I am happier to achieve a lower rate of return rather than risk any significant loss of my capital.",
        "I would like the value of my capital to remain relatively stable but it is important that my investments meet my income requirements.",
        "I am comfortable with the value of my investment going up and down in value over time to try and achieve higher returns over the long term.",
        "I'm comfortable and prepared to take on high risk for the chance of getting higher returns on my money over the long term.",
      ],
    },
    {
      route: "/Q4",
      key: "question4",
      question:
        "<div className='d-inline-block text-green'>Question 4: Your concerns about inflation.</div>  How concerned are you with your savings being eroded due to inflation and the rising costs of necessities such as groceries, utilities, and healthcare.",
      choices: [
        "Not concerned",
        "Slightly concerned",
        "Moderately concerned",
        "Very concerned",
        "Highly concerned",
      ],
    },
    {
      route: "/Q5",
      key: "question5",
      question:
        "<div className='d-inline-block text-green'>Question 5: Your concerns about Legislative Risk.</div> Investors often arrange their finances in order to qualify for government benefits and / or tax advantages. However, potential changes in the law risk leaving them worse off after those rearrangements have been made. Would you still rearrange your investments to qualify for these benefits, despite the risks of being worse off?",
      choices: [
        "No, I wouldn't do it if there's a risk, I'd be worse off.",
        "I would only do it if there is a slight risk I would be worse off.",
        "If there are potential changes in the law, I am willing to adjust my finances to protect my financial situation.",
        "If it improves my situation now, I'm willing to rearrange my investments and finances, regardless of future changes in the law.",
      ],
    },
    {
      route: "/Q6",
      key: "question6",
      question:
        "<div className='d-inline-block text-green'>Question 6: Your investment knowledge & experience.</div> How familiar are you with Investment Markets?",
      choices: [
        "I don’t understand anything about investment markets.",
        "I have a basic understanding of investment markets. I know they go up and down but I'm not sure about the reasons behind these fluctuations.",
        "I understand that markets like the Australian ASX 200 and US S&P 500 and others can go up and down, each with different income, growth, and tax characteristics. I understand the importance of diversification to help me reduce risk and avoid putting all my eggs in the one basket.",
        "I am experienced with all investment sectors and understand the various factors that can impact investment performance. In the past, I have invested in some or all of the following assets: shares, ETFs, and managed funds.",
      ],
    },
    {
      route: "/Q7",
      key: "question7",
      question:
        "<div className='d-inline-block text-green'>Question 7: Your concern about volatility - The changes in how much money your investments make, and the chance of losing money.</div> If you invested $100,000 a year ago and you find out today it's worth $80,000 how would you feel?",
      choices: [
        "I would panic and sell my investment and then put the remaining amount in cash.",
        "I would feel nervous, and I might consider moving some or all of my money to a safer option.",
        "I would be confident in my investment strategy and keep my money where it is and stick to my long-term plan.",
        "I would see this as an opportunity and if I had more money, invest into more growth assets such as Australian and international shares. ",
      ],
    },
    {
      route: "/Q8",
      key: "question8",
      question:
        "<div className='d-inline-block text-green'>Question 8: Your investment preferences – Asset allocation.</div> What level of investment risk are you comfortable with?",
      choices: [
        "No risk and I don’t want my capital to go down at all even if I get a 0% return on my money.",
        "I prefer low risk and am comfortable allocating a small portion (up to 40%) of my money to the share market aiming for better returns than the cash rate.",
        "I am comfortable with a medium level of risk and have my money allocated with similar amounts between the share market and cash and fixed interest/term deposits.",
        "I would prefer to have my money invested in a well diversified portfolio which includes more than 600% to Australian and international shares and property with the balance to cash and fixed interest/term deposits.",
        "I would prefer to have a minimum of  80% of my money invested in   Australian and international shares, possibly up to 100% if needed, aiming for higher returns even if there are significant ups and downs and wild swings like recent market events such as  COVID (2020), or the Global Financial Crises (2008)  because I won't need the money for a long time (10 years minimum).",
      ],
    },
    {
      route: "/cards",
      key: "cardSet",
      question: "",
      choices: [
        "No risk and I don’t want my capital to go down at all even if I get a 0% return on my money.",
      ],
    },
  ];

  const clientItems = [
    {
      label: parse(QuestionArray[0].question),
      children: `${QuestionArray[0].choices[Data.client?.question1] || "--"}`,
      ...sharedItemStyle,
    },
    {
      label: parse(QuestionArray[1].question),
      children: `${QuestionArray[1].choices[Data.client?.question1] || "--"}`,
      ...sharedItemStyle,
    },
    {
      label: parse(QuestionArray[2].question),
      children: `${QuestionArray[2].choices[Data.client?.question1] || "--"}`,
      ...sharedItemStyle,
    },
    {
      label: parse(QuestionArray[3].question),
      children: `${QuestionArray[3].choices[Data.client?.question1] || "--"}`,
      ...sharedItemStyle,
    },
    {
      label: parse(QuestionArray[4].question),
      children: `${QuestionArray[4].choices[Data.client?.question1] || "--"}`,
      ...sharedItemStyle,
    },
    {
      label: parse(QuestionArray[5].question),
      children: `${QuestionArray[5].choices[Data.client?.question1] || "--"}`,
      ...sharedItemStyle,
    },
    {
      label: parse(QuestionArray[6].question),
      children: `${QuestionArray[6].choices[Data.client?.question1] || "--"}`,
      ...sharedItemStyle,
    },
    {
      label: parse(QuestionArray[7].question),
      children: `${QuestionArray[7].choices[Data.client?.question1] || "--"}`,
      ...sharedItemStyle,
    },
  ];

  return (
    <Formik
      initialValues={props?.modalObject?.row?.areaOfAdvice || {}}
      onSubmit={() => {
        if (props.flagState) {
          props.setFlagState(false);
        }
      }}
      innerRef={props.formRef}
    >
      {() => (
        <Form className="w-100 reportSection">
          <div className="row">
            <Descriptions
              bordered
              column={1}
              size="small"
              items={clientItems}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default RiskProfileViewForm;

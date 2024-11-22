import { notification } from "antd";
import axios from "axios";

let GetAxios = async (Api) => {
    console.log("Get api Chali")
    try {
        const response = await axios.get(Api);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error:",
            error.message); // Log error message
        console.error("Response:", error.response); // Log response error details if available
        throw error; // Rethrow the error to be caught in the calling function
    }
}

const PostAxios = async (Api, data) => {
    console.log("Post Chala ");
    try {
        const response = await axios.post(Api, data);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error:", error.message); // Log error message
        console.error("Response:", error.response); // Log response error details if available
        throw error; // Rethrow the error to be caught in the calling function
    }
};

let PutAxios = async (Api, data) => {
    console.log("Put api Chali")
    try {
        const response = await axios.put(Api, data);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error:", error.message); // Log error message
        console.error("Response:", error.response); // Log response error details if available
        throw error; // Rethrow the error to be caught in the calling function
    }
}

let PatchAxios = async (Api, data) => {
    console.log("Patch api Chali")
    try {
        const response = await axios.patch(Api, data);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error:", error.message); // Log error message
        console.error("Response:", error.response); // Log response error details if available
        throw error; // Rethrow the error to be caught in the calling function
    }
}

let DeleteAxios = async (Api) => {
    console.log("Delete api Chali")
    try {
        const response = await axios.delete(Api);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error:", error.message); // Log error message
        console.error("Response:", error.response); // Log response error details if available
        throw error; // Rethrow the error to be caught in the calling function
    }
}


let DateHandler = async (value) => {
    // console.log("DateHandler Chal gaya", value);
    let a = await new Date(value);
    return a
}


const openNotificationSuccess = (type, placement, message, description) => {
    notification[type]({
        message: <span style={{ fontWeight: '600', padding: "1.5px 0px 0px 15px" }}>{message}</span>,
        description: description,
        placement,
        duration: 3,
        showProgress: true,
        style: {
            padding: '10px',
            lineHeight: '1.5',
            alignItems: 'center'
        },
    });
};

const toCommaAndDollar = (x) =>
    "$" +
    Math.ceil(x)
        .toFixed(0)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");


const toNumericValue = (formattedValue) => {
    if (formattedValue && typeof formattedValue === "string") {
        return formattedValue.replace(/[$,]/g, "");
    }
    return "0";
};


// let toPercentage = (x) => Math.ceil(x)
//     .toFixed(0)
//     .toString()
//     + "%";

let toPercentage = (x) => {
    if (typeof x !== 'number' || isNaN(x)) {
        throw new Error("Input must be a valid number");
    }
    return x.toFixed(2) + "%";
};


let RenderName = (Input) => {
    if (Input === "client") {
        return (localStorage.getItem("UserName"))
    }
    else if (Input === "partner") {
        return (localStorage.getItem("PartnerName"))
    }
    else if (Input === "joint") {
        let userStatus = localStorage.getItem('UserStatus');
        if (userStatus === "Married") {
            return (localStorage.getItem("UserName") + " + " + localStorage.getItem("PartnerName"))
        } else {
            return (localStorage.getItem("UserName"))
        }
    }
}



// inputHelpers.js

const handleInputChange = (e, setFieldValue, FormulaSetting, values, stakeHolder) => {
    let value = parseFloat(e.target.value.replace(/[^0-9.]+/g, "")); // Remove all non-numeric characters except '.'

    if (value > 100) {
        setFieldValue(e.target.name, "100%");

        // Call your custom formula logic
        FormulaSetting(values, setFieldValue, e.target, stakeHolder);
    } else {
        setFieldValue(e.target.name, e.target.value); // Update value without '%'
    }
};

const handleInputFocus = (e, setFieldValue) => {
    // Remove the percentage sign
    let value = e.target.value.replace(/[^0-9.]+/g, ""); // Remove all non-numeric characters except '.'
    setFieldValue(e.target.name, value); // Update value without '%'
};

const handleInputKeyDown = (e) => {
    const allowedKeys = [
        "Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab",
        "Home", "End", "Escape", "."
    ];

    // Allow default behavior for allowed keys
    if (allowedKeys.includes(e.key)) {
        return; // Let default behavior happen
    }

    // Trigger onBlur on pressing Enter (for example)
    if (e.key === "Enter") {
        e.target.blur(); // This will trigger the onBlur event
    }

    // Prevent non-numeric input
    if (!/^[0-9]$/.test(e.key)) {
        e.preventDefault();
    }
};

const handleInputBlur = (e, setFieldValue, toPercentage, FormulaSetting, values, stakeHolder) => {
    let value = e.target.value.replace(/[^0-9.]+/g, "");
    let numericValue = parseFloat(value);

    // Validate and convert to percentage if necessary
    if (!isNaN(numericValue)) {
        if (numericValue > 100) {
            numericValue = 100;
        }
        setFieldValue(e.target.name, toPercentage(numericValue));
    } else {
        setFieldValue(e.target.name, ""); // Clear if not valid
    }

    // Call your custom formula logic
    FormulaSetting(values, setFieldValue, e.target, stakeHolder);
};

const validateName = (value) => {
    const filteredValue = value.replace(/[^a-zA-Z\s]/g, ''); // Allow only letters and spaces
    return filteredValue
};

let ConvertDate = (date) => {
    let d = new Date(date);
    let day = d.getDate().toString().padStart(2, '0');
    let month = (d.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    let year = d.getFullYear();
    return `${day}/${month}/${year}`;
};


export {
    DeleteAxios,
    GetAxios,
    PostAxios,
    PutAxios,
    PatchAxios,
    DateHandler,
    openNotificationSuccess,
    toCommaAndDollar,
    toNumericValue,
    toPercentage,
    RenderName,
    handleInputChange,
    handleInputFocus,
    handleInputKeyDown,
    handleInputBlur,
    validateName,
    ConvertDate
};


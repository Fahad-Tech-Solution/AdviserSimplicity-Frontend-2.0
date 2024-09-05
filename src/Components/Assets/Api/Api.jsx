import { notification } from "antd";
import axios from "axios";
import { BiInfoCircle } from "react-icons/bi";

let GetAxios = async (Api) => {
    console.log("Get api Chali")
    try {
        const response = await axios.get(Api);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error:", error.message); // Log error message
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


let toPersentage = (x) => Math.ceil(x)
    .toFixed(0)
    .toString()
    + "%";

let RenderName = (Input) => {
    if (Input === "client") {
        return (localStorage.getItem("UserName"))
    }
    else if (Input === "partner") {
        return (localStorage.getItem("PartnerName"))
    }
    else if (Input === "joint") {
        return (localStorage.getItem("UserName") + " + " + localStorage.getItem("PartnerName"))
    }
}

export { DeleteAxios, GetAxios, PostAxios, PutAxios, PatchAxios, DateHandler, openNotificationSuccess, toCommaAndDollar, toNumericValue, toPersentage, RenderName };


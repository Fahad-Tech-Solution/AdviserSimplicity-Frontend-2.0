import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut, Line, Pie } from "react-chartjs-2";

// ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);


const generateColors = (data) => {
    const colors = ['#7df691', '#4ea05f', '#66cc78', '#2e9d40', '#26863a', '#1e7034']; // Initial colors
    const maxValue = Math.max(...data); // Find maximum value
    const darkestColor = '#1e7034'; // Darkest color
    const lightestColor = '#7df691'; // Lightest color

    // Calculate step size for changing color shades
    const stepSize = (lightestColor - darkestColor) / maxValue;

    // Generate shades of colors based on data values
    return data.map(value => {
        const index = Math.round((value / maxValue) * (colors.length - 1)); // Calculate index based on value
        // console.log("for value this " + value + "we have this color" + colors[index])
        return colors[index];
    });
};


const PaiChart = (props) => {

    ChartJS.defaults.font.family = 'PoppinsFamily'; // Apply font family globally


    const data = {
        // labels: ['Investment 1', 'Investment 2', 'Investment 3', 'Investment 4', 'Investment 5', 'Investment 6'],
        // datasets: [
        //     {
        //         label: 'Amount',
        //         data: [30, 20, 20, 15, 15, 10],
        //         backgroundColor: [
        //             '#1e7034',
        //             '#26863a',
        //             '#2e9d40',
        //             '#7df691',
        //             '#66cc78',
        //             '#4ea05f',
        //         ],
        //         borderColor: [
        //         '#1e7034',
        //         '#26863a',
        //         '#2e9d40',
        //         '#7df691',
        //         '#66cc78',
        //         '#4ea05f',
        //         ],
        //         borderWidth: 1,
        //     },
        // ],
        datasets: [
            {
                label: 'Amount',
                data: props.data || [],
                backgroundColor: generateColors(props.data || []),
                borderColor: "white",
                borderWidth: 3,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true, // Make sure this is set to true
                text: props.chartTitle,
                fontStyle: 'bold', // Optional: Set font style (if desired)
            },
        },
        animation: {
            animateRotate: true, // Enable rotation animation
            duration: 500, // 500 milliseconds animation duration
            easing: 'easeInOutQuad', // Use easeInOutQuad animation
            // Use a circular start angle of 270 degrees for clockwise animation
            rotation: 270,
        },

    };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const options2 = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            // title: {
            //   display: true, // Make sure this is set to true
            //   text: props.chartTitle,
            //   fontStyle: 'bold', // Optional: Set font style (if desired)
            // },
        },
    };

    // Replace with your actual data (remove if using faker directly)
    const data2 = {
        labels,
        datasets: [
            {
                label: 'Users',
                data: [10, 20, 30, 25, 40, 30, 70], // Replace with your desired values
                borderColor: '#1e7034',
                backgroundColor: '#1e7034',

            }
        ],
    };

    return (
        <div className='w-100 d-flex justify-content-center flex-column align-items-center p-2'>
            <h5 className='PoppinsFamily navy_Text'>{props.chartTitle}</h5>
            {props.chartType == "Pie" && <Pie data={data} options={options} className='mb-1'/>}
            {props.chartType == "Line" && <Line data={data2} options={options2}  />}

        </div>
    )
}

export default PaiChart

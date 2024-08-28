
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const generateColors = (data) => {
  const colors = ['#7df691', '#4ea05f', '#66cc78', '#2e9d40', '#26863a', '#1e7034'];
  const maxValue = Math.max(...data);

  return data.map(value => {
    // Calculate the ratio to scale the value to the range of the colors array
    const ratio = value / maxValue;
    // Determine the color index by scaling the ratio to the length of the colors array
    const index = Math.floor(ratio * (colors.length - 1));
    return colors[index];
  });
};


const ApexChart = (props) => {
  const RiskGoals = [
    { title: "Cash Management", value: "Cash Management" },
    { title: "Conservative", value: "Conservative" },
    { title: "Moderately Conservative", value: "Moderately Conservative" },
    { title: "Balanced", value: "Balanced" },
    { title: "Growth", value: "Growth" },
    { title: "High Growth", value: "High Growth" }
  ];

  const printTitleIfMatch = (valueToMatch) => {
    const match = RiskGoals.find(obj => obj.value === valueToMatch);
    return match ? match.title : "Default Title";
  };

  let includeSwitch = ["Cash Management", "Moderately Conservative"]

  const [GoalName, setGoalName] = useState("whichone");
  const [options, setOptions] = useState({
    chart: {
      type: 'donut',
      height: '100%',
      width: '100%',
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
        customScale: 1,
        donut: {
          size: '60%',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '1px',
              fontFamily: 'Arial, sans-serif',
              color: '#373d3f',
              offsetY: 4,

            },
            value: {
              show: false,
            },
            total: {
              show: true,
              label: GoalName,
              fontSize: "15px",
              fontFamily: 'Arial, sans-serif',
              color: '#373d3f',
              fontWeight: 'bold',
            }
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            height: 200,
            width: 200,
          },
          legend: {
            show: false,
          },
          plotOptions: {
            pie: {
              expandOnClick: false,
              donut: {
                size: '60%',
                labels: {
                  show: true,
                  name: {
                    show: true,
                    fontSize: '20px',
                    fontFamily: 'Arial, sans-serif',
                    color: '#373d3f',
                    offsetY: 4,
                  },
                  value: {
                    show: false,
                  },
                  total: {
                    show: true,
                    label: GoalName,
                    fontSize: '20px',
                    fontFamily: 'Arial, sans-serif',
                    color: '#373d3f',
                    fontWeight: 'bold',
                  }
                }
              }
            }
          },
        },
      },

    ],
    legend: {
      show: false,
    },
    grid: {
      padding: {
        top: -2,
        right: -2,
        bottom: -2,
        left: -2
      }
    },
    colors: generateColors(props.data || [44, 55, 13, 33]),
    tooltip: {
      enabled: false
    },
    labels: props.labels || ['Low', 'Moderately Low', 'Moderate', 'Moderately high', "High", "Very High"],  // Add labels to the options
  });


  let [data, setData] = useState();

  let CharacterDataSending = (value) => {
    switch (value) {
      case "Cash Management":
        return [60, 20, 20, 35, 35, 22,];
        break;
      case "Conservative":

        return [20, 60, 20, 35, 35, 22,];
        break;
      case "Moderately Conservative":

        return [20, 20, 60, 35, 35, 22,];
        break;
      case "Balanced":
        return [20, 20, 35, 60, 35, 22,];

        break;
      case "Growth":
        return [20, 20, 35, 35, 60, 22,];

        break;
      case "High Growth":
        return [20, 20, 35, 35, 22, 60,];

        break;
      default:

        return [22, 22, 22, 22, 22, 22,];
        break;
    }

  }

  useEffect(() => {
    // Calculate the new goal name based on the props.title
    const newGoalName = printTitleIfMatch(props.title);
    setGoalName(newGoalName);

    // Determine the font size guide based on whether newGoalName is in the includeSwitch array
    const guide = includeSwitch.includes(newGoalName) ? '8px' : '17px';

    // Retrieve the data based on props.title for generating colors
    const chartData = CharacterDataSending(props.title) || [44, 55, 13, 33];

    // Update chart options with the new goal name and dynamically generated colors
    setOptions((prevOptions) => ({
      ...prevOptions,
      plotOptions: {
        ...prevOptions.plotOptions,
        pie: {
          ...prevOptions.plotOptions.pie,
          donut: {
            ...prevOptions.plotOptions.pie.donut,
            labels: {
              ...prevOptions.plotOptions.pie.donut.labels,
              total: {
                ...prevOptions.plotOptions.pie.donut.labels.total,
                label: newGoalName,
                fontSize: guide,
              }
            }
          }
        }
      },
      // Update colors dynamically based on the chart data
      colors: generateColors(chartData),
    }));

    // Set data state with the new chart data
    setData(chartData);
  }, [props.title]);

  return (
    <div style={{ height: '100%', width: '100%', margin: 0, padding: 0, minHeight: "30vh" }}>
      <div className="chart-wrap" style={{ height: '100%', width: '100%', margin: 0, padding: 0, minHeight: "30vh" }}>
        <div id="chart" style={{ height: '100%', width: '100%', margin: 0, padding: 0, minHeight: "30vh" }}>
          <ReactApexChart options={options} series={data || [44, 55, 13, 33]} type="donut" height="100%" width="100%" />
        </div>
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ApexChart;

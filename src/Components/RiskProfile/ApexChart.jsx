
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const generateColors = (data) => {
  const colors = ['#7df691', '#4ea05f', '#66cc78', '#2e9d40', '#26863a', '#1e7034'];
  const maxValue = Math.max(...data);
  const darkestColor = '#1e7034';
  const lightestColor = '#7df691';

  return data.map(value => {
    const index = Math.round((value / maxValue) * (colors.length - 1));
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
              fontSize: '15px',
              fontFamily: 'Arial, sans-serif',
              color: '#373d3f',
              fontWeight: 'bold',
            }
          }
        }
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          height: '100%',
          width: '100%',
        },
        legend: {
          show: false,
        },
      },
    }],
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
  });

  useEffect(() => {
    const newGoalName = printTitleIfMatch(props.title);
    setGoalName(newGoalName);

    // Update options with the new GoalName
    setOptions(prevOptions => ({
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
                label: newGoalName
              }
            }
          }
        }
      }
    }));
  }, [props.title]);

  return (
    <div style={{ height: '100%', width: '100%', margin: 0, padding: 0, minHeight: "30vh" }}>
      <div className="chart-wrap" style={{ height: '100%', width: '100%', margin: 0, padding: 0, minHeight: "30vh" }}>
        <div id="chart" style={{ height: '100%', width: '100%', margin: 0, padding: 0, minHeight: "30vh" }}>
          <ReactApexChart options={options} series={props.data || [44, 55, 13, 33]} type="donut" height="100%" width="100%" />
        </div>
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ApexChart;

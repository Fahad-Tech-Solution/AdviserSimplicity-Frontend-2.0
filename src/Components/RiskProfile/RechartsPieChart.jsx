import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Sector, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import parse from 'html-react-parser';

// Custom active shape function to highlight the active pie sector
const renderActiveShape = (props) => {
  const {
    cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value,
  } = props;

  const RADIAN = Math.PI / 180;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  const nameParts = payload.name.split(' ');

  return (
    <g>
      {/*
    <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
       */}
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">
        {nameParts.map((part, index) => {
          let namePartSub = part.split("_");
          return (
            <tspan x={ex + (cos >= 0 ? 1 : -1) * 12} dy={index === 0 ? 0 : 18} key={index}>
              {namePartSub.map((subPart, i) => {
                return (subPart + " ")
              })}
            </tspan>
          )
        })}
      </text>
      {/*
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey + 20 + (nameParts.length === 1 ? 0 : (nameParts.length * 12))} textAnchor={textAnchor} fill="#999">
        {`Value: ${value}`}
        </text>
        */}
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey + 36} textAnchor={textAnchor} fill="#999">
        {`Value: ${value}%`}
      </text>
    </g>
  );
};

const RechartsPieChart = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [data, setData] = useState([]);

  // Mapping input data into the format Recharts expects
  const formatData = (rawData) => {
    const labels = props.labels || ['Australian Shares', 'International Shares', 'Property_and Infrastructure', 'Alternatives', "Australian Fixed_Interes", "International Fixed_Interes", "Cash/Term Deposits"];
    return rawData.map((value, index) => ({ name: labels[index], value }));
  };


  let CharacterDataSending = (value) => {
    switch (value) {
      case "Cash Management":
        return [0, 0, 0, 0, 0, 0, 100];
        break;
      case "Conservative":

        return [13, 13, 4, 0, 35, 15, 20];
        break;
      case "Moderately Conservative":

        return [22.5, 22.5, 5, 0, 25, 10, 15];
        break;
      case "Balanced":
        return [31.5, 31.5, 7, 0, 14, 7, 9];

        break;
      case "Growth":
        return [39, 39, 7, 0, 7.5, 4.5, 3];

        break;
      case "High Growth":
        return [45, 45, 8, 0, 0, 0, 2];

        break;
      default:

        return [39, 39, 7, 0, 7.5, 4.5, 3];
        break;
    }

  }


  useEffect(() => {
    const chartData = formatData(CharacterDataSending(props.title || [44, 55, 13, 33]));
    setData(chartData);
  }, [props.data]);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  // const colors = ['#7df691', '#4ea05f', '#66cc78', '#2e9d40', '#26863a', '#1e7034'];
  const colors = ['#26863a', '#1e7034', '#24873f', '#289c48', '#7df691', '#67f57e', '#4af766'];

  return (
    <div style={{ display: "flex", width: '100%', height: "20rem" }}> {/* Set explicit height */}
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={70}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={onPieEnter}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );

};

export default RechartsPieChart;

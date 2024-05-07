import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import { mockPieData  } from "../data/mockData";
import { useMemo } from "react";

const tooltipStyles = {
  display: 'flex',
  alignItems:'center',
  columnGap: 8,
  borderRadius: 4,
  paddingBlock: 0,
  paddingInline: 16,
  backgroundColor: 'white',
  color: 'black'
}

const dataLabels = {
  ALL: "Колл центр",
  ASSIGNED: "Telegram бот",
  CLOSED: "Чат боты",
  // SOLVED: "Решенные"
}

const dataColors = {
  ALL: "hsl(62, 100%, 56%)",
  ASSIGNED: "hsl(120, 70%, 50%)",
  CLOSED: "hsl(215, 100%, 38%)",
  // SOLVED: "hsl(189, 100%, 75%)"
}

const colorBlockStyles = (color) => ({width:16, height:16, backgroundColor: color})
const PieChart = ({ data, count }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // const chartData = useMemo(() => {
  //     const normalizedData = Object.keys(data).map(key => {
  //     let chartObj;
  //     if(key === 'ALL') {
  //       chartObj = {
  //         id: key,
  //         label: dataLabels[key],
  //         value: count,
  //         color: dataColors[key],
  //       }

  //       return chartObj
  //     }
  //     chartObj = {
  //       id: key,
  //       label: dataLabels[key],
  //       value: data[key],
  //       color: dataColors[key],
  //     }
  //     return chartObj 
  //   })
    
  //   // const totalSum = normalizedData.reduce((acc, item) => {
  //   //   return acc + item.value
  //   // }, 0);

  //   return {
  //     data: normalizedData,
  //     // total: totalSum
  //   }
  // }, [data, count])

  const callCenterStatus = {
    id: "Кол-центр",
    label: "Кол-центр",
    value: count,
    color: "hsl(215, 100%, 38%)",
  }

  return (
    <ResponsivePie
      data={[callCenterStatus]}
      colors={data => data.data.color}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
            
          },
        },
      }}
      tooltip={({datum: {data: {label,color,value}, }}) => {
        return <div style={tooltipStyles}>
          <div style={colorBlockStyles(color)}/>
          <p>{label}: {value}</p>
        </div>
      }}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={colors.grey[100]}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabel={(data) => {
        const percent = ((data.value / count) * 100).toFixed(0)
        return `${percent} %`
      }}
      arcLabelsRadiusOffset={0.4}
      arcLabelsSkipAngle={7}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};

export default PieChart;

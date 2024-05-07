import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { useMemo } from 'react';

// const mockLabelData = [
//   { label: 'Инциденты', value: 400, color: '#0088FE' },
//   { label: 'Консультации', value: 300, color: '#00C49F' },
//   { label: 'Благодарность', value: 300, color: '#FFBB28' },
//   { label: 'Жалобы', value: 200, color: '#FF8042' },
// ];

const dataColors = {
  Благодарность: '#00d492',
  Жалоба: '#FF5733',
  // 'Запрос на обслуживание': '#FFBB28',
  Инцидент: '#0080ff',
  Консультация: '#f4970a',
  // Предложение: '#c2c2c2'
}

const sizing = {
  margin: { right: 5 },
  width: 300,
  height: 400,
};

const  PieChartWithCustomizedLabel = ({data}) => {
  const chartData = useMemo(() => {
    const keys = Object.keys(data);
    keys.splice(5, 1);
    keys.splice(3, 1);
    const normalizedData = keys.map(key => {
      // console.log(key);
      const chartObj = {
        label: key,
        value: data[key],
        color: dataColors[key],
      }
      return chartObj
    })

    const totalSum = normalizedData.reduce((acc, item) => {
      return acc + item.value
    }, 0);
    // console.log(totalSum)

    return {
      data: normalizedData,
      total: totalSum
    }
  }, [data])
  
  const getArcLabel = (params) => {
    const percent = params.value / chartData.total;
    return `${(percent * 100).toFixed(0)}%`;
  };

  return (
    <PieChart
    
      series={[
        {
          outerRadius: 120,
          data: chartData.data,
          arcLabel: getArcLabel,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontSize: 14,
        },
      }}
      slotProps={{
        legend: {
          direction: "row",
          drawingArea: {
            width: 300,
            height: 100,
            left: -20,
            bottom: 620,
            right: 0,
            top: 0

          } 
        }
      }}
      {...sizing}
      
    />


  );
}
export default PieChartWithCustomizedLabel;
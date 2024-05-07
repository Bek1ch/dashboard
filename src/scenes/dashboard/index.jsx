import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import DoneIcon from '@mui/icons-material/Done';
import HandshakeIcon from '@mui/icons-material/Handshake';
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WorkIcon from '@mui/icons-material/Work';
import PieChart from "../../components/PieChart";
import PieChartWithCustomizedLabel from '../../components/Label';
import React, { useEffect, useMemo, useState } from 'react';
import {fetchRequestStatistics, fetchStatistics, fetchStatusStatistics} from "../../api";
import DatePicker from "react-widgets/DatePicker";


const Dashboard = () => {
  // State
  const [statisticsData, setStatisticsData] = useState(null);
  const [statusStatisticsData, setStatusStatisticsData] = useState(null);
  const [requestStatisticsData, setRequestStatisticsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const normalizedStatusData = useMemo(() => {
    if(!statusStatisticsData) return []
    return Object.keys(statusStatisticsData).map(key => {
      return statusStatisticsData[key] 
    })
  }, [statusStatisticsData])

  const totalStatusCount = useMemo(() => {
    if(!normalizedStatusData) return 0
    return normalizedStatusData.reduce((acc, item) => {
      return acc + item
    }, 0);
  }, [normalizedStatusData])

  // console.log(totalStatusCount)
  
  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        setIsLoading(true)
        const data = await Promise.allSettled([fetchStatistics(), fetchRequestStatistics(), fetchStatusStatistics()])
        setStatisticsData(data.at(0).value)
        setRequestStatisticsData(data.at(1).value)
        setStatusStatisticsData(data.at(2).value)
        // console.log(data.at(2).value)
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      } finally {
        setIsLoading(false)
      }
    };
  
    fetchDataFromApi(); // Вызываем функцию для получения данных из API
  }, []); 


  if(isLoading) return 'loading...'


  return (
    
    
    <Box m="20px" >
      {/* HEADER */}
      <Box display="flex" columnGap={2}>
        <DatePicker placeholder="01/01/2024" />  
        <DatePicker placeholder="01/01/2024" />  
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={3} >

 

     
        {/* <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Загрузка отчетов
          </Button>
        </Box> */}
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(5, 1fr)"
        gridAutoRows="110px"
        gap="20px"
      >
        {/* Start cards */}
        <Box
          backgroundColor="#81ADC1"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius={2}
        >
          <StatBox
            title={statusStatisticsData?.ALL}
            subtitle={<span style={{ color: 'black' }}>Всего обращении</span>}
            // progress="0.75"
            // increase="+14%"
            icon={
              <ArrowCircleUpIcon
                sx={{ color: "black", fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          backgroundColor="#FB6451"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius={2}
        >
          <StatBox
            // title={statusStatisticsData?.ALL}
            title={27}
            subtitle={<span style={{ color: 'black' }}>В Просроченные</span>}
            // progress="0.75"
            // increase="+14%"
            icon={
              <ArrowCircleUpIcon
                sx={{ color: "black", fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          backgroundColor="#F3A512"
          display="flex"
          alignItems="center"   
          justifyContent="center"
          borderRadius={2}
      
          >
          <StatBox
            title={statusStatisticsData?.ASSIGNED}
            subtitle={<span style={{ color: 'black' }}>В ожидании</span>}
            progress="0.50"
            // increase="+21%"
            icon={
              <AccessTimeIcon
                sx={{ color: "black", fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          backgroundColor="#00c300"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius={2}
        >
          <StatBox
            title={statusStatisticsData?.CLOSED}
            subtitle={<span style={{ color: 'black' }}>Закрытые</span>}
            progress="0.50"
            // increase="+21%"
            icon={
              <WorkIcon
                sx={{ color: "black", fontSize: "26px",  }}
              />
            }
          />
        </Box>
          <Box
            backgroundColor="#1474FF"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius={2}

          >
          <StatBox
            title={statusStatisticsData?.SOLVED}
            subtitle={<span style={{ color: 'black' }}>Закрыты с просрочкой</span>}
            // progress="0.30"
            // increase="+5%"
            icon={
              <DoneIcon
                sx={{ color: "black", fontSize: "26px" }}
              />
            }
          />
        </Box>
        {/* End cards */}
       
      </Box>
      <Box
        mt={4}
        display="grid"
        gridTemplateColumns="repeat(3, 1fr)"
        gap="20px"
      >

      <Box
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="20px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h6"
                fontWeight="700"
                color={colors.grey[100]}
              >
                  
                 Динамика за год
              </Typography>
              <Typography 
                variant="h4"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
              </Typography>
            </Box>
            <Box>
              <IconButton>
                {/* <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                /> */}
              </IconButton>
            </Box>
          </Box>
          <Box height="370px" m="-40px 0 0 0">
            <LineChart data={statisticsData}  isDashboard={true} />
          </Box>
        </Box>
        <Box
          backgroundColor={colors.primary[400]}
          >
          <Box
            mt="20px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h6"
                fontWeight="700"
                color={colors.grey[100]}
              >
                 Источник обращений
              </Typography>
              <Typography
                variant="h4"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
              </Typography>
            </Box>
            <Box>
              <IconButton>
              </IconButton>
            </Box>
          </Box>
          <Box height="370px" m="-40px" display="flex" justifyContent="center" alignItems="center">
            <PieChart  data={statusStatisticsData} count={totalStatusCount}  />    
          </Box>
        </Box>
        <Box
          backgroundColor={colors.primary[400]}
          >
          <Box
            mt="20px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h6"
                fontWeight="700"
                color={colors.grey[100]}
              >
                 Типы запросов
              </Typography>
              <Typography
                variant="h4"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
              </Typography>
            </Box>
            <Box>
              <IconButton>
              </IconButton>
            </Box>
          </Box>
          <Box height="370px" m="-60px" p="-10px" display="flex" justifyContent="center" alignItems="center">
          <PieChartWithCustomizedLabel data={requestStatisticsData} />
          </Box>
        </Box>
      </Box>
    </Box>
    
  );
};

export default Dashboard;

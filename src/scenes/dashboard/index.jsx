import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import LineChart from "../../components/LineChart";
import PieChart from "../../components/PieChart";
import PieChartWithCustomizedLabel from "../../components/Label";
import React, { useEffect, useState } from "react";
import { fetchRequestStatistics, fetchStatistics } from "../../api";

const Dashboard = () => {
  // State
  const [statisticsData, setStatisticsData] = useState(null);
  const [requestStatisticsData, setRequestStatisticsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        setIsLoading(true);
        const data = await Promise.allSettled([
          fetchStatistics(),
          fetchRequestStatistics(),
        ]);
        setStatisticsData(data.at(0).value);
        setRequestStatisticsData(data.at(1).value);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDataFromApi(); // Вызываем функцию для получения данных из API
  }, []);

  if (isLoading) return "loading...";
  return (
    <Box mt={4} display="grid" gridTemplateColumns="repeat(3, 1fr)" gap="20px">
      <Box backgroundColor={colors.primary[400]}>
        <Box
          mt="20px"
          p="0 30px"
          display="flex "
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography variant="h6" fontWeight="700" color={colors.grey[100]}>
              Динамика за год
            </Typography>
            <Typography
              variant="h4"
              fontWeight="bold"
              color={colors.greenAccent[500]}
            ></Typography>
          </Box>
          <Box>
            <IconButton>
              {/* <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                /> */}
            </IconButton>
          </Box>
        </Box>
        <Box maxHeight={380} height="100%">
          <LineChart data={statisticsData} />
        </Box>
      </Box>
      <Box backgroundColor={colors.primary[400]}>
        <Box
          mt="20px"
          p="0 30px"
          display="flex "
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography variant="h6" fontWeight="700" color={colors.grey[100]}>
              Источник обращений
            </Typography>
            <Typography
              variant="h4"
              fontWeight="bold"
              color={colors.greenAccent[500]}
            ></Typography>
          </Box>
          <Box>
            <IconButton></IconButton>
          </Box>
        </Box>
        <Box maxHeight={380} height="100%">
          <PieChart />
        </Box>
      </Box>
      <Box backgroundColor={colors.primary[400]}>
        <Box
          mt="20px"
          p="0 30px"
          display="flex "
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography variant="h6" fontWeight="700" color={colors.grey[100]}>
              Типы запросов
            </Typography>
            <Typography
              variant="h4"
              fontWeight="bold"
              color={colors.greenAccent[500]}
            ></Typography>
          </Box>
          <Box>
            <IconButton></IconButton>
          </Box>
        </Box>
        <Box maxHeight={380} height="100%">
          <PieChartWithCustomizedLabel data={requestStatisticsData} />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;

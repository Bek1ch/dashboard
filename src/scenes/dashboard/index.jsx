import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import LineChart from "../../components/LineChart";
import StatBox from "../../components/StatBox";
import PieChart from "../../components/PieChart";
import PieChartWithCustomizedLabel from "../../components/Label";
import React, { useEffect, useMemo, useState } from "react";
import {
  fetchRequestStatistics,
  fetchStatistics,
  fetchStatusStatistics,
} from "../../api";
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
    if (!statusStatisticsData) return [];
    return Object.keys(statusStatisticsData).map((key) => {
      return statusStatisticsData[key];
    });
  }, [statusStatisticsData]);

  const totalStatusCount = useMemo(() => {
    if (!normalizedStatusData) return 0;
    return normalizedStatusData.reduce((acc, item) => {
      return acc + item;
    }, 0);
  }, [normalizedStatusData]);

  // console.log(totalStatusCount)

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        setIsLoading(true);
        const data = await Promise.allSettled([
          fetchStatistics(),
          fetchRequestStatistics(),
          fetchStatusStatistics(),
        ]);
        setStatisticsData(data.at(0).value);
        setRequestStatisticsData(data.at(1).value);
        setStatusStatisticsData(data.at(2).value);
        // console.log(data.at(2).value)
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
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" alignItems="center" columnGap={4}>
        <Box display="flex" columnGap={2}>
          <DatePicker placeholder="01/01/2024" />
          <DatePicker placeholder="01/01/2024" />
        </Box>
        <Button
          sx={{
            backgroundColor: colors.grey[800],
            color: "black",
            paddingInline: 8,
            textTransform: "capitalize",
            fontWeight: 600,
            fontSize: 16,
          }}
          variant="contained"
        >
          Обновить
        </Button>
      </Box>
      {/* GRID & CHARTS */}
      <Box marginTop={4} display="flex" columnGap={8}>
        <Box>
          <Typography color="black" fontWeight={700} fontSize={72} variant="h1">
            {statusStatisticsData?.ALL}
          </Typography>
          <Typography
            color="black"
            whiteSpace="nowrap"
            fontWeight="600"
            variant="p"
          >
            Всего поступило заявок за выбранный период
          </Typography>
        </Box>
        <Box flex="1" alignSelf="end">
          <Box display="grid" gridTemplateColumns="repeat(5, 1fr)" gap="20px">
            {/* Start cards */}
            <StatBox bgColor="#f43434" title={27} subtitle={"Просроченные"} />
            <StatBox bgColor="#f67d0c" title={56} subtitle={"В ожидании"} />
            <StatBox
              bgColor="#3748ed"
              title={statusStatisticsData?.ASSIGNED}
              subtitle={"В Работе"}
            />
            <StatBox
              bgColor="#505156"
              title={30}
              subtitle={"Закр. с просрочкой"}
            />
            <StatBox
              bgColor="#1b9c38"
              title={statusStatisticsData?.CLOSED}
              subtitle={"Закрытые"}
            />
            {/* End cards */}
          </Box>
        </Box>
      </Box>
      <Box
        mt={4}
        display="grid"
        gridTemplateColumns="repeat(3, 1fr)"
        gap="20px"
      >
        <Box backgroundColor={colors.primary[400]}>
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
              ></Typography>
            </Box>
            <Box>
              <IconButton></IconButton>
            </Box>
          </Box>
          <Box maxHeight={380} height="100%">
            <PieChart data={statusStatisticsData} count={totalStatusCount} />
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
    </Box>
  );
};

export default Dashboard;

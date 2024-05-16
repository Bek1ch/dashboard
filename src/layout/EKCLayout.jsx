import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { fetchStatusStatistics } from "../api";
import { Box, Button, Typography, colors } from "@mui/material";
import DatePicker from "react-widgets/DatePicker";
import StatBox from "../components/StatBox";

const EKCLayout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [statusStatisticsData, setStatusStatisticsData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await fetchStatusStatistics();
        setStatusStatisticsData(res);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return "loading...";

  return (
    <Box px={2}>
      {/* HEADER */}
      <Box mt={2} display="flex" alignItems="center" columnGap={4}>
        <Box display="flex" columnGap={2}>
          <DatePicker placeholder="01/01/2024" />
          <DatePicker placeholder="01/01/2024" />
        </Box>
        <Button
          sx={{
            backgroundColor: colors.grey[200],
            color: "black",
            paddingInline: 8,
            textTransform: "capitalize",
            fontWeight: 600,
            fontSize: 16,
            "&:hover": {
              backgroundColor: "transparent",
            },
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
            {(statusStatisticsData?.ALL || 0).toLocaleString() ?? 0}
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
            <StatBox
              bgColor="#f43434"
              title={statusStatisticsData?.EXPIRED ?? 0}
              subtitle={"Просроченные"}
            />
            <StatBox
              bgColor="#f67d0c"
              title={statusStatisticsData?.WAITING ?? 0}
              subtitle={"В ожидании"}
            />
            <StatBox
              bgColor="#3748ed"
              title={statusStatisticsData?.ASSIGNED ?? 0}
              subtitle={"В Работе"}
            />
            <StatBox
              bgColor="#505156"
              title={statusStatisticsData?.CLOSED_EXPIRED ?? 0}
              subtitle={"Закр. с просрочкой"}
            />
            <StatBox
              bgColor="#1b9c38"
              title={(statusStatisticsData?.CLOSED || 0).toLocaleString() ?? 0}
              subtitle={"Закрытые"}
            />
            {/* End cards */}
          </Box>
        </Box>
      </Box>
      <Outlet
        context={{
          totalStatusCount: statusStatisticsData?.ALL,
        }}
      />
    </Box>
  );
};

export default EKCLayout;

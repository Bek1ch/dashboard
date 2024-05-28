import { useEffect, useState } from "react";
import { fetchDivisionsTableData } from "../../api";
import DivisionsTable from "../../components/DivisionsTable";
import { divisionsTableColumns } from "./table-config";
import { Box, Typography } from "@mui/material";
import { setDepartaments, useDepartaments } from "../../store/depsStore";
import { setDepMetaData, useApplications } from "../../store/applicationsStore";
// import { grey } from "@mui/material/colors";

const DivisionsPage = () => {
  const { departaments } = useDepartaments();
  const { depData } = useApplications();
  const [isLoading, setIsLoading] = useState(false);
  const [initTableData, setInitTableData] = useState(null);

  const handleResetTable = () => {
    setDepartaments(null);
    setDepMetaData(null);
  };

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        setIsLoading(true);
        const data = await fetchDivisionsTableData();
        setInitTableData(data);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDataFromApi(); // Вызываем функцию для получения данных из API
  }, []);

  if (isLoading) return "table data loading...";

  return (
    <Box mt={4}>
      {depData && departaments && (
        <Typography
          onClick={handleResetTable}
          sx={{
            cursor: " pointer ",
            marginBottom: "4px",
            marginLeft: "4px",
          }}
        >
          Назад
        </Typography>
      )}
      <DivisionsTable
        columns={divisionsTableColumns}
        data={departaments ? departaments : initTableData ?? []}
      />
    </Box>
  );
};

export default DivisionsPage;

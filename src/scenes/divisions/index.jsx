import { useEffect, useState } from "react";
import { fetchDivisionsTableData } from "../../api";
import DivisionsTable from "../../components/DivisionsTable";
import { divisionsTableColumns } from "./table-config";
import { Box } from "@mui/material";

const DivisionsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState(null);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        setIsLoading(true);
        const data = await fetchDivisionsTableData();
        setTableData(data);
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
      <DivisionsTable columns={divisionsTableColumns} data={tableData ?? []} />
    </Box>
  );
};

export default DivisionsPage;

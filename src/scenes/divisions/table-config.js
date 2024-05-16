import { Typography } from "@mui/material";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();

export const divisionsTableColumns = [
  columnHelper.accessor("expertStat.expert", {
    id: "expert",
    header: "Подразделение",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("expertStat.all", {
    id: "all",
    header: "Всего",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("expertStat.newTicket", {
    id: "overdue",
    header: "Просроченные",
    cell: (info) => <Typography color="#f43434">{info.getValue()}</Typography>,
  }),
  columnHelper.accessor("expertStat.waitingTicket", {
    id: "waiting",
    header: "В Ожидании",
    cell: (info) => <Typography color="#f67d0c">{info.getValue()}</Typography>,
  }),
  columnHelper.accessor("expertStat.assignedTicket", {
    id: "in-process",
    header: "В Работе",
    cell: (info) => <Typography color="#3748ed">{info.getValue()}</Typography>,
  }),
  columnHelper.accessor("expertStat.solvedTicket", {
    id: "сlosed-in-arrears",
    header: "Закр. с просрочкой",
    cell: (info) => <Typography color="#505156">{info.getValue()}</Typography>,
  }),
  columnHelper.accessor("expertStat.closedTicket", {
    id: "closed",
    header: "Закрытые",
    cell: (info) => <Typography color="#1b9c38">{info.getValue()}</Typography>,
  }),
];

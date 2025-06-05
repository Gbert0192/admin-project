import React, { useMemo } from "react";

interface Payment {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
}
import { ColumnDef } from "@tanstack/react-table";
import { DataTableDemo } from "@/components/data-table/data-table";

const UserTable = () => {
  // const columns = useMemo<ColumnDef<ColumnDef<Payment>>[]>(
  //   () => [
  //     {
  //       accessorKey: "status",
  //       header: "Status",
  //     },
  //     {
  //       accessorKey: "email",
  //       header: "Email",
  //     },
  //     {
  //       accessorKey: "amount",
  //       header: "Amount",
  //     },
  //   ],
  //   []
  // );

  // const data: Payment[] = [
  //   {
  //     id: "1",
  //     status: "success",
  //     email: "example@email.com",
  //     amount: 100,
  //   },
  // ];

  return (
    <>
      <DataTableDemo />
    </>
  );
};
export default UserTable;

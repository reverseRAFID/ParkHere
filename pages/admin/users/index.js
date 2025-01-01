import AdminWrapper from "@/components/AdminWrapper";
import React from "react";
import { DataTable } from "./data-table";
import columns from "./columns";

export default function Users() {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    fetch("/api/users/get-users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <AdminWrapper>
      <div>
        <div className="font-bold text-lg">Users ({users?.length || "-"})</div>
        <DataTable columns={columns} data={users} />
      </div>
    </AdminWrapper>
  );
}

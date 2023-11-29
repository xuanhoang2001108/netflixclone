import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import { useNavigate } from "react-router-dom";
import {
  useGetPermissionQuery,
  useGetPermissionSetQuery,
} from "../../../store/service/getUser.service";
import { Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useAddPolicyMutation } from "../../../store/service/register.service";
import CancelIcon from "@mui/icons-material/Cancel";
import { toast } from "react-toastify";

interface AddPolicyData {
  name: string;
  description?: string;
  permissionIdList: string[];
}

interface SelectedPermissionSetProps {
  name: string;
  onRemove: () => void;
}

function CreatePolicy() {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
  });
  const [permissionIdList, setPermissionIdList] = useState<string[]>([]);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<AddPolicyData>({
    resolver: yupResolver(validationSchema) as any,
  });
  const { refetch } = useGetPermissionSetQuery();
  const { data: permissionData } = useGetPermissionQuery();
  const rows = permissionData
    ? permissionData.data.map((permission: any) => ({
        id: permission.id,
        name: permission.name,
        sort: permission.sort,
      }))
    : [];

  const [addPolicyMutation] = useAddPolicyMutation();
  const [searchQuery, setSearchQuery] = useState("");
  const [permissionSetName, setPermissionSetName] = useState<string[]>([]);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  const filteredRows = rows.filter((row: any) => {
    const rowData = Object.values(row).join(" ").toLowerCase();
    return rowData.includes(searchQuery.toLowerCase());
  });

  const columns = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "sort", headerName: "Sort", width: 100 },
  ];

  const SelectedPermissionSet: React.FC<SelectedPermissionSetProps> = ({
    name,
    onRemove,
  }) => (
    <Box
      key={name}
      sx={{
        border: "solid 1px black",
        borderRadius: "40px",
        marginTop: "5px",
        padding: "2px",
        width: "fit-content",
        textAlign: "center",
        backgroundColor: "black",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div className="text-white">{name}</div>
      <CancelIcon onClick={onRemove} sx={{ color: "white", ml: 1 }} />
    </Box>
  );

  const createPolicy = async (data: AddPolicyData) => {
    data.permissionIdList = permissionIdList;
    try {
      await addPolicyMutation({
        name: data.name,
        permissionIdList: data.permissionIdList,
        description: data.description || "",
      });

      refetch();
      toast.success("Policy creation successful");
      navigate("/AdminLoginPage/AdminPage/PolicyPage");
    } catch (error) {
      toast.error("Policy creation failed");
    }
  };

  return (
    <>
      <form>
        {/* Your form inputs go here */}
        <Box>
          <TextField
            id="outlined-read-only-input"
            label="Name"
            {...register("name")}
            sx={{ input: { color: "black" }, mb: 2, width: 500 }}
          ></TextField>

          <Button
            variant="contained"
            sx={{ ml: 45 }}
            onClick={handleSubmit(createPolicy)}
          >
            <FileDownloadDoneIcon sx={{ mr: 2 }}></FileDownloadDoneIcon> CREATE
          </Button>

          <Button
            variant="contained"
            sx={{ ml: 2 }}
            onClick={() => navigate("/AdminLoginPage/AdminPage/PolicyPage")}
          >
            CANCEL
          </Button>
        </Box>

        <TextField
          id="outlined-read-only-input"
          label="Description"
          multiline
          rows={4}
          {...register("description")}
          sx={{
            input: { color: "black" },
            mb: 2,
            width: 500,
            "& textarea": {
              color: "black",
            },
          }}
        ></TextField>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5"> All Permissions</Typography>
          <TextField
            label="Search"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchInputChange}
            sx={{width: 400, mr: 47 }}
            InputProps={{
              style: { color: "black" },
            }}
          />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "row", mr: 10 }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            pageSizeOptions={[5, 10, 100]}
            checkboxSelection
            onRowSelectionModelChange={(selection) => {
              const selectedPermissionSets = selection
                .map((selectedIndex) =>
                  rows.find((row: any) => row.id === selectedIndex)
                )
                .filter(Boolean)
                .map((row) => row.name);
              const selectedPermissionSetIds = selection
                .map((selectedIndex) =>
                  rows.find((row: any) => row.id === selectedIndex)
                )
                .filter(Boolean)
                .map((row) => row.id);

              setPermissionSetName(selectedPermissionSets);
              setPermissionIdList(selectedPermissionSetIds);
            }}
            sx={{
              "& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell, & .MuiTablePagination-root, & .MuiTablePagination-item":
                {
                  color: "black",
                },
            }}
          />

          <Box sx={{ ml: 4 }}>
          <Typography variant="h5">
              Selected Permissions ({permissionSetName.length})
            </Typography>
            {permissionSetName.map((name) => (
              <SelectedPermissionSet
                key={name}
                name={name}
                onRemove={() => {
                  setPermissionSetName((prev) =>
                    prev.filter((item) => item !== name)
                  );
                }}
              />
            ))}
          </Box>
        </Box>
      </form>
    </>
  );
}

export default CreatePolicy;

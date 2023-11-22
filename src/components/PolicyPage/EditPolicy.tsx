import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { AddPolicyData, ViewPermissionData } from "../../types/Movie";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import { useNavigate, useParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import {
  useGetPermissionQuery,
  useGetPermissionSetByIdQuery,
  useGetPermissionSetQuery,
} from "../../store/service/getUser.service";
import { Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import React from "react";
import { toast } from "react-toastify";
import { useEditPolicyMutation } from "../../store/service/register.service";

interface SelectedPermissionSetProps {
  name: string;
  onRemove: () => void;
}

function EditPolicy() {
  const { permissionSetId } = useParams();
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
  });
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<AddPolicyData>({
    resolver: yupResolver(validationSchema) as any,
  });
  const [permissionIdList, setPermissionIdList] = React.useState<string[]>([]);

  const { data: permissionData } = useGetPermissionQuery();
  const {
    data: permissionSetData,

    error,
    isLoading,
  } = useGetPermissionSetByIdQuery(permissionSetId || "");

  const rows = permissionData
    ? permissionData.data.map((permission: any) => ({
        id: permission.id,
        name: permission.name,
        sort: permission.sort,
      }))
    : [];
  const { refetch } = useGetPermissionSetQuery();
  const [editPolictyMutation] = useEditPolicyMutation();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };
  const filteredRows = rows.filter((row: ViewPermissionData) => {
    const rowData = Object.values(row).join(" ").toLowerCase();
    return rowData.includes(searchQuery.toLowerCase());
  });

  const columns = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "sort", headerName: "Sort", width: 100 },
  ];

  const [permissionSetName, setPermissionSetName] = React.useState<string[]>(
    []
  );
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
  const onSubmitHandler = async (data: AddPolicyData) => {
    data.permissionIdList = permissionIdList;
    try {
      if (permissionSetId) {
        await editPolictyMutation({
          id: permissionSetId,
          name: data.name,
          permissionIdList: data.permissionIdList,
          description: data.description || "",
        });
        refetch();
        toast.success("Policy update successful");
      } else {
        toast.error("Policy update failed - roleId is undefined");
      }
    } catch (error) {
      toast.error("Policy update failed");
    }
  };

  const onSubmitHandlerAndClose = async (data: AddPolicyData) => {
    data.permissionIdList = permissionIdList;
    try {
      if (permissionSetId) {
        await editPolictyMutation({
          id: permissionSetId,
          name: data.name,
          permissionIdList: data.permissionIdList,
          description: data.description || "",
        });
        refetch();
        toast.success("Policy update successful");
        navigate("/AdminPage/PolicyPage");
      } else {
        toast.error("Policy update failed - roleId is undefined");
      }
    } catch (error) {
      toast.error("Policy update failed");
    }
  };

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  if (error) {
    return <Box>Error loading user data</Box>;
  }

  if (!permissionSetData) {
    return <Box>User not found</Box>;
  }
  const { name, description } = permissionSetData;
  console.log(permissionSetData.permissionIdList);
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <TextField
          id="outlined-read-only-input"
          label="Name"
          defaultValue={name}
          {...register("name")}
          sx={{ input: { color: "black" }, mb: 2, width: 500 }}
        ></TextField>

        <Button
          variant="contained"
          sx={{ ml: 30 }}
          onClick={handleSubmit(onSubmitHandler)}
        >
          <SaveIcon sx={{ mr: 2 }}></SaveIcon> SAVE
        </Button>
        <Button
          variant="contained"
          sx={{ ml: 2 }}
          onClick={handleSubmit(onSubmitHandlerAndClose)}
        >
          <SaveIcon sx={{ mr: 2 }}></SaveIcon> SAVE & CLOSE
        </Button>
        <Button
          variant="contained"
          sx={{ ml: 2 }}
          onClick={() => navigate("/AdminPage/PolicyPage")}
        >
          CANCEL
        </Button>
      </Box>

      <TextField
        id="outlined-read-only-input"
        label="Description"
        multiline
        rows={4}
        defaultValue={description}
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
          sx={{ marginLeft: 1, width: 400, mr: 50 }}
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
            width: "",
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
    </>
  );
}

export default EditPolicy;

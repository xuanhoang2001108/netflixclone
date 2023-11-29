import { Button, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import {
  useGetPermissionByIdQuery,
  useGetPermissionQuery,
} from "../../../store/service/getUser.service";
import { useNavigate, useParams } from "react-router-dom";
import { useEditPermissionMutation } from "../../../store/service/register.service";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import SaveIcon from "@mui/icons-material/Save";
import React from "react";
type AddPermissionData = {
  name: string;
  sort: number;
  data: any;
};

export default function EditPermission() {
  const { permissionId } = useParams();
  const { refetch } = useGetPermissionQuery();
  const [editPermissionMutation] = useEditPermissionMutation();
  const navigate = useNavigate();
  const {
    data: permissionData,
    error,
    isLoading,
  
  } = useGetPermissionByIdQuery(permissionId || "");

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Permission Name is required"),
  });

  const { register, handleSubmit } = useForm<AddPermissionData>({
    resolver: yupResolver(validationSchema) as any,
  });

  const onSubmitHandler = async (data: AddPermissionData) => {
    try {
      if (permissionId) {
        await editPermissionMutation({
          id: permissionId,
          name: data.name,
          sort: data.sort,
        });
        refetch();
        toast.success("Role update successful");
      } else {
        toast.error("Role update failed - Permission is undefined");
      }
    } catch (error) {
      toast.error("Role update failed");
    }
  };

  const onSubmitHandlerAndClose = async (data: AddPermissionData) => {
    try {
      if (permissionId) {
        await editPermissionMutation({
          id: permissionId,
          name: data.name,
          sort: data.sort,
        });
        refetch();
        toast.success("Permission update successful");
        navigate("/AdminLoginPage/AdminPage/PermissionPage");
      } else {
        toast.error("Permission update failed - Permission is undefined");
      }
    } catch (error) {
      toast.error("Permission update failed");
    }
  };


  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  if (error) {
    return <Box>Error loading user data</Box>;
  }

  if (!permissionData) {
    return <Box>User not found</Box>;
  }
  const { name, sort } = permissionData;
  return (
    <Box sx={{ marginRight: "10%" }}>
      <form className=" " onSubmit={handleSubmit(onSubmitHandler)}>
        <Box sx={{ display: "flex", flexDirection: "row", width: "screen  " }}>
          <Typography variant="h4">Edit permission</Typography>
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
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
              onClick={() => navigate("/AdminLoginPage/AdminPage/PermissionPage")}
            >
              CANCEL
            </Button>
          </Box>
        </Box>
        <Box sx={{ mt: 2, display: "flex", flexDirection: "column" }}>
          <TextField
            label="Permission Name"
            variant="outlined"
            defaultValue={name}
            {...register("name")}
            InputProps={{
              style: { color: "black" },
            }}
          />
          <TextField
            label="Sort"
            variant="outlined"
            defaultValue={sort}
            {...register("sort")}
            InputProps={{
              style: { color: "black" },
            }}
          />
        </Box>

        <ToastContainer />
      </form>
    </Box>
  );
}

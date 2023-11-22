import { Button, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useGetPermissionQuery } from "../../../store/service/getUser.service";
import { useNavigate } from "react-router-dom";
import { useAddPermissionMutation } from "../../../store/service/register.service";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

type AddPermissionData = {
  name: string;
  sort: number;
  data: any;
};

export default function CreatePermission() {
  const { refetch } = useGetPermissionQuery();

  const [addPermissionMutation] = useAddPermissionMutation();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Permission Name is required"),
  });

  const { register, handleSubmit } = useForm<AddPermissionData>({
    resolver: yupResolver(validationSchema) as any,
  });

  const onSubmitHandler = async (data: AddPermissionData) => {
    try {
      await addPermissionMutation(data);
      refetch();
      toast.success("Permission create successfully");
      navigate("/AdminPage/PermissionPage");
    } catch (error) {
      toast.error("Permission create failed");
    }
  };

  return (
    <Box sx={{ marginRight: "10%" }}>
      <form className=" " onSubmit={handleSubmit(onSubmitHandler)}>
        <Box sx={{ display: "flex", flexDirection: "row", width: "screen  " }}>
          <Typography variant="h4">Add permission</Typography>
          <Button
            sx={{ bgcolor: "black", color: "white", ml: "60%" }}
            type="submit"
          >
            CREATE
          </Button>
          <Button
            sx={{ marginLeft: 1, bgcolor: "black", color: "white" }}
            onClick={() => {
              navigate("/AdminPage/PermissionPage");
            }}
          >
            CANCEL
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TextField
            label="Permission Name"
            variant="outlined"
            {...register("name")}
            InputProps={{
              style: { color: "black" },
            }}
          />
          <TextField
            label="Sort"
            variant="outlined"
            defaultValue={0}
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

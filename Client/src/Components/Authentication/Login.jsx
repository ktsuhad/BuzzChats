import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, Stack, TextField, Tooltip } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import userApi from "../../Services/userApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(); //password show & hide

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { email: "", password: "" } });

  //form submition
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);

      const response = await userApi.login(formData);

      if (response) {
        toast.success("login successfully")
        navigate("/chats");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message)
    }
  };

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-xl ring-1 ring-gray-900/5 text-black w-full">
          <h1 className="mb-8 text-3xl text-center font-semibold">Login</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <TextField
                id="email"
                variant="outlined"
                label="email"
                type="email"
                className="w-full"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email format",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <div className="relative">
                <TextField
                  id="password"
                  variant="outlined"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  className="w-full"
                  {...register("password", {
                    required: "password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                    maxLength: {
                      value: 10,
                      message: "Password can't be more than 10 characters",
                    },
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-3 right-3 opacity-75"
                >
                  <Tooltip title={showPassword ? "off" : "on"}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </Tooltip>
                </div>
              </div>
              <a
                href="#"
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </a>

              <Button
                variant="contained"
                color="success"
                type="submit"
                className="w-full"
              >
                Sign in
              </Button>
            </Stack>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

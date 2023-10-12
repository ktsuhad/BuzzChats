import { Button, Stack, TextField, Tooltip } from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import userApi from "../../Services/userApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = ({ switchToLogin }) => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      image: null,
    },
  });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("image", data.image[0]);

      const response = await userApi.register(formData);


      if (response) {
        toast.success("user registered successfully")
        localStorage.setItem("userInfo", JSON.stringify(response)); //added into local storage
        navigate("/chats");
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message || "An error occurred during registration. Please try again.");
    }
  };

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-xl ring-1 ring-gray-900/5 text-black w-full">
          <h1 className="mb-8 text-3xl text-center font-semibold">Sign up</h1>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <TextField
                id="name"
                label="Full Name"
                variant="outlined"
                type="text"
                className="w-full"
                {...register("name", {
                  required: "Name is required",
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
              <TextField
                id="email"
                label="Email"
                variant="outlined"
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
              <input type="file" accept="image/*" {...register("image")} />
              <div className="relative">
                <TextField
                  id="password"
                  label="Password"
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  className="w-full"
                  {...register("password", {
                    required: "Password is required",
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
              <TextField
                id="confirm-password"
                label="Confirm Password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                className="w-full"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === getValues("password") || "Passwords must match",
                })}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
              />
              <Button
                variant="contained"
                color="success"
                type="submit"
                className="w-full space-y-10"
              >
                Create Account
              </Button>
            </Stack>
          </form>

          <div className="text-center text-sm text-gray-500 mt-4">
            By signing up, you agree to the
            <a
              className="no-underline border-b border-grey-dark text-grey-dark"
              href="#"
            >
              Terms of Service and Privacy Policy
            </a>
          </div>
        </div>

        <div className="text-grey-dark mt-6 text-base tracking-wide font-serif">
          Already have an account?
          <span
            className="no-underline border-b border-blue text-blue-500 cursor-pointer"
            onClick={switchToLogin}
          >
            Log in
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;

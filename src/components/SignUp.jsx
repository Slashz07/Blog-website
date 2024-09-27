import { useState } from "react";
import authService from "../appwrite/auth.js";
import { Input, Button, Logo } from "./index.js";
import { login } from "../features/authSlice.js";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import uploadFiles from "../appwrite/mediaUpload.js";

function SignUp() {
  let dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit,formState: { errors  } } = useForm();
  const [error, setError] = useState("");

  const showSuccess = () => {
    toast.success("Successfully Signed-Up and Logged in", {
      position: "top-center",
    });
  };

 

  const userSignUp = async (data) => {
    setError("");
    try {
      if(data.image[0]&& data.image[0].size>1024*1024){
        const error = new Error("Image size must not exceed 1mb");
        error.status = 401;  
        throw error;
    }

      const file=data.image[0]? await uploadFiles.uploadFile(data.image[0]):null

      const session = await authService.createAccount({
        ...data,
        userImage:file?file.$id:undefined
      });

      if (session) {
        showSuccess();
        const userData = await authService.getCurrentUser();
        if (userData) {
          console.log(userData)
          dispatch(login({ userData }));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`w-full max-w-lg mx-auto bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="font-bold text-2xl text-center leading-tight">
          Sign up your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to={`/login`}
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Login
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(userSignUp)}>
          <div className="space-y-5">
            <Input
              label="Name: "
              placeholder="enter your name"
              name="name"
              {...register("name", {
                required: true,
              })}
            />
            <div>
              <Input
                label="Featured Image: "
                type="file"
                accept="image/jpg,image/png,image/jpeg,image/gif"
                className="mb-4"
                {...register("image", {
                  required:false
                })}
              />
              {errors.image && (
                <p className="text-red-600  mb-1">{errors.image.message}</p>
              )}
            </div>
            <Input
              label="Email: "
              placeholder="enter your email"
              name="email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password: "
              placeholder="enter your password"
              name="password"
              type="password"
              {...register("password", {
                required: true,
              })}
            />
            <Button text="Sign Up" type="submit" className="w-full" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;

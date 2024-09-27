import { useEffect, useState } from "react";
import uploadFiles from "../appwrite/mediaUpload";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Input } from "../components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authService from "../appwrite/auth";
import defaultProfileImg from "../assets/defaultProfileImg.png";
import { login, updatePic } from "../features/authSlice";

function MyAccount() {
  const userData = useSelector((state) => state.auth.userData);
  const [imgUrl, setImgUrl] = useState(userData.prefs);
  const dispatch = useDispatch();

  useEffect(() => {
    setImgUrl(userData.prefs);
  }, [userData.prefs]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: userData?.name,
      email: userData?.email,
    },
  });

  const notify = (type,msg="") => {

    toast.dismiss();

    if (type === 'inProgress') {
      toast.info(msg!=""?msg:'Work in Progress...', {
        position: "top-center",
        autoClose: false, 
        hideProgressBar: true,
      });
    } else if (type === 'success') {
      toast.success(msg!=""?msg:'Operation Successful!', {
        position: "top-center",
      });
    } else if (type === 'error') {
      toast.error(msg!=""?msg:'An error occurred!', {
        position: "top-center",
      });
    }
  };
  
  const removeImage = async () => {
    const currentImage=imgUrl.userImage
    const userPicObj = await authService.updateProfilePic(null);
    const userPic=userPicObj.prefs
    dispatch(updatePic({ userPic }));
    uploadFiles.deleteFile(currentImage)
  };



  async function updateAccountDetails(data) {
    notify("inProgress","Updations are being made,\nPlease wait a moment")

    try {
      if (data.password) {
        const confirmPass = window.prompt("Enter the current password");
        await authService.changePassword(confirmPass, data.password);
      }
      if (data.image[0] && data.image[0].size > 1024 * 1024) {
        const error = new Error("Image size must not exceed 1mb");
        error.status = 401;
        throw error;
      }

      const file = data.image[0]
        ? await uploadFiles.uploadFile(data.image[0])
        : null;
      if (file) {
        if (Object.keys(imgUrl).length && imgUrl.userImage != null) {
          uploadFiles.deleteFile(imgUrl.userImage);
        }

         await authService.updateProfilePic(
          file ? file.$id : undefined
        );
   
      }

      if (userData.name != data.name)
        await authService.updateUserName(data.name);

      notify("success","Account updations  made successfully!");
    } catch (error) {
      notify("error",error.message);
    } finally {
      const userInfoAfterUpdation=await authService.getCurrentUser();
      reset({
        name:userInfoAfterUpdation.name,
        image:"",
        password:""
      })
      dispatch(login({userData:userInfoAfterUpdation}))
    }
  }

  return (
    <div className="max-w-3xl mb-5 mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <div className="w-full mb-6 flex justify-center relative">
        <img
          src={
            Object.keys(imgUrl).length && imgUrl.userImage != null
              ? uploadFiles.getFilePreview(imgUrl.userImage)
              : defaultProfileImg
          }
          className="rounded-full w-32 h-32 object-cover border-4 border-gray-300 shadow-md"
          alt="User Profile"
        />

        {Object.keys(imgUrl).length > 0 && imgUrl.userImage !=null && (
          <button
            type="button"
            onClick={removeImage}
            className="absolute bottom-0 left-50 transform translate-x-1 translate-y-2 bg-red-500 text-white px-2 py-1 text-sm rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            Remove
          </button>
        )}
      </div>

      <div>
        <form
          onSubmit={handleSubmit(updateAccountDetails)}
          className="space-y-6 mb-5"
        >
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Change Account Image:
            </label>
            <Input
              type="file"
              accept="image/jpg,image/png,image/jpeg,image/gif"
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
              {...register("image", { required: false })}
            
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Name:
            </label>
            <Input
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
              {...register("name", {
                required: "Name is required",
              })}
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Current Account:
            </label>
            <Input
              className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-600"
              {...register("email")}
              disabled
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Change Password:
            </label>
            <Input
              type="password"
              placeholder="Enter new password"
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
              {...register("password")}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default MyAccount;

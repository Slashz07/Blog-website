import { Link, useNavigate } from "react-router-dom";
import uploadFiles from "../appwrite/mediaUpload.js";
import "./styles/PostCard.css";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

function postCard({ $id, featuredImage, title, status,userId }) {

  const navigate=useNavigate()
  const currentUser=useSelector((state)=>state.auth.userData)

  const denyEntry=()=>{
    toast.error("This blog is under progress,please wait till author publishes it",{
      position:"top-center"
    })
  }

  const checkStatus=()=>{
    console.log(currentUser.$id)
    console.log($id)
    if(status=="active"){
      navigate(`/post/${$id}`)
    }else if(status=="inactive"&&currentUser.$id==userId){
      navigate(`/post/${$id}`)
    }else{
      denyEntry()
      navigate('/all-posts')
    }
  }

  return (
    // <Link to={`/post/${$id}`} >
    <div onClick={checkStatus}>
      <div className="post-content w-full bg-gray-100 rounded-xl p-4 ">
        <div className="image-container w-full justify-center mb-4 ">
          <img
            style={{ width: "256px", height: "170px" }}
            src={uploadFiles.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl image"
          />
        </div>
        <h2 className="text-xl font-bold title">{title}</h2>
      </div>
    </div>

    // </Link>
  );
}

export default postCard;

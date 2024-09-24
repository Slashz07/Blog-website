import { useState, useEffect } from "react";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import blogDetails from "../appwrite/blogDetailsStore";
import uploadFiles from "../appwrite/mediaUpload";
import { Container, Button } from "../components";
import { Link } from "react-router-dom";
import authService from "../appwrite/auth";
import authUser from "../appwrite/authUserHandler";

function Post() {
  const [post, setPost] = useState(null);
  const [authorName,setAuthorName]=useState("")
  const navigate = useNavigate();
  const { slug } = useParams();
  const loggedUser = useSelector((state) => state.auth.userData);
  const isAuthor = loggedUser && post ? loggedUser.$id === post.userId : false;

  useEffect(() => {
    if (slug) {
      blogDetails.getBlog(slug).then((post) => {
        if (post) {
          setPost(post);
        } else navigate("/");
      });
    }
  }, [navigate, slug]);

  useEffect(()=>{
    if(post){
      authUser.getUser(post.userId)
      .then((data)=>setAuthorName(data.name))
      .catch((error)=>{console.log("error : ",error)})
    }
  })

  const deletePost = () => {
    blogDetails.deleteBlog(slug).then((status) => {
      if (status) {
        uploadFiles.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8">
      <Container>
      <div className="w-full flex flex-col items-center mb-4 relative border rounded-xl p-4 shadow-lg">
          <h1 className=" font-semibold text-gray-700 mb-2" style={{fontSize:"3rem"}}>
            <span className="text-blue-500">{authorName}</span>&apos;s blog
          </h1>
          
          <img
            src={uploadFiles.getFilePreview(post.featuredImage)}
            alt={post.title}
          />
          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3" text={"Edit"} />
              </Link>
              <Button
                bgColor="bg-red-500"
                onClick={deletePost}
                text={"Delete"}
              />
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className='browser-css'>
  <div className='prose prose-lg max-w-none text-gray-700 border border-gray-300 rounded-lg p-6 shadow-lg'>
    {parse(post.content)}
  </div>
</div>

      </Container>
    </div>
  ) : null;
}

export default Post;

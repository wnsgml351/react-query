import { fetchComments } from "./api";
import { useQuery } from "@tanstack/react-query";
import "./PostDetail.css";

export function PostDetail({ post, deleteMutation, updatemutation }) {

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["comments", post.id],
    queryFn: () => fetchComments(post.id),
    staleTime: 2000, // 2 seconds
  });
  if (isLoading) {
    return <h3>Loading!</h3>;
  }
  if (isError) {
    return (
      <>
        <h3>Error</h3>
        <p>{error.toString()}</p>
      </>
    );
  }

  console.log("data: ", data)

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <div>
        <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
        {deleteMutation.isPending && <p className="loading">Deleting the post</p>}
        {deleteMutation.isError && <p className="error">Error deleting the post : {deleteMutation.error.toString()}</p>}
        {deleteMutation.isSuccess && <p className="success">Post was (not) deleted</p>}
      </div> 
      <div><button onClick={() => updatemutation.mutate(post.id)}>Update title</button></div>
      {updatemutation.isPending && <p className="loading">Updating the post</p>}
      {updatemutation.isError && <p className="error">Error Updating the post : {updatemutation.error.toString()}</p>}
      {updatemutation.isSuccess && <p className="success">Post was (not) updated</p>}
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}

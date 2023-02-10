import { IComment } from '@/types/post'
import dateHandle from '@/utils/date.handle'
import { useEffect, useState } from 'react'
import useFetch from "@/custom-hooks/useFetch"
import commentService from '@/services/comment.service'
import { socket } from '@/services/socket.service'
import { isObject } from 'util'

interface CommentsProps {
    comments:IComment[],
    postId:string
}
export default function Comments({comments, postId}:CommentsProps) {
  const [comment, setComment] = useState("")
  const [fetchComment] = useFetch()

  function handleChange(e:React.ChangeEvent<HTMLInputElement>){
    setComment(e.target.value)
  }

  function handleCreateComment(){
    if (comment.length) {
      fetchComment(commentService.create(postId, comment))
    }
  }

  useEffect(() => {
    socket.on("new_comment", (newComment:IComment) =>{
      console.log("new comment", newComment)
    })
    return ()=> {
      socket.off("send_comment")
    }
  }, [socket]);
  return (
    <div style={{ backgroundColor: "#7286D3", width: "100%", marginTop:"20px" }}>
    <h4 style={{color:"#F0EEED"}}>Comments</h4>
      <input onChange={handleChange} type="text" placeholder='Add your comment'/>
      <input onClick={handleCreateComment} type="button" value="Post comment" />
      {
        comments.map(comment => {
          const dateCommentFormated = dateHandle.formatToLocal(comment.createdAt)
          return (
            <div style={{marginBottom:"20px",paddingLeft:"10px", backgroundColor:"#7B8FA1"}}>
              <span style={{ fontSize: "1.3rem", color: "white", marginRight: "10px" }}>{comment.author.username}</span>
              <span style={{ color: "#F0EEED", marginRight: "10px" }}>{dateCommentFormated}</span>
              <p style={{ fontSize: "1.5rem", color: "#F0EEED" }}>{comment.content}</p>
            </div>
          )
        })
      }
    </div>
  )
}

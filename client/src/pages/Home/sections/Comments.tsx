import { IComment } from '@/types/post'
import dateHandle from '@/utils/date.handle'
import { useEffect, useState } from 'react'
import useFetch from "@/custom-hooks/useFetch"
import commentService from '@/services/comment.service'
import { socket } from '@/services/socket.service'

interface CommentsProps {
    comments:IComment[];
    postId:string;
    onAddComment:(newComment:IComment) => void
}
export default function Comments({comments, postId, onAddComment}:CommentsProps) {
  const [comment, setComment] = useState("")
  const [fetchComment] = useFetch()

  function handleChange(e:React.ChangeEvent<HTMLInputElement>){
    setComment(e.target.value)
  }

  // se realiza la peticion al servidor para agregar un comentario a un post en especifico
  function handleCreateComment(){
    if (comment.length) {
      fetchComment(commentService.create(postId, comment))
    }
  }

  // escucha eventos de socket enviados desde el servidor
  useEffect(() => {
    socket.on("new_comment", (newComment:IComment) =>{
      // una vez recibido el nuevo comentario se invoca esta funcion con dicho comentario para que se pueda
      // se le para que se realice la accion especificada en la definicion de la funcion, por ejemplo
      // generar un nuevo render
      onAddComment(newComment)
    })
    return ()=> {
      socket.off("new_comment")
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

import { IComment } from '@/types/post'
import dateHandle from '@/utils/date.handle'

interface CommentsProps {
    comments:IComment[]
}
export default function Comments({comments}:CommentsProps) {
  return (
    <div style={{ backgroundColor: "#7286D3", width: "100%", marginTop:"20px" }}>
    <h4 style={{color:"#F0EEED"}}>Comments</h4>
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

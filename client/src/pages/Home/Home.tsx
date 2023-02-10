import useFetch from '@/custom-hooks/useFetch'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setIsAuth } from '@/redux/states/user.slice'
import postsService from '@/services/posts.service'
import { IComment, IPost } from '@/types/post'
import dateHandle from '@/utils/date.handle'
import localStorageHandle from '@/utils/localStorage.handle'
import { useEffect, useState } from 'react'
import Comments from './sections/Comments'

export default function Home() {
  const [fetchPosts] = useFetch<IPost[]>(successFetchPosts)
  const [postsState, setPostsState] = useState<IPost[] | null>(null);
  const { user } = useAppSelector(state => state)
  const dispatch = useAppDispatch()

  // logout function
  function handleClick() {
    localStorageHandle.deleteItem("token")
    dispatch(setIsAuth(false))
  }

  // se ejecuta una vez que la peticion al servidor ha sido satisfactoria
  function successFetchPosts(postsData: IPost[]) {
    setPostsState(postsData)
  }

  // agrega un nuevo comentario al estado para que se renderice una vez que se ha creado
  function handleAddComment(newComment: IComment) {
    setPostsState(prev => {
      // esto es para evitar mutar el estado
      // --------------------------------------
      return prev?.map(post => {
        if (post._id === newComment.postId) {
          return {
            ...post,
            comments: [newComment, ...post.comments]
          }
        }
        return post
      }) || null
      // --------------------------------------------
    })
  }

  // se cargan los posts cuando el componente se monta
  useEffect(() => {
    if (user.isAuth) {
      fetchPosts(postsService.getAllPosts())
    }
  }, [])

  return (
    <div>
      <h1>{user.username}</h1>
      <button onClick={handleClick}>Logout</button>
      {
        postsState ? postsState.map(post => {
          const dateFormated = dateHandle.formatToLocal(post.createdAt)
          return (
            <div style={{ backgroundColor: "#7286D3", width: "20rem", margin: "20px auto" }}>
              <span style={{ fontSize: "1.3rem", color: "white", marginRight: "10px" }}>{post.author.username}</span>
              <span style={{ color: "#F0EEED", marginRight: "10px" }}>{dateFormated}</span>
              <p style={{ fontSize: "1.5rem", color: "#F0EEED" }}>{post.content}</p>
              <Comments
                onAddComment={handleAddComment}
                postId={post._id}
                comments={post.comments}
              />
            </div>
          )
        }) : <></>
      }
    </div>
  )
}

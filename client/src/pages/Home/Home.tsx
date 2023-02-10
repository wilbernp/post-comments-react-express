import useFetch from '@/custom-hooks/useFetch'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setIsAuth } from '@/redux/states/user.slice'
import postsService from '@/services/posts.service'
import { IPost } from '@/types/post'
import dateHandle from '@/utils/date.handle'
import localStorageHandle from '@/utils/localStorage.handle'
import React, { useEffect } from 'react'
import Comments from './sections/Comments'

export default function Home() {
  const [fetchPosts, posts] = useFetch<IPost[]>()
  const { user } = useAppSelector(state => state)
  const dispatch = useAppDispatch()
  function handleClick() {
    localStorageHandle.deleteItem("token")
    dispatch(setIsAuth(false))
  }

  useEffect(() => {
    if (user.isAuth) {
      fetchPosts(postsService.getAllPosts())
    }
  }, [])

  return (
    <div>
      <button onClick={handleClick}>Logout</button>
      {
        posts ? posts.map(post => {
          const dateFormated = dateHandle.formatToLocal(post.createdAt)
          return (
            <div style={{ backgroundColor: "#7286D3", width: "20rem", margin: "20px auto" }}>
              <span style={{ fontSize: "1.3rem", color: "white", marginRight: "10px" }}>{post.author.username}</span>
              <span style={{ color: "#F0EEED", marginRight: "10px" }}>{dateFormated}</span>
              <p style={{ fontSize: "1.5rem", color: "#F0EEED" }}>{post.content}</p>
             <Comments comments={post.comments}/>
            </div>
          )
        }) : <></>
      }
    </div>
  )
}

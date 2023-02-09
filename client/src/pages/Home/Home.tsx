import useFetch from '@/custom-hooks/useFetch'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setIsAuth } from '@/redux/states/user.slice'
import postsService from '@/services/posts.service'
import { IPost } from '@/types/post'
import localStorageHandle from '@/utils/localStorage.handle'
import React, { useEffect } from 'react'

export default function Home() {
  const [fetchPosts,posts,loadingPosts, errorPosts] = useFetch<IPost[]>()
  const {user} = useAppSelector(state => state)
  const dispatch = useAppDispatch()
  console.log("user Home", user.username)
  function handleClick(){
    localStorageHandle.deleteItem("token")
    dispatch(setIsAuth(false))
  }

  useEffect(() => {
    fetchPosts(postsService.getAllPosts())
  }, [])
  
  return (
    <div>
      <button onClick={handleClick}>Logout</button>
      {
        posts?posts.map(post => {
          return(
            <div style={{backgroundColor:"blue", width:"20rem",margin:"20px auto"}}>
              <span>{post.author.username}</span>
              <p>{post.content}</p>
            </div>
          )
        }):<></>
      }
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import Pagination from '../components/Pagination'
const sourceUrl = "https://jsonplaceholder.typicode.com/posts"

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [numberPages, setNumberPages] = useState(0);
  const [activePost, setActivePost] = useState(1);
  const [postsFoDisplay, setPostsFoDisplay] = useState([]);
  const [postsPerPage, setPostsPerPage] = useState(5)

  function handlerInput(e) {
    let newPostsPerPage = e.target.value
    if (newPostsPerPage <= 0) {
      setPostsPerPage(0)
      setNumberPages(1)
      return
    }
    if (newPostsPerPage > posts.length) {
      setPostsPerPage(posts.length)
      setNumberPages(1)
      return
    }
    setPostsPerPage(newPostsPerPage)
    setNumberPages(Math.ceil(posts.length / newPostsPerPage))
  }

  useEffect(() => {
    fetch(sourceUrl)
      .then((response) => response.json())
      .then((json) => {
        setPosts(json);
        setNumberPages(() => Math.ceil(json.length / postsPerPage));
      });
  }, []);

  useEffect(() => {
    if (posts.length === 0) {
      return
    }
    const postsPart = posts.slice((activePost - 1) * postsPerPage, activePost * postsPerPage);
    setPostsFoDisplay(postsPart)
  }, [posts, activePost, postsPerPage]);

  return (
    <>
      <input
        type="number"
        className='setPostsQuantity'
        onChange={handlerInput}
      ></input>

      <span style={{ fontSize: "18px", fontWeight: 600 }}>Set posts per page</span>

      {postsFoDisplay.map((item) => {
        return (
          <div key={item.id}>
            <div>id: {item.id}</div>
            <div>Post Title: <b>{item.title}</b></div>
            <div>Post body: <i>{item.body}</i></div>
            <hr></hr>
          </div>
        )
      })}
      <Pagination
        numberPages={numberPages}
        activePost={activePost}
        setActivePost={setActivePost}
      ></Pagination>
    </>
  )
}

export default Posts
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { PostDetail } from './PostDetail';


const maxPostPage = 10;

const fetchPosts = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10&_page=0")

  return response.json()
}

const Posts = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [selectedPost, setSelectedPost] = useState(null)

  // replace with react query
  const { data } = useQuery(["posts"], fetchPosts);

  if(!data) return <div></div>
  
  return (
    <>
       <ul>
        {data.map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => setSelectedPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button disabled onClick={() => {}}>
          Previous page
        </button>
        <span>Page {currentPage + 1}</span>
        <button disabled onClick={() => {}}>
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
};

export default Posts;
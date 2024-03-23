/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getAllPost } from '../api/postdata';
import { useAuth } from '../utils/context/authContext';
import PostCard from '../components/PostCard';

function Home() {
  // TODO: Set a state for posts
  const [posts, setPosts] = useState([]);

  // TODO: Get user ID using useAuth Hook
  const { user } = useAuth();

  // TODO: create a function that makes the API call to get all the posts
  const getPosts = () => {
    getAllPost(user.uid).then(setPosts);
  };

  // TODO: make the call to the API to get all the posts on component render
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/posts/new" passHref>
        <Button id="button1">Create A post</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {posts.map((post) => (
          <PostCard key={post.firebaseKey} postObj={post} onUpdate={getPosts} />
        ))}
      </div>
    </div>
  );
}

export default Home;

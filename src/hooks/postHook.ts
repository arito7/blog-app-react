import { useEffect, useState } from 'react';
import {
  getPosts,
  getUserPosts,
  getUserPublicPosts,
} from '../config/apiHelpers';

export function useUserPosts(userId: string) {
  const [userposts, setUserposts] = useState(null);

  function getAndSetUserPosts() {
    getUserPosts(userId)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUserposts(data.posts);
        }
      })
      .catch((err) => console.log(err.message));
  }

  function update(): void {
    getAndSetUserPosts();
  }

  useEffect(() => {
    console.log('Getting user posts');
    getAndSetUserPosts();
  }, [userId]);

  return { userposts, update };
}

export function usePosts() {
  const [posts, setPosts] = useState(null);

  function getAndSetPosts() {
    getPosts()
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPosts(data.posts);
        }
      })
      .catch((err) => console.log(err.message));
  }

  function updatePosts() {
    getAndSetPosts();
  }

  useEffect(() => {
    console.log('getting posts');
    getAndSetPosts();
  }, []);

  return { posts, updatePosts };
}

export function useUserPublicPosts(userId: string) {
  const [publicPosts, setPublicPosts] = useState(null);
  const [user, setUser] = useState(null);

  function updatePublicPosts() {
    getUserPublicPosts(userId)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPublicPosts(data.posts);
          setUser(data.user);
        } else {
          console.log(data);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  useEffect(() => {
    console.log('Getting public posts');
    updatePublicPosts();
  }, [userId]);

  return { publicPosts, user, updatePublicPosts };
}

import { useEffect, useState } from 'react';
import { getPosts, getUserPosts } from '../config/helpers';

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

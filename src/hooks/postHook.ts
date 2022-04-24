import { useEffect, useState } from 'react';
import { getUserPosts } from '../config/helpers';

export function useUserPosts(userId: string) {
  const [userposts, setUserposts] = useState(null);

  function update(): void {
    getUserPosts(userId)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUserposts(data.posts);
      })
      .catch((err) => console.log(err.message));
  }

  useEffect(() => {
    getUserPosts(userId)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUserposts(data.posts);
      })
      .catch((err) => console.log(err.message));
  }, [userId]);

  return { userposts, update };
}

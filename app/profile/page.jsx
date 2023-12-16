"use client";

import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProfileComp = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    console.log(session);
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/users/${session?.user.id}/posts`);
        const data = await response.json();
        if (session?.user.id) setPosts(data);
      } catch (error) {
        console.error;
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );
    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/prompt/${post?._id.toString()}`, {
          method: "DELETE",
        });
        const filterPost = posts.filter((p) => p._id !== post._id);
        setPosts(filterPost);
      } catch (error) {
        console.error;
      }
    }
  };
  const handleEdit = async (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  return (
    <div>
      <Profile
        name="My"
        data={posts}
        desc="Welcome to your personalized profile page"
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default ProfileComp;

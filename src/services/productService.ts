import axiosInstance from './axiosInstance';
import type { FormData, FormDataPost } from '../types/postTypes';

// Create a new post and Save to backend  
export const createPost = async (postData: FormData): Promise<FormDataPost> => {
    try {
        const response = await axiosInstance.post<FormDataPost>('/posts', postData);
        return response.data;
    } catch (error) {
        console.error('Error while creating post:', error);
        throw new Error('Failed to create post. Backend might be unavailable.');
    }
};

// Fetch all posts (Admin view)
export const getAllPosts = async (): Promise<FormDataPost[]> => {
    try {
     const res = await axiosInstance.get('/posts');
    return res.data;
    } catch (error) {
        console.error('Error fetching all posts :' , error);
        throw new Error('Failed to fetch all posts');
    }  
};

// Fetch posts for the logged-in user
export const getUserPosts = async (userId: string): Promise<FormDataPost[]> => {
  try {
    const res = await axiosInstance.get(`/posts/user/${userId}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching user posts:', error);
    throw new Error('Failed to fetch user posts.');
  }
};

// Delete post by ID
export const deletePost = async (postId: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/posts/${postId}`);
  } catch (error) {
    console.error('Error deleting post:', error);
    throw new Error('Failed to delete post.');
  }
};

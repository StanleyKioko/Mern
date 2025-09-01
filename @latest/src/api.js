import axios from 'axios';

const URL = "http://localhost:3000";  // Changed from https to http

export async function getPosts() {
    try {
        const response = await axios.get(`${URL}/posts`);
        if(response.status === 200){
            return response.data;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching posts:", error);
        return null;
    }
}

export async function getPost(id) {
    try {
        const response = await axios.get(`${URL}/posts/${id}`);
        if(response.status === 200){
            return response.data;
        } else {
            return null;
        }
    } catch (error) {
        console.error(`Error fetching post ${id}:`, error);
        return null;
    }
}

export async function createPost(post) {
    try {
        const response = await axios.post(`${URL}/posts`, post);
        return response;
    } catch (error) {
        console.error("Error creating post:", error);
        throw error;
    }
}

export async function updatePost(id, post) {
    try {
        const response = await axios.put(`${URL}/posts/${id}`, post);
        return response;
    } catch (error) {
        console.error(`Error updating post ${id}:`, error);
        throw error;
    }
}

export async function deletePost(id) {
    try {
        const response = await axios.delete(`${URL}/posts/${id}`);
        return response;
    } catch (error) {
        console.error(`Error deleting post ${id}:`, error);
        throw error;
    }
}
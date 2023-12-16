import axios from "axios";
import { baseUrl } from "./baseUrl";

const getAllBlogsService = () => {
  return axios.get(`${baseUrl}/blogs`);
};

const getAuthorsService = () => {
  return axios.get(`${baseUrl}/authors`);
};

const getCategoriesService = () => {
  return axios.get(`${baseUrl}/categories`);
};

const getTagsService = () => {
  return axios.get(`${baseUrl}/tags`);
};

const createBlogService = (data) => {
  return axios.post(`${baseUrl}/blogs`, data);
};

const deleteBlogService = (id) => {
  return axios.delete(`${baseUrl}/blogs/${id}`);
};

export {
  createBlogService,
  deleteBlogService, getAllBlogsService,
  getAuthorsService,
  getCategoriesService,
  getTagsService
};


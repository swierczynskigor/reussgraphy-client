import { apiUrl } from "@/constant";
import axios from "axios";

export const getVideos = async (folderName: string) => {
  const response = await axios.get(`${apiUrl}/api/${folderName}/videos`);

  return response.data;
};

export const addVideo = async (
  folderName: string,
  video: { title: string; content: string }
) => {
  const response = await axios.post(`${apiUrl}/api/${folderName}/video`, {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(video),
  });

  return response.data;
};

export const deleteVideo = async (folderName: string, id: string) => {
  const response = await axios.delete(
    `${apiUrl}/api/${folderName}/video/${id}`
  );

  return response.data;
};

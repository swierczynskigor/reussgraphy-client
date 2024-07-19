import { apiUrl } from "@/constant";
import axios from "axios";

export const getVideos = async (folderName: string) => {
  const response = await axios.get(`${apiUrl}/api/${folderName}/videos`);
  console.log(response.data);
  return response.data;
};

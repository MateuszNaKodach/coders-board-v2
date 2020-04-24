import axios from 'axios';
import { v4 as uuid } from 'uuid';

export const uploadToCloudinary = async (file: File, folder: string): Promise<string> => {
  const reqData = new FormData();
  reqData.append('file', file);
  reqData.append('folder', folder);
  reqData.append('name', uuid());

  const { data } = await axios.post(`${process.env.REACT_APP_SERVER_URL}/cloudinary`, reqData, {
    withCredentials: true,
  });

  return data.secure_url;
};

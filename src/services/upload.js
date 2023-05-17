import imagekit from '../config/imagekit';
import env from '../config/env';

export const imagekitUploadImage = async ({ file, fileName, folder }) => {
  let uploadUrl;
  const fileBufferString = file;

  try {
    // Purge cache First
    imagekit.purgeCache(`${env.IMAGEKIT_URL_ENDPOINT}/${folder}/${fileName}`);

    // Upload image to imagekit
    const response = await imagekit.upload({
      file: fileBufferString,
      fileName,
      folder,
      useUniqueFileName: false,
    });
    uploadUrl = response.url;
  } catch (error) {
    throw new Error(error);
  }
  return uploadUrl;
};

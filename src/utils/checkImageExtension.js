const checkImageExtension = (image, text) => {
  const array_of_allowed_extension = ['png', 'jpeg', 'jpg'];
  const array_of_allowed_image_types = ['image/png', 'image/jpeg', 'image/jpg'];

    // Allowed file size in mb
    const allowed_image_size = 2;

  // Get the extension of the uploaded file
  const image_extension = image.originalname.slice(
    ((image.originalname.lastIndexOf('.') - 1) >>> 0) + 2,
  );

  // Check if the uploaded file is allowed and checking the mimetype of the file to ensure it's an image
  if (
    !array_of_allowed_extension.includes(image_extension) ||
    !array_of_allowed_image_types.includes(image.mimetype)
  ) {
    throw new Error(`${text} is not a valid image`);
  }

  //checking image size
  if ((image.size / (1024 * 1024)) > allowed_image_size) {                  
    throw new Error('Image is too large');
 }
};

export default checkImageExtension;

import {v2 as cloudinary} from 'cloudinary'
cloudinary.config({ 
    cloud_name: process.env.cloud_name, 
    api_key: process.env.cloud_api_key, 
    api_secret: process.env.cloud_api_secret
  });
  

export const uploadImage=async(filePath,pathCloud)=>{
    return await cloudinary.uploader.upload(filePath,{folder:pathCloud})
}

export const deleteImage = async (imageId) => {
  console.log("id".imageId)
    return  await cloudinary.uploader.destroy(imageId);
  }
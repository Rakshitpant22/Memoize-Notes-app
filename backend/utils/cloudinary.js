// import {v2 as cloud} from 'cloudinary';
// import fs from 'fs';
  
// cloud.config({ 
//   cloud_name: process.env.CLOUD_NAME, 
//   api_key: process.env.CLOUD_API_KEY, 
//   api_secret: process.env.CLOUD_API_SECRET
// });

// const imageUploadOnCloud = async (path) => {
//     try {
//         const response = await cloud.uploader.upload(path,{
//             resource_type: "image",
//         })
//         console.log(response.url);
//         return response;
//     } catch (error) {
//         console.log(error);
//         fs.unlinkSync(path);
//         return null;
//     }
// }

// export default imageUploadOnCloud;
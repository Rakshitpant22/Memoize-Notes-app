import { useRef, useState } from "react";
import axios from 'axios';
import imageCompression from 'browser-image-compression';
import {useSelector,useDispatch} from 'react-redux';
import { userProfilePicture } from "../redux/userSlice";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import setCanvasPreview from "./setCanvasPreview";

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

const ImageCropper = ({ closeModal, updateAvatar }) => {

  const dispatch = useDispatch();

  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState();
  const [error, setError] = useState("");

  const onSelectFile = async (e) => {
    const file = e.target.files?.[0];

    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true
    }

    // console.log(file);
    if (!file) return;

    try {
        const compressedFile = await imageCompression(file,options);
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            const imageElement = new Image();
            const imageUrl = reader.result?.toString() || "";
            imageElement.src = imageUrl;

            imageElement.addEventListener("load", (e) => {
                if (error) setError("");
                const { naturalWidth, naturalHeight } = e.currentTarget;
                if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
                setError("Image must be at least 150 x 150 pixels.");
                return setImgSrc("");
                }
            });
            setImgSrc(imageUrl);
        });
        reader.readAsDataURL(compressedFile);
    } catch (error) {
        
    }
  };

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

const toDataURL = (url) => fetch(url)
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
    }))

const dataURLtoFile = (dataurl, filename) => {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
    u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}
   


  const serverUpload = async (url)=>{
    // const formData = new FormData();
    // formData.append(croppedImage);
    // await axios.post('/api/users/temp',formData);
    toDataURL(url)
    .then(dataUrl => {
        // console.log('Here is Base64 Url', dataUrl)
        var fileData = dataURLtoFile(dataUrl, "imageName.jpg");
        // console.log("Here is JavaScript File Object",fileData)
        // fileArr.push(fileData)
        const formData = new FormData();
        formData.append('file',fileData);
        formData.append('upload_preset',`${import.meta.env.VITE_CLOUD_UPLOAD_PRESET}`);
        formData.append('cloud_name',`${import.meta.env.VITE_CLOUD_NAME}`);
        dispatch(userProfilePicture(formData));
        // console.log(String(import.meta.env.VITE_CLOUD_UPLOAD_PRESET), String(import.meta.env.VITE_CLOUD_NAME));
        // fetch(`https://api.cloudinary.com/v1_1/${String(import.meta.env.VITE_CLOUD_NAME)}/image/upload`,{method:"post",body:formData})
        // .then(response=>response.json())
        // .then(response=>{console.log(response.url); dispatch(userProfilePicture({url:response.url}));})
        // .catch(error=>console.log(error))
    })
  }


  return (
    <>
      <label className="block mb-3 w-fit">
        <span className="sr-only">Choose profile photo</span>
        <input
          type="file"
          accept="image/*"
          onChange={onSelectFile}
          className="block w-full text-sm text-slate-500 file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:bg-gray-700 file:text-sky-300 hover:file:bg-gray-600"
        />
      </label>
      {error && <p className="text-red-400 text-xs">{error}</p>}
      {imgSrc && (
        <div className="flex flex-col items-center">
          <ReactCrop
            crop={crop}
            onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
            circularCrop
            keepSelection
            aspect={ASPECT_RATIO}
            minWidth={MIN_DIMENSION}
          >
            <img
              ref={imgRef}
              src={imgSrc}
              alt="Upload"
              style={{ maxHeight: "70vh" }}
              onLoad={onImageLoad}
            />
          </ReactCrop>
          <button
            className="text-white font-mono text-xs py-2 px-4 rounded-2xl mt-4 bg-sky-500 hover:bg-sky-600"
            onClick={() => {
              setCanvasPreview(
                imgRef.current, // HTMLImageElement
                previewCanvasRef.current, // HTMLCanvasElement
                convertToPixelCrop(
                  crop,
                  imgRef.current.width,
                  imgRef.current.height
                )
              );
              const dataUrl = previewCanvasRef.current.toDataURL();
              updateAvatar(dataUrl);
            //   console.log(dataUrl);
              

            //   fetch(dataUrl).then(res=>res.blob())
            //   .then(res=>new File([res],"temp.png",{type:res.type}))
            //   .then(res=>setCroppedImage(res));

            //   const formData = new FormData();
            //   formData.append('image',croppedImage);
            //   console.log(croppedImage);
            //   console.log(formData);
              serverUpload(dataUrl);
              closeModal();
            }}
          >
            Crop Image
          </button>
        </div>
      )}
      {crop && (
        <canvas
          ref={previewCanvasRef}
          className="mt-4"
          style={{
            display: "none",
            border: "1px solid black",
            objectFit: "contain",
            width: 150,
            height: 150,
          }}
        />
      )}
      {/* <div>
        <input type="file" accept="image/*"/>
      </div> */}
    </>
  );
};
export default ImageCropper;
import multer from 'multer';

const uploadFile = multer.diskStorage({
    destination: (req,file,cb)=>{
        return cb(null,"./uploads");
    },
    filename: (req,file,cb)=>{
        return cb(null,`temp.png`);
    }
})

const upload = multer({storage:uploadFile});
export default upload;
// const multer=require('multer')
import multer from 'multer'
import path from 'path'

const storage=multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,'../tinder-clone/public/uploads')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+path.extname(file.originalname));
    }
})

const store=multer({storage:storage})

export default store
// module.exports=store;


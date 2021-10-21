import mongoose from 'mongoose'

const messageSchema=new mongoose.Schema({
    sender:{
        type:String,
        required: true
    },
    receiver:{
        type:String,
        required:true

    },
    message:{
        type:String,
        trim:true
    },
    timestamp:{
        type:String
    },
    received:{
        type:Boolean
    }

})

const Message=mongoose.model('Message',messageSchema)
export default Message
// module.exports=Message
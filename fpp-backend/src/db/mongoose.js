import mongoose from 'mongoose'
import Pusher from 'pusher'

// dJejmIH7MgH31nwE

const mongoUrl='mongodb+srv://admin:dJejmIH7MgH31nwE@cluster0.gc4ws.mongodb.net/tinderdb?retryWrites=true&w=majority'

mongoose.connect(mongoUrl,{
    useNewUrlParser: true,
    useUnifiedTopology: true

}).catch(e => {
    console.log('Error '+e)
})

const db=mongoose.connection;

const pusher = new Pusher({
    appId: "1266900",
    key: "6919e4670960d89aa54b",
    secret: "c4c0ee5a6b76e429240b",
    cluster: "ap2",
    useTLS: true
  });

db.once("open",()=>{
    console.log("DB connected");
    const msgCOllection=db.collection("messages");
    const changeStream=msgCOllection.watch();
    changeStream.on('change',(change)=>{
        if(change.operationType==='insert')
        {
            const messageDetails=change.fullDocument;
            pusher.trigger('messages','inserted',
            {
                sender:messageDetails.sender,
                receiver:messageDetails.receiver,
                message:messageDetails.message,
                timestamp:messageDetails.timestamp,
                received:messageDetails.received
                
            });
        }else{

            console.log('Error occured in pushing');
        }
    })
})
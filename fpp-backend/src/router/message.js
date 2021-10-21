import express from 'express'
const router=new express.Router()

import Message from '../model/messages.js'

router.post('/messages',async (req,res) => {
    const message=new Message(req.body)

    try{
        await message.save()
        res.status(201).send(message)

    }
    catch(e){
        res.status(400).send(e)
    }
})

router.get('/messages/all',async(req,res) => {

    try{
        const messages=await Message.find({})
        res.status(200).send(messages)
    }
    catch(e){
        res.status(400).send('Error'+e)
    }
})

export default router
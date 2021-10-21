import express from 'express'
const router=new express.Router()
import store from '../multer.js'
import User from '../model/users.js'

//---------------------------- READ USER -----------------------//
router.get('/profile/:id',async(req,res)=>{
    const _id=req.params.id;
    try{
        const user=await User.findOne({_id})
        res.status(200).send(user)
    }
    catch(e){
        res.status(404).send(e)
    }
})



router.get('/chat/:id',async(req,res)=>{
    const id1=req.params.id;


    const query={

        [`liked.${id1}`]:true
    };
    // liked[id2]=false;

    try{
        const user=await User.find(query);
        res.status(200).send(user)

    }
    catch(e){
        res.status(404).send(e)
    }
})

//---------------READ all users -----------------------//
router.get('/all',async(req,res)=>{
    try{
        const users=await User.find({})
        res.status(200).send(users)
    }
    catch(e){
        res.status(404).send(e)
    }
})


// ------------------------- Update User --------------------------------//
router.post('/signup/create/:id',store.single('profile'),async(req,res)=>{

    try{
        const _id=req.params.id;
        const updates=Object.keys(req.body);
        console.log(req.file['filename']);
        const user=await User.findById(_id);
        updates.forEach(key => {
                const val=req.body[key];
            if(val!=="")
            {
                if(key==='liked')
                {
                    user[key]={...user[key],...val}
                }
                else
                user[key]=val;
            }
        });

        user['profile']=req.file['filename'];
        console.log(user);
        await user.save();

        if(!user)
        res.status(404).send()
        else
        res.status(201).send(user)
        // res.status(201).send(user)
    }
    catch(e){
        res.status(400).send('Error'+e)
    }
})
// ---------------------------------------update--------------------------------------------------//
router.post('/update/:id',async(req,res)=>{

    try{
        const _id=req.params.id;
        const updates=Object.keys(req.body);
        console.log(req.body['role']);
        const user=await User.findById(_id);
        updates.forEach(key => {
                const val=req.body[key];
            if(val!=="")
            {
                if(key==='liked')
                {
                    user[key]={...user[key],...val}
                }
                else
                user[key]=val;
            }
        });

        // user['profile']=req.file['filename'];
        console.log(user);
        await user.save();

        if(!user)
        res.status(404).send()
        else
        res.status(201).send(user)
        // res.status(201).send(user)
    }
    catch(e){
        res.status(400).send('Error'+e)
    }
})

//-----------------------------------SIGN UP--------------------------------------------//

router.post('/signup',async(req,res)=>{
    const user=new User(req.body);
    try{
        await user.save();
        res.status(201).send(user)
    }
    catch(e){
        res.status(400).send('Error'+e)
    }
})

//--------------------------------------LOG IN -----------------------------------------//

router.post('/login',async(req,res)=>{
    
    try{
        const user=await User.findByCredentials(req.body.email,req.body.password);
        
        res.status(201).send(user)
    }
    catch(e){
        res.status(400).send('Error'+e)
    }
})

//--------------------------------------------- SEARCH ROLE -----------------------------------------//

router.get('/login/:id',async(req,res)=>{
    const _id=req.params.id;

    // const role=req.params.role;

    try{

        const user=await User.findOne({_id});
        const users=await User.find({role: {$in:[user.required_role,'FullStack Development']}});
        const x=users.filter((val)=>{
            const val_id=val._id;
            return (!user.liked[val_id] && val_id!=_id);
        })


        res.status(200).send(x)
    }
    catch(e){
        res.status(400).send('Error'+e)
    }
})

export default router;
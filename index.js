import express from "express";
import mongoose from "mongoose";
import connectDB from "./db.js";
connectDB();
const UserDetailsSchema= mongoose.Schema({

    name:{
        type:String,
        required:true,
    },
    assignment:{
        type:String,
        required:true,
    },
})

const UserDetails=mongoose.model("UserDetails",UserDetailsSchema);
export default UserDetails;
const app=express();
const user=[
    {
        name:"Hari",
        assignment:"done"
    },
    {
        name:"aswini",
        assignment:"done"
    },
]

app.use(express.json());
app.get("/api/addUser",(req,res)=>{
    try{
        res.status(200).send(user);
    }
    catch(error){
        res.json({message:"unable to create"});
    }
});

app.post("/api/addUser", async(req,res)=>{
    try{
        const details={
            name:req.body.name,
            assignment:req.body.assignment
        };
        console.log(details);
        const user=new UserDetails(details);
        const userCreated=await user.save();
        if(userCreated){
            console.log("created");
            res.sendStatus(201).json({message:"successfully created"});
        }
        else{
            res.status(401);
            throw new error("not found");
        }
    }
    catch(err){
        return res.status(500).json({message:err.message});
    }
});

app.put('/api/addUser/:id',(req,res)=>{
    console.log(req.params.id);
    UserDetails.findOneAndUpdate({_id:req.params.id},{
        $set:{

        }
    })
    .then(result=>{
        res.status(200).json({
            updated_userDetails:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})

app.delete('/api/addUser/:id',(req,res)=>{
    console.log(req.params.id);
    UserDetails.findByIdAndRemove({_id:req.params.id},{
        $set:{

        }
    })
    .then(result=>{
        res.sendStatus(200).json({
            Deleted_userDetails:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})



const port=9532;
app.listen(port,()=>{
    console.log(`server is running on ${port}`);
});
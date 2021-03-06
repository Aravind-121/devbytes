const express=require("express"); 
const events = require("../models/events");
const router=express.Router(); 
const Event=require("../models/events"); 


router.get("/dates", async(req,res)=>{
    try{
        const events= await Event.find({}, {"eventdate":1});
        res.send(events); //dates will be sent 
    }
    catch(err) {
        res.status(500).send(err);
    }
})
router.get("/upcomingevents", async (req,res)=>{
    try{
        const events=await Event.find({"eventdate":{"$gte": Date.now()}}).sort({"eventdate":1}); 
        res.send({events}); 
    }
    catch(err)
    {
        res.staus(500).send({err})
    }
    

})


// router.get("/:date", async (req,res)=>{
//     const date= new Date(req.params.date);
//     const isValidDate= (date !== "Invalid Date" && !isNaN(date));
//     if (isValidDate)
//     {
//         try{
//             const events = await  Event.find({eventdate:date});
//             res.send({events});
//         }
//         catch(err)
//         {
//             res.status(500).send(err);
//         }

//     }
//     else 
//     {
//         //incorrect request body 
//         res.status(400).send("Invalid Date");
//     }
    
// }) 


router.get("/:date", async (req,res)=>{
    const date= new Date(req.params.date);
    const isValidDate= (date !== "Invalid Date" && !isNaN(date));
    if (isValidDate)
    {
        try{
            const tempevents = await  Event.find({});
            let events=[];
            for (let e of tempevents)
            {
                const d=e.eventdate; 
                if (d.getMonth()===date.getMonth() && d.getDate()===date.getDate() &&
                 d.getFullYear()===date.getFullYear())  
                {
                    events.push(e); 
                }      
            }
            res.send({events});
        }
        catch(err)
        {
            res.status(500).send(err);
        }

    }
    else 
    {
        //incorrect request body 
        res.status(400).send("Invalid Date");
    }
    
}) 

router.get("/event/:id",  async (req,res)=>{
    const {id}= req.params;
    try{
        const event = await  Event.findById(id);
        res.send({event}); 
    }
    catch(err)
    {
        res.status(500).send(err);
    }
    

} ); 


module.exports=router; 
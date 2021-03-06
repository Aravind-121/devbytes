const express=require("express"); 
const app=express();
const keys=require("./keys"); 
const cors=require("cors"); 
app.use(cors());

const mongoose=require("mongoose"); 
mongoose.connect(keys.MONGOURI); 

//admin rouutes
const admin=require("./routes/adminRoutes"); 
app.use("/admin", admin); 

app.use(express.urlencoded({extended:true})); 
app.use(express.json());


//eventRoute Handlers
const eventRoutes=require("./routes/eventRoutes"); 
app.use("/api/events",  eventRoutes);

//projectRoute Handlers 
const projectRoutes=require("./routes/projectRoutes"); 
app.use("/api/projects",projectRoutes);

const contactRoutes=require("./routes/contactRoutes");
app.use("/api/contacts",contactRoutes);


if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT=process.env.PORT || 5000 ;
app.listen(PORT,()=>{
    if (process.env.NODE_ENV!=="production")
    {
        console.log(`listening on port http://localhost:${PORT}/`);
        // require('child_process').exec('start http://localhost:5000/');
    }
    
});


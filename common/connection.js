const  mongoose  = require("mongoose")
const API_URL=  "mongodb+srv://prabupalani1999:Prabu1504@cluster0.evpzrew.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connect=()=>{
    mongoose.connect(API_URL)
    .then(()=>{
        console.log("mongDB connected.........")
    })
    .catch((err)=>{
        console.log("connection Error:",err.message)
    })
}
module.exports= connect;

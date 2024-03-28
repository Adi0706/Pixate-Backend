import mongoose from 'mongoose'

const connectionDB = (url)=>{
    mongoose.set('strictQuery',true);

    mongoose.connect(url)
    .then(function(){
        console.log("MongoDB database Connected !")
    })
    .catch(function(err){
        console.log(err)
    })
}

export default connectionDB ; 
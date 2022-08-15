const mongoose = require('mongoose');

const connectDB = async () =>{
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Successful database connection: ${conn.connection.host}. Ain't that swell?`.cyan.underline)
    }catch(error){
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB
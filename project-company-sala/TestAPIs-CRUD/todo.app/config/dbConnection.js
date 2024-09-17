const mongoose = require("mongoose");

const connectDb = async ()=>{
  try{
    console.log("Data",process.env.CONNECTION_STRING)
   const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("Database connected:",connect.connection.host)

  } catch(err){
  console.log(err);
  process.exit(1);
}
};

module.exports = connectDb;

import * as mongoose from 'mongoose';

async function connectToDatabase(): Promise<boolean> {
  mongoose.set('strictQuery', true);
  return await mongoose
    .connect('mongodb+srv://umar:GUjiNK4HFCLOg4BX@cluster0.gtovb.mongodb.net/olltv?retryWrites=true&w=majority')
    .then(() => {
      const msgType = `Mangoose`;
      const message = `Connection Mangoode:  has been established successfully.`;
      console.log(msgType, message);
      return true;
    })
    .catch((err: any) => {
      const errType = `Mangoose Error:`;
      const message = `Unable to connect to the database`;
      console.log(errType, message, err);
      return false;
    });
}

export { connectToDatabase };

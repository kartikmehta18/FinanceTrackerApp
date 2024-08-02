import  express ,{ Express }   from "express";
import mongoose from "mongoose";
import FinincialRecordRouter from "./routes/financial-records";
import cors from "cors";


const app: Express =express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

const mongoURI: string = "mongodb+srv://kartikmehta18:18%40June2004@financecluster.kkpwrxs.mongodb.net/?retryWrites=true&w=majority&appName=FinanceCluster"
// "mongodb+srv://kartikmehta18:18%40June2004@financecluster.kkpwrxs.mongodb.net/"
mongoose
.connect(mongoURI)
.then(() =>console.log("MongoDB connected"))
.catch((err) => console.log("MONGO NOT CONNECTED", err));


app.use("/financial-records",FinincialRecordRouter );

app.listen(port,() =>{
console.log(`Server is running on port ${port}`);    
});
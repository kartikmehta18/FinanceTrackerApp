import mongoose from "mongoose";
interface FinancialRecord {
    userID: string;
    date: Date;
    description: string;
    amount: number;
    category: string;
    paymentMethod: string;
}

const financialRecordSchema = new mongoose.Schema<FinancialRecord>({

        userID: {  type: String, required: true },
        date: { type: Date, required: true },
        description: {type: String, required: true},
        amount: {type: Number, required: true},
        category: {type: String, required: true},
        paymentMethod: {type: String, required: true},

        
});

const FinincialRecordModel = mongoose.model<FinancialRecord>("FinancialRecord",
financialRecordSchema
);

export default FinincialRecordModel;
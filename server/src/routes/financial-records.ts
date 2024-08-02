import express, { Request ,Response } from "express";
import FinincialRecordModel from "../schema/financial-record";

const router = express.Router();
//get
router.get("/getAllByUserID/:userID", async (req: Request, res: Response) => {
    try {
        const userId = req.params.userID;
        const records = await FinincialRecordModel.find({userID: userId});
        if (records.length === 0){
            return res.status(404).json({message: "No records found"});
        } 
        return res.status(200).json(records);
    } catch (error) {
        res.status(200).json(error);
    }
});
// post
router.post("/", async (req: Request, res: Response) => {
    try {
        const newRecordBody = req.body;
        const newRecord = await FinincialRecordModel.create(newRecordBody);
        const savedRecord = await newRecord.save();
        return res.status(200).json(savedRecord );
    } catch (error) {
        res.status(500).json(error);
    }
});

// update
router.put("/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const newRecordBody = req.body;
        const record = await FinincialRecordModel.findByIdAndUpdate(
            id,
            newRecordBody,
            { new: true}
        );
        if(!record){
            return res.status(404).send()
        }
         res.status(200).json(record);
    } catch (error) {
        res.status(500).json(error);
    }
});

// delete

router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        
        const record = await FinincialRecordModel.findByIdAndDelete(id);
        if(!record){
            return res.status(404).send()
        }
         res.status(200).json(record);
    } catch (error) {
        res.status(500).json(error);
    }
});
export default router;
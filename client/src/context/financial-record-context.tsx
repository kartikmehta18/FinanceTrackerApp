import { createContext, useState, useContext, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

export interface FinancialRecord {
    _id?: string;
    userID: string;
    date: Date;
    description: string;
    amount: number;
    category: string;
    paymentMethod: string;
}

interface FinancialRecordsContextType { 
    records:FinancialRecord[];
    addRecord: (record: FinancialRecord) => void;
    updateRecord: (id:string, newRecord:FinancialRecord) => void;
    delteRecord: (id:string) => void; 
}

export const FinincialRecordsContext = createContext<FinancialRecordsContextType | undefined>(undefined);


export const FinincialRecordsProvider = ({
    children,
} : {
    children : React.ReactNode;
}) => {

    const [records ,setRecords]= useState<FinancialRecord[]>([]);
    const{user} = useUser();

    // get all records
    const fetchRecords = async() =>{
        if (!user) return;
        // const response = await fetch(`http://localhost:3001/financial-records/getAllByUserID/${user.id}`
          const response = await fetch(`https://financetrackerapp.onrender.com/financial-records/getAllByUserID/${user.id}`

        );
       
            if (response.ok){
                const records = await response.json();
                console.log(records);
                setRecords(records);
           
        }
    }
    useEffect(() => {
        fetchRecords();
    }, [user]);

    // add record
    const addRecord =async (record: FinancialRecord) => {
    //    const response = await fetch("http://localhost:3001/financial-records",{
        const response = await fetch("https://financetrackerapp.onrender.com/financial-records",{
            method: "POST",
            body: JSON.stringify(record),
            headers: {
                "Content-Type": "application/json",
            },            
         });
         
         try {
         if (response.ok){
             const newRecord = await response.json();
             setRecords((prev) =>[...prev, newRecord]);
         }
        }catch (error) {
            console.log(error);
        }
    } ;

    // update record
    const updateRecord =async ( id: string ,newRecord: FinancialRecord) => {
        const response = await fetch(
            // `http://localhost:3001/financial-records/${id}`,
            `https://financetrackerapp.onrender.com/financial-records/${id}`,
            {
             method: "PUT",
             body: JSON.stringify(newRecord),
             headers: {
                 "Content-Type": "application/json",
             },            
          });
          
          try {
          if (response.ok){
              const newRecord = await response.json();
              setRecords((prev) =>
                prev.map((record) => {
                    if (record._id === id) {
                        return newRecord;
                    }  else{
                        return record;
                    }          
                })
                );
          }
         }catch (error) {
             console.log(error);
         }
     } ;

     // delte record
    const delteRecord =async (id: string) => {
        const response = await fetch(
            // `http://localhost:3001/financial-records/${id}`,
            `https://financetrackerapp.onrender.com/financial-records/${id}`,
            {
             method: "DELETE",
                       
          });
          
          try {
            if (response.ok){
                const delteRecord  = await response.json();
                setRecords((prev) =>
                    prev.filter((record) => record._id !== delteRecord._id)
                );
            }
           }catch (error) {
               console.log(error);
           }
     } ;
     return (<FinincialRecordsContext.Provider value={{records, addRecord, updateRecord,delteRecord}}>
         {""}
                  {children}
             </FinincialRecordsContext.Provider>
     );
};



// custom hook
export const useFincialRecords = () => {
    const context = useContext<FinancialRecordsContextType | undefined>(
        FinincialRecordsContext
    );
    if (!context) {
        throw new Error(
            "useFincialRecords must be used within a FinincialRecordsProvider"
        );
    }
    return context;
};
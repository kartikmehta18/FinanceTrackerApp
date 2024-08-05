import { useFincialRecords ,FinancialRecord} from "../../context/financial-record-context"
import {useTable, Column, CellProps, } from "react-table"

import React, { useMemo, useState } from "react";
import Foot from "../../Foot";
import { Link } from "react-router-dom";
// funcnal component
interface EditableCellProps extends CellProps<FinancialRecord> {
  updateRecord: (rowIndex: number, columnId: string, value: any) => void;
  editable: boolean;
}

const EditableCell : React.FC<EditableCellProps> =({value:initialValue, 
  row, 
  column, 
  updateRecord,
  editable}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);

  const onBlur = () =>{
    setIsEditing(false)
    updateRecord(row.index, column.id, value);
  
  }

  return( <div 
    onClick={() => editable && setIsEditing(true)}
    style={{ cursor: editable ? "pointer" : "default" }}
  >
  {isEditing ? (
  <input 
  value={value} 
  onChange={(e) =>setValue(e.target.value)} 
  autoFocus 
  onBlur={onBlur}
  style={{ width: "100%" }}
   />
  ): typeof value === "string"?(
  value
  ) : (
    value.toString()
  )}
  </div>
);
};

export const  FinancialRecordList= ()=> {
  const {records, updateRecord, delteRecord} = useFincialRecords();

  const updateCellRecord = (rowIndex: number, columnId: string, value: any) => {
    const id =records[rowIndex]._id;
    updateRecord(id ?? "", {...records[rowIndex] ,[columnId]: value})
  };

  const columns : Array<Column<FinancialRecord>> =useMemo(()=>[
    {
      Header: "Description",
      accessor: "description",
      Cell: (props) => (
        <EditableCell
          {...props}
          updateRecord={updateCellRecord }
          editable={true}
        />
      ),
    },
    {
      Header: "Amount",
      accessor: "amount",
      Cell: (props) => (
        <EditableCell
          {...props}
          updateRecord={updateCellRecord }
          editable={true}
        />
      ),
    },
    {
      Header: "Category",
      accessor: "category",
      Cell: (props) => (
        <EditableCell
          {...props}
          updateRecord={updateCellRecord }
          editable={true}
        />
      ),
    },
    {
      Header: "Payment Method",
      accessor: "paymentMethod",
      Cell: (props) => (
        <EditableCell
          {...props}
          updateRecord={updateCellRecord }
          editable={true}
        />
      ),
    },
    {
      Header: "Date",
      accessor: "date",
      Cell: (props) => (
        <EditableCell
          {...props}
          updateRecord={updateCellRecord }
          editable={false}
        />
      ),
    },
    {
      Header: "Delete",
      id: "delete",
      Cell: ({ row }) => (
        <button
          onClick={() => delteRecord(row.original._id ?? "")}
          className="button"
        >
          
          Delete
        </button>
      ),
    },
  ],
  [records]
);


  const{getTableBodyProps, getTableProps, headerGroups,rows, prepareRow} =
  useTable({
    columns,
    data: records
  });
  return (<>
    <div className="table-container">
    <table {...getTableProps()} className="table">
      <thead>
        {headerGroups.map((hg) => (
          <tr {...hg.getHeaderGroupProps()}>
            {hg.headers.map((column) => (
              <th {...column.getHeaderProps()}> {column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, idx) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
              ))}
            </tr>
          );
        })}
      </tbody>
      </table>
    </div>
    <hr className='chr'></hr>
    <div className="fo">Made by ❤️<Link to ="https://github.com/kartikmehta18" target="_blank"> kartikmehta18</Link></div>
    </>
  )
}

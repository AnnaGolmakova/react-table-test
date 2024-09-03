import React from "react";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowModel,
} from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { DocumentType } from "../model/DocumentType";
import { updateTableRow, deleteTableRow } from "../api/API";

interface DocumentTableProps {
  data: DocumentType[];
  userToken: string;
  onDataChange: () => void;
}

const DocumentTable: React.FC<DocumentTableProps> = ({
  data,
  userToken,
  onDataChange,
}) => {
  const handleRowUpdate = async (newRow: GridRowModel) => {
    const { id, ...fields } = newRow;
    if (id) {
      try {
        await updateTableRow(id.toString(), fields as DocumentType, userToken);
        onDataChange();
        return newRow;
      } catch (error) {
        console.error("Error updating row:", error);
        throw error;
      }
    }
    throw new Error("Row id is undefined");
  };

  const handleDeleteRow = async (id: string) => {
    try {
      await deleteTableRow(id, userToken);
      onDataChange();
    } catch (error) {
      console.error("Error deleting row:", error);
    }
  };

  const columns: GridColDef[] = [
    {
      field: "documentStatus",
      headerName: "Document Status",
      width: 150,
      editable: true,
    },
    {
      field: "employeeNumber",
      headerName: "Employee Number",
      width: 150,
      editable: true,
    },
    {
      field: "documentType",
      headerName: "Document Type",
      width: 150,
      editable: true,
    },
    {
      field: "documentName",
      headerName: "Document Name",
      width: 150,
      editable: true,
    },
    {
      field: "companySignatureName",
      headerName: "Company Signature",
      width: 180,
      editable: true,
    },
    {
      field: "employeeSignatureName",
      headerName: "Employee Signature",
      width: 180,
      editable: true,
    },
    {
      field: "employeeSigDate",
      headerName: "Employee Sig Date",
      width: 180,
      editable: true,
      type: "date",
      valueFormatter: (value) => {
        if (value) {
          const date = new Date(value);
          return date.toLocaleString("ru-RU", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          });
        }
        return "";
      },
      valueSetter: (value, row) => {
        const newDate = new Date(value).toISOString();
        return { ...row, employeeSigDate: newDate };
      },
    },
    {
      field: "companySigDate",
      headerName: "Company Sig Date",
      width: 180,
      editable: true,
      type: "date",
      valueFormatter: (value) => {
        if (value) {
          const date = new Date(value);
          return date.toLocaleString("ru-RU", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          });
        }
        return "";
      },
      valueSetter: (value, row) => {
        const newDate = new Date(value).toISOString();
        return { ...row, companySigDate: newDate };
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          onClick={() => handleDeleteRow(params.id.toString())}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <DataGrid
      rows={data}
      columns={columns}
      disableRowSelectionOnClick
      hideFooter
      processRowUpdate={handleRowUpdate}
      onProcessRowUpdateError={(error) => {
        console.error("Error processing row update:", error);
      }}
      sx={{
        "& .MuiDataGrid-columnHeaderTitle": {
          fontWeight: "bold",
        },
      }}
    />
  );
};

export default DocumentTable;

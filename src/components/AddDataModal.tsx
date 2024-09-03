import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ru";
import { DocumentType } from "../model/DocumentType";

dayjs.locale("ru");

interface AddDataModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (newDocument: DocumentType) => void;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const initialDocumentState: DocumentType = {
  documentStatus: "",
  employeeNumber: "",
  documentType: "",
  documentName: "",
  companySignatureName: "",
  employeeSignatureName: "",
  employeeSigDate: "",
  companySigDate: "",
};

const AddDataModal: React.FC<AddDataModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [newDocument, setNewDocument] =
    useState<DocumentType>(initialDocumentState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewDocument((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (open) {
      setNewDocument(initialDocumentState);
    }
  }, [open]);

  const handleDateChange = (name: string) => (date: Dayjs | null) => {
    if (date) {
      setNewDocument((prev) => ({ ...prev, [name]: date.toISOString() }));
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Format dates as ISO strings before submitting
    const formattedDocument = {
      ...newDocument,
      employeeSigDate: newDocument.employeeSigDate
        ? dayjs(newDocument.employeeSigDate).toISOString()
        : "",
      companySigDate: newDocument.companySigDate
        ? dayjs(newDocument.companySigDate).toISOString()
        : "",
    };
    onSubmit(formattedDocument);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="add-document-modal"
      aria-describedby="modal-to-add-new-document"
    >
      <Box sx={style}>
        <Typography
          id="add-document-modal"
          variant="h6"
          component="h2"
          gutterBottom
        >
          Add New Document
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                name="documentStatus"
                label="Document Status"
                value={newDocument.documentStatus}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                name="employeeNumber"
                label="Employee Number"
                value={newDocument.employeeNumber}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                name="documentType"
                label="Document Type"
                value={newDocument.documentType}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                name="documentName"
                label="Document Name"
                value={newDocument.documentName}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                name="companySignatureName"
                label="Company Signature Name"
                value={newDocument.companySignatureName}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                name="employeeSignatureName"
                label="Employee Signature Name"
                value={newDocument.employeeSignatureName}
                onChange={handleChange}
                fullWidth
                required
              />
              <DatePicker
                label="Employee Signature Date"
                value={
                  newDocument.employeeSigDate
                    ? dayjs(newDocument.employeeSigDate)
                    : null
                }
                onChange={handleDateChange("employeeSigDate")}
              />
              <DatePicker
                label="Company Signature Date"
                value={
                  newDocument.companySigDate
                    ? dayjs(newDocument.companySigDate)
                    : null
                }
                onChange={handleDateChange("companySigDate")}
              />
              <Button type="submit" variant="contained" color="primary">
                Add Document
              </Button>
            </Stack>
          </form>
        </LocalizationProvider>
      </Box>
    </Modal>
  );
};

export default AddDataModal;

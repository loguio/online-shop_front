import { Alert } from "@mui/material";

export const ErrorMessage = ({ message }: { message: string }) => {
  return <Alert severity="error">{message}</Alert>;
};

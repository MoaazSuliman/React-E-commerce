import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

export default function AlertDialog({ isOpen, onClose,dialogText }) {
  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            className="d-flex justify-content-center text-success fs-2 "
          >
          { dialogText}
          </DialogContentText>
        </DialogContent>
        <DialogActions className="d-flex justify-content-center ">
          <Button onClick={onClose} autoFocus>
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

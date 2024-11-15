import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import { useDeleteURL } from "../hooks/useDeleteURL";
import { CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";

interface DeleteUrlProps {
  id: string;
}

const DeleteUrl: React.FC<DeleteUrlProps> = ({ id }) => {
  const [open, setOpen] = React.useState(false);
  const { deleteExistingURL, loading } = useDeleteURL();
  const { t } = useTranslation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    setOpen(false);
    deleteExistingURL(id);
  };

  return (
    <React.Fragment>
      <Tooltip title="Edit">
        <IconButton onClick={handleClickOpen} color="error" aria-label="edit">
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {t("deleteConfirmation")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t("deleteWarning")}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{
              textTransform: "none",
              minWidth: 90,
            }}
          >
            {t("cancel")}
          </Button>
          <Button
            onClick={handleDelete}
            variant="outlined"
            disabled={loading}
            sx={{
              textTransform: "none",
              minWidth: 90,
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              t("delete")
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DeleteUrl;

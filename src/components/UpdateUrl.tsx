import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LinkIcon from "@mui/icons-material/Link";
import CloseIcon from "@mui/icons-material/Close";
import { useUpdateURL } from "../hooks";
import { useTranslation } from "react-i18next";

interface UpdateUrlProps {
  id: string;
  url: string;
}

const UpdateUrl: React.FC<UpdateUrlProps> = ({ id, url }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { updatedUrl, setUpdatedUrl, updateExistingURL } = useUpdateURL(url);
  const [error, setError] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
    setError("");
  };

  const handleClose = () => {
    setOpen(false);
    setError("");
    setUpdatedUrl(url);
  };

  const validateUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleEdit = async () => {
    if (!validateUrl(updatedUrl)) {
      setError("Please enter a valid URL");
      return;
    }

    setIsSubmitting(true);
    try {
      await updateExistingURL(id);
      setOpen(false);
    } catch (error) {
      setError("Failed to update URL. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isSubmitting) {
      handleEdit();
    }
  };

  return (
    <React.Fragment>
      <Tooltip title="Edit URL" arrow>
        <IconButton
          onClick={handleClickOpen}
          color="primary"
          aria-label="edit url"
          sx={{
            '&:hover': {
              backgroundColor: theme.palette.primary.main + '15',
            },
            transition: 'background-color 0.2s',
          }}
        >
          <EditIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen={fullScreen}
        maxWidth="md"
        PaperProps={{
          sx: {
            width: '600px', 
            maxWidth: '100%',
            borderRadius: 1,
            boxShadow: theme.shadows[10],
          },
        }}
      >
        <DialogTitle
          sx={{
            m: 0,
            p: 2,
            bgcolor: 'background.default',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h6" component="span">
            {t('editUrl')}
            </Typography>
          </Box>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'text.secondary',
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ py: 2, px: 3 }}>
          <TextField
            autoFocus
            label="URL"
            variant="outlined"
            value={updatedUrl}
            onChange={(e) => {
              setUpdatedUrl(e.target.value);
              setError("");
            }}
            onKeyPress={handleKeyPress}
            fullWidth
            error={!!error}
            helperText={error}
            size="medium"
            InputProps={{
              startAdornment: (
                <LinkIcon color="action" sx={{ mr: 1 }} />
              ),
            }}
          />
        </DialogContent>

        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{
              textTransform: 'none',
              minWidth: 90,
            }}
          >
            {t('cancel')}
          </Button>
          <Button
            onClick={handleEdit}
            variant="contained"
            disabled={isSubmitting || !updatedUrl.trim() || updatedUrl === url}
            sx={{
              textTransform: 'none',
              minWidth: 90,
            }}
          >
            {isSubmitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              t('save')
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default UpdateUrl;
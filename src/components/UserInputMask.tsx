import { useTranslation } from "react-i18next";
import { useShortenURL } from "../hooks/useShortenURL";
import {
  TextField,
  Box,
  Container,
  Paper,
  Typography,
  IconButton,
  InputAdornment,
  useTheme,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import LinkIcon from "@mui/icons-material/Link";
import { useGlobalContext } from "../context/GlobalContext";
import { BASE_URL } from "../services/apiServices";
import showToast from "../utils/showToast";

const UserInputMask = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { originalUrl, setOriginalUrl, shortenURL, loading } = useShortenURL();
  const { lastURL } = useGlobalContext();

  const handleTestURL = () => {
    if (lastURL) {
      window.open(`${BASE_URL}${lastURL.id}`, "_blank");
    }
  };

  const handleCopyURL = async () => {
    if (lastURL) {
      try {
        await navigator.clipboard.writeText(`${BASE_URL}${lastURL.id}`);
        showToast(t("url_copied"), "success");

      } catch (error) {
        console.error("Failed to copy the URL:", error);
        alert(t("copy_failed"));
      }
    }
  };

  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        minHeight="70vh"
        justifyContent="center"
      >
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            p: 4,
            borderRadius: 2,
            bgcolor: "background.paper",
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            align="center"
            sx={{
              fontWeight: "bold",
              mb: 3,
              color: theme.palette.primary.main,
            }}
          >
            {t("urlShortener")}
          </Typography>

          <form onSubmit={shortenURL}>
            <Box sx={{ mb: 4 }}>
              <TextField
                label={t("enterUrl")}
                variant="outlined"
                value={originalUrl || lastURL?.url || ""}
                fullWidth
                onChange={(e) => setOriginalUrl(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "56px",
                    fontSize: "1.1rem",
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LinkIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
              <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={loading}
                  loadingPosition="start"
                  startIcon={<SaveIcon />}
                  size="large"
                  sx={{
                    height: "48px",
                    px: 4,
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                  }}
                >
                  {t("shorten")}
                </LoadingButton>
              </Box>
            </Box>
          </form>

          {lastURL && (
            <Box
              sx={{
                mt: 4,
                pt: 4,
                borderTop: 1,
                borderColor: "divider",
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{ mb: 2, color: "text.secondary" }}
              >
                {t("shortened_url")}:
              </Typography>

              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <TextField
                  variant="outlined"
                  value={`${BASE_URL}${lastURL.id}`}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                    sx: {
                      bgcolor: "action.hover",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: theme.palette.primary.main,
                      },
                    },
                  }}
                />
                <IconButton
                  onClick={handleTestURL}
                  color="primary"
                  sx={{
                    bgcolor: "action.hover",
                    "&:hover": { bgcolor: "action.selected" },
                  }}
                >
                  <OpenInNewIcon />
                </IconButton>
                <IconButton
                  onClick={handleCopyURL}
                  color="primary"
                  sx={{
                    bgcolor: "action.hover",
                    "&:hover": { bgcolor: "action.selected" },
                  }}
                >
                  <ContentCopyIcon />
                </IconButton>
              </Box>
            </Box>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default UserInputMask;

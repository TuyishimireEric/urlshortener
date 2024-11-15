import React from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  Chip,
  useTheme,
  useMediaQuery,
  Tooltip,
  CircularProgress,
  Alert,
} from "@mui/material";
import { ShortenedURL } from "@/types/urls";
import useURLs from "../hooks/useURLs";
import DeleteUrl from "./DeleteUrl";
import UpdateUrl from "./UpdateUrl";
import { useGlobalContext } from "../context/GlobalContext";
import { useTranslation } from "react-i18next";

export default function AdminOverview() {
  const theme = useTheme();
  const { t } = useTranslation();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { loading, refetch } = useURLs();
  const { urls, error } = useGlobalContext();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatTTL = (seconds: number) => {
    if (seconds < 60) return `${seconds} seconds`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes`;
    return `${Math.floor(seconds / 3600)} hours`;
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box m={2}>
        <Alert severity="error">
          Error loading URLs. Please try again later.
        </Alert>
      </Box>
    );
  }

  return (
    <Paper sx={{ width: "100%", mb: 2, overflow: "hidden" }}>
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
        URL Shortener
      </Typography>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="URL management table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ fontWeight: "bold", bgcolor: "background.paper" }}
              >
                {t("id")}
              </TableCell>
              {!isMobile && (
                <>
                  <TableCell
                    sx={{ fontWeight: "bold", bgcolor: "background.paper" }}
                  >
                   {t("url")}
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold", bgcolor: "background.paper" }}
                  >
                   {t("ttl")}
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold", bgcolor: "background.paper" }}
                  >
                    {t("created")}
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold", bgcolor: "background.paper" }}
                  >
                    {t("modified")}
                  </TableCell>
                </>
              )}
              <TableCell
                sx={{ fontWeight: "bold", bgcolor: "background.paper" }}
                align="right"
              >
                {t("actions")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(urls || [])
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: ShortenedURL) => (
                <TableRow
                  key={row.id}
                  sx={{
                    "&:hover": { bgcolor: "action.hover" },
                    transition: "background-color 0.2s",
                  }}
                >
                  <TableCell component="th" scope="row">
                    <Typography
                      variant="body2"
                      sx={{ fontFamily: "monospace" }}
                    >
                      {row.id}
                    </Typography>
                  </TableCell>
                  {!isMobile && (
                    <>
                      <TableCell>
                        <Tooltip title={row.url} arrow>
                          <Typography
                            variant="body2"
                            sx={{
                              maxWidth: 250,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {row.url}
                          </Typography>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={formatTTL(row.ttlInSeconds || 0)}
                          size="small"
                          sx={{ bgcolor: "primary.main", color: "white" }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {formatDate(row.createdDate || "")}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {formatDate(row.modifiedDate || "")}
                        </Typography>
                      </TableCell>
                    </>
                  )}
                  <TableCell align="right">
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        justifyContent: "flex-end",
                      }}
                    >
                      <UpdateUrl id={row.id || ""} url={row.url || ""} />
                      <DeleteUrl id={row.id || ""} />
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={urls?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

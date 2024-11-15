import { useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";
import { Box, Stack, Tooltip, Typography, Switch, Button } from "@mui/material";

const LanguageSwitcher = () => {
  const {
    i18n: { language },
  } = useTranslation();
  const [currentLang, setCurrentLang] = useState(language);

  const toggleLanguage = () => {
    const newLang = currentLang === "en" ? "de" : "en";
    i18n.changeLanguage(newLang);
    setCurrentLang(newLang);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="primary.main"
      p={2}
      borderRadius={2}
    >
      <Tooltip
        title={currentLang === "en" ? "Sprache wechseln" : "Switch Language"}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography color="white" variant="body2">
            ENG
          </Typography>
          <Switch
            checked={currentLang === "de"}
            onChange={toggleLanguage}
            size="small"
            sx={{
              "& .MuiSwitch-track": {
                bgcolor: "grey.300",
              },
              "& .MuiSwitch-thumb": {
                bgcolor: "white",
              },
            }}
            inputProps={{ "aria-label": "language switch" }}
          />
          <Typography color="white" variant="body2">
            DE
          </Typography>
        </Stack>
      </Tooltip>
    </Box>
  );
};

export default LanguageSwitcher;

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      welcome: "Welcome",
      urlPlaceholder: "Enter your URL here",
      urlShortener: "URL Shortener",
      url_copied: "url copied successfully!",
      save: "Save",
      editUrl: "Edit URL",
      failedUpdateUrl: "Failed to update URL. Please try again.",
      enterValidUrl: "Please enter a valid URL.",
      deleteConfirmation: "Are you sure you want to delete this item?",
      delete: "Delete",
      cancel: "Cancel",
      shorten: "Shorten",
      enterUrl: "Enter URL",
      id: "ID",
      url: "URL",
      ttl: "TTL",
      created: "Created",
      modified: "Modified",
      actions: "Actions",
      rowsPerPage: "Rows per page",
      userInputMask: "User Input Mask",
      adminOverview: "Admin Overview",
      confirmDelete: "Are you sure you want to delete this item?",
      deleteWarning:
        "This action cannot be undone. Once deleted, the URL will be permanently removed.",
    },
  },
  de: {
    translation: {
      welcome: "Willkommen",
      urlPlaceholder: "Geben Sie hier Ihre URL ein",
      urlShortener: "URL-Kürzer",
      url_copied: "URL erfolgreich kopiert!",
      save: "Speichern",
      editUrl: "URL bearbeiten",
      failedUpdateUrl:
        "URL konnte nicht aktualisiert werden. Bitte versuchen Sie es erneut.",
      enterValidUrl: "Bitte geben Sie eine gültige URL ein.",
      deleteConfirmation:
        "Sind Sie sicher, dass Sie diesen Eintrag löschen möchten?",
      delete: "Löschen",
      cancel: "Abbrechen",
      shorten: "Verkürzen",
      enterUrl: "URL eingeben",
      id: "ID",
      url: "URL",
      ttl: "TTL",
      created: "Erstellt",
      modified: "Geändert",
      actions: "Aktionen",
      rowsPerPage: "Zeilen pro Seite",
      userInputMask: "Benutzereingabemaske",
      adminOverview: "Admin Übersicht",
      confirmDelete:
        "Sind Sie sicher, dass Sie dieses Element löschen möchten?",
      deleteWarning:
        "Diese Aktion kann nicht rückgängig gemacht werden. Nach dem Löschen wird die URL dauerhaft entfernt.",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;

import React from "react";
import { Snackbar } from "react-native-paper";

const ErrorSnackbar = ({ message, onDismiss }) => {
  return (
    <Snackbar
      visible={!!message}
      onDismiss={() => onDismiss("")}
      duration={5000}
      action={{
        label: "Okay",
        onPress: () => onDismiss(""),
      }}>
      {message}
    </Snackbar>
  );
};

export default ErrorSnackbar;

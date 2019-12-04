import React from "react";
import { View, Button, Image, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { Appbar } from "react-native-paper";
import { NavigationActions } from "react-navigation";

import AddingInput from "../components/AddingInput";
import TransparentButton from "../components/TransparentButton";
import ErrorSnackbar from "../components/ErrorSnackbar";
import { validateText } from "../helpers/validators";
import ROUTES from "../consts/routes";
import API from "../helpers/api";
import { uploadImageToFirebase, uploadPhotoFromGallery } from "../helpers/util";

class Adding extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      quantity: "",
      department: "",
      producer: "",
      market_adress: "",
      image: "",
      errors: {},
      isLoading: false,
      errorMessage: "",
    };
  }

  handleValueChange = (name, value) => this.setState({[name]: value});
    this.setState({
      [name]: value,
    });
  };

  handleBackPress = () => {
    this.props.navigation.dispatch(NavigationActions.back());
  };

  getErrorMessage = (field, fieldName, callback) => {
    if (!field) {
      callback(`${fieldName} is required`);
    } else if (!validateText(field)) {
      callback(`${fieldName} can not contain any special characters`);
    }
  };

  validateInputs = () => {
    const { name, quantity, department, producer, market_adress } = this.state;
    const errors = {};

    this.getErrorMessage(name, "Name", message => {
      errors.name = message;
    });

    this.getErrorMessage(department, "Department", message => {
      errors.department = message;
    });

    this.getErrorMessage(producer, "Producer", message => {
      errors.producer = message;
    });

    this.getErrorMessage(market_adress, "Market address", message => {
      errors.market_adress = message;
    });

    if (!quantity) {
      errors.quantity = "Queanity is required";
    } else if (isNaN(quantity)) {
      errors.quantity = "Queanity should be a number";
    }

    return errors;
  };

  handleErrorAppear = message => {
    this.setState({ errorMessage: message });
  };

  handleUploadImage = () => {
    uploadPhotoFromGallery()
      .then(photo => uploadImageToFirebase(photo.uri, "image/jpeg", photo.fileName))
      .then(url => this.setState({ image: url }))
      .catch(error => this.handleErrorAppear(error));
  };

  handleSubmitPress = async () => {
    const { name, quantity, department, producer, market_adress, image } = this.state;

    const errors = this.validateInputs();
    this.setState({ errors });

    if (Object.keys(errors).length !== 0) return;

    try {
      this.setState({ isLoading: true });

      await API.post("panel", {
        name,
        quantity,
        department,
        producer,
        market_adress,
        image,
      });

      this.props.navigation.navigate(ROUTES.LIST, { shouldUpdate: true });
    } catch ({ message }) {
      this.setState({ errorMessage: message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const {
      name,
      quantity,
      department,
      producer,
      market_adress,
      image,
      errors,
      isLoading,
      errorMessage,
    } = this.state;

    return (
      <View style={styles.backgroundContainer}>
        <Appbar style={styles.appbar}>
          <Appbar.BackAction onPress={this.handleBackPress} />
          <Appbar.Content title="Adding a panel" />
        </Appbar>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
            <AddingInput
              style={styles.input}
              name="name"
              value={name}
              onValueChange={this.handleValueChange}
              errorMessage={errors.name}
            />
            <AddingInput
              style={styles.input}
              numeric
              name="quantity"
              value={quantity}
              onValueChange={this.handleValueChange}
              errorMessage={errors.quantity}
            />
            <AddingInput
              style={styles.input}
              name="department"
              value={department}
              onValueChange={this.handleValueChange}
              errorMessage={errors.department}
            />
            <AddingInput
              style={styles.input}
              name="producer"
              value={producer}
              onValueChange={this.handleValueChange}
              errorMessage={errors.producer}
            />
            <AddingInput
              style={styles.input}
              name="market_adress"
              value={market_adress}
              onValueChange={this.handleValueChange}
              errorMessage={errors.market_adress}
            />
            <Button title="Upload image" onPress={this.handleUploadImage} />
            {!!image && <Image style={{ width: 70, height: 100 }} source={{ uri: image }} />}
            <View style={styles.bottom}>
              {isLoading ? (
                <ActivityIndicator color="#fff" size="large" />
              ) : (
                <TransparentButton
                  style={styles.submit}
                  text="Submit"
                  onPress={this.handleSubmitPress}
                />
              )}
            </View>
          </View>
        </ScrollView>
        <ErrorSnackbar message={errorMessage} onDismiss={this.handleErrorAppear} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    backgroundColor: "#111",
  },

  appbar: {
    width: "100%",
    backgroundColor: "black",
  },

  container: {
    flex: 1,
    paddingHorizontal: "5%",
    paddingTop: "3%",
  },

  input: {
    marginTop: 8,
  },

  bottom: {
    flex: 1,
    justifyContent: "flex-end",
  },
});

export default Adding;

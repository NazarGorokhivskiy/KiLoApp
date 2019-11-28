import React from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Snackbar } from "react-native-paper";

import TransparentButton from "../components/TransparentButton";
import emptyImage from "../images/empty.jpg";
import ErrorSnackbar from "../components/ErrorSnackbar";
import bgImage from "../images/profile_bg.jpg";
import { uploadImageToFirebase, uploadPhotoFromGallery, getFirebaseUser } from "../helpers/util";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isInEditMode: false,
      userName: "",
      email: "",
      photoURL: "",
      snackbarMessage: "",
    };
  }

  uploadPhoto = () => {
    uploadPhotoFromGallery()
      .then(photo => uploadImageToFirebase(photo.uri, "image/jpeg", photo.fileName))
      .then(resultURL => getFirebaseUser().updateProfile({ photoURL: resultURL }))
      .then(() => {
        this.setState({ photoURL: getFirebaseUser().photoURL });
      })
      .catch(() => handleErrorAppear(console.error));
  };

  handleInputChange = (name, value) => this.setState({ [name]: value });

  handleEditButtonPress = () => this.setState({ isInEditMode: true });

  handleSaveProfile = () => {
    const { userName, email } = this.state;

    getFirebaseUser().updateEmail(email);
    getFirebaseUser().updateProfile({ displayName: userName });

    this.setState({ isInEditMode: false });
  };

  handleErrorAppear = message => {
    this.setState({ snackbarMessage: message });
  };

  renderProfileContent = (isInEditMode, { userName, email, photoURL }) => {
    return isInEditMode ? (
      <React.Fragment>
        <TouchableWithoutFeedback onPress={this.uploadPhoto}>
          <View>
            <Image source={photoURL ? { uri: photoURL } : emptyImage} style={styles.avatar} />
            <Icon style={styles.selectImageIcon} name="upload" size={25} color="black" />
          </View>
        </TouchableWithoutFeedback>
        <TextInput
          style={styles.titleInput}
          value={userName}
          onChangeText={value => this.handleInputChange("userName", value)}
        />
        <TextInput
          style={styles.subtitleInput}
          value={email}
          onChangeText={value => this.handleInputChange("email", value)}
        />
      </React.Fragment>
    ) : (
      <React.Fragment>
        <Image source={photoURL ? { uri: photoURL } : emptyImage} style={styles.avatar} />
        <Text style={styles.title}>{userName}</Text>
        <Text style={styles.subtitle}>{email}</Text>
      </React.Fragment>
    );
  };

  componentDidMount() {
    const user = getFirebaseUser();

    this.setState({
      userName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    });
  }

  render() {
    const { isInEditMode, snackbarMessage } = this.state;

    return (
      <ImageBackground source={bgImage} style={styles.backgroundContainer}>
        <View style={styles.backgroundDarkFilter}>
          <View style={styles.container}>
            {this.renderProfileContent(isInEditMode, {
              userName,
              email,
              photoURL,
            })}
          </View>
          <TransparentButton
            style={styles.editButton}
            text={isInEditMode ? "Save profile" : "Edit profile"}
            onPress={isInEditMode ? this.handleSaveProfile : this.handleEditButtonPress}
          />
          <ErrorSnackbar message={snackbarMessage} onDismiss={this.handleErrorAppear} />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundContainer: {
    width: "100%",
    height: "100%",
  },

  backgroundDarkFilter: {
    flex: 1,
    backgroundColor: "rgba(0,0,0, .7)",
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: "white",
  },

  title: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },

  subtitle: {
    marginTop: 10,
    fontSize: 20,
    color: "white",
  },

  selectImageContainer: {
    position: "relative",
  },

  selectImageIcon: {
    position: "absolute",
    backgroundColor: "yellow",
    padding: 10,
    right: 15,
    bottom: 15,
    borderRadius: 5,
  },

  titleInput: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },

  subtitleInput: {
    fontSize: 20,
    color: "white",
    textDecorationLine: "underline",
  },

  editButton: {
    marginHorizontal: 10,
    marginBottom: 20,
  },
});

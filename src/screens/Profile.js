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
import ImagePicker from "react-native-image-picker";

import TransparentButton from "../components/TransparentButton";
import emptyImage from "../images/empty.jpg";
import firebase from "../config/fbConfig";
import bgImage from "../images/profile_bg.jpg";
import { uploadImageToFirebase } from "../helpers/fileWorkers";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isInEditMode: false,
      userName: "",
      email: "",
      photoURL: "",
    };
  }

  uploadPhoto = () => {
    ImagePicker.launchImageLibrary(
      {
        noData: true,
      },
      photo => {
        if (photo.uri) {
          uploadImageToFirebase(photo.uri, "image/jpeg", photo.fileName)
            .then(resultURL =>
              firebase.auth().currentUser.updateProfile({
                photoURL: resultURL,
              }),
            )
            .then(() => {
              this.setState({ photoURL: firebase.auth().currentUser.photoURL });
            })
            .catch(console.error);
        }
      },
    );
  };

  handleChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  handleEditButtonPress = () => this.setState({ isInEditMode: true });

  handleSaveProfile = () => {
    const { userName, email, photoURL } = this.state;

    firebase.auth().currentUser.updateEmail(email);
    firebase.auth().currentUser.updateProfile({ displayName: userName });

    this.setState({ isInEditMode: false });
  };

  componentDidMount() {
    const user = firebase.auth().currentUser;

    this.setState({
      userName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    });
  }

  render() {
    const { isInEditMode, userName, email, photoURL } = this.state;

    return (
      <ImageBackground source={bgImage} style={styles.backgroundContainer}>
        <View style={styles.backgroundDarkFilter}>
          <View style={styles.container}>
            {isInEditMode ? (
              <React.Fragment>
                <TouchableWithoutFeedback onPress={this.uploadPhoto}>
                  <View>
                    <Image
                      source={photoURL ? { uri: photoURL } : emptyImage}
                      style={styles.avatar}
                    />
                    <Icon
                      style={styles.selectImageIcon}
                      name="upload"
                      size={25}
                      color="black"
                    />
                  </View>
                </TouchableWithoutFeedback>
                <TextInput
                  style={styles.titleInput}
                  value={userName}
                  onChangeText={value => this.handleChange("userName", value)}
                />
                <TextInput
                  style={styles.subtitleInput}
                  value={email}
                  onChangeText={value => this.handleChange("email", value)}
                />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Image
                  source={photoURL ? { uri: photoURL } : emptyImage}
                  style={styles.avatar}
                />
                <Text style={styles.title}>{userName}</Text>
                <Text style={styles.subtitle}>{email}</Text>
              </React.Fragment>
            )}
          </View>
          <TransparentButton
            style={styles.editButton}
            text={isInEditMode ? "Save profile" : "Edit profile"}
            onPress={
              isInEditMode ? this.handleSaveProfile : this.handleEditButtonPress
            }
          />
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

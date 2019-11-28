import { Platform, PlatformIOSStatic } from "react-native";
import RNFetchBlob from "react-native-fetch-blob";
import ImagePicker from "react-native-image-picker";

import firebase from "../config/fbConfig";

const fs = RNFetchBlob.fs;

window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = RNFetchBlob.polyfill.Blob;
window.fetch = new RNFetchBlob.polyfill.Fetch({
  auto: true,
  binaryContentTypes: ["image/", "video/", "audio/", "foo/"],
}).build();

// Uploads image file to firebase storage
export const uploadImageToFirebase = async (
  uri,
  mime = "image/jpeg",
  fileName
) => {
  let uploadBlob = null;

  const uploadUri =
    Platform.OS == PlatformIOSStatic.OS ? uri.replace("file://", "") : uri;

  const imageRef = firebase.storage().ref(`/images/${fileName}`);

  return fs
    .readFile(uploadUri, "base64")
    .then(data => Blob.build(data, { type: `${mime};BASE64` }))
    .then(blob => {
      uploadBlob = blob;
      return imageRef.put(blob, { contentType: mime, name: fileName });
    })
    .then(() => {
      uploadBlob.close();
      return imageRef.getDownloadURL();
    });
};

export const uploadPhotoFromGallery = () =>
  new Promise((resolve, reject) => {
    ImagePicker.launchImageLibrary(
      {
        noData: true,
      },
      photo => {
        if (photo.uri) {
          resolve(photo);
        }

        reject(photo.error);
      }
    );
  });

export const getFirebaseUser = () => firebase.auth().currentUser;

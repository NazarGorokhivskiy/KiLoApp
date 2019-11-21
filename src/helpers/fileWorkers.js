import RNFetchBlob from "react-native-fetch-blob";
import firebase from "../config/fbConfig";

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

export const uploadImageToFirebase = (uri, mime = "image/jpeg", name) =>
  new Promise((resolve, reject) => {
    let imgUri = uri;
    let uploadBlob = null;
    const uploadUri =
      Platform.OS === "ios" ? imgUri.replace("file://", "") : imgUri;

    const imageRef = firebase.storage().ref(`/images/${name}`);

    fs.readFile(uploadUri, "base64")
      .then(data => {
        return Blob.build(data, { type: `${mime};BASE64` });
      })
      .then(blob => {
        uploadBlob = blob;
        return imageRef.put(blob, { contentType: mime, name: name });
      })
      .then(() => {
        uploadBlob.close();
        return imageRef.getDownloadURL();
      })
      .then(url => {
        resolve(url);
      })
      .catch(error => {
        reject(error);
      });
  });

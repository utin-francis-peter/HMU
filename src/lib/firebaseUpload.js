import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./firebaseConfig";

const firebaseUpload = async (file) => {
  try {
    const fileRef = ref(storage, `images/${new Date() + file?.name}`);
    const uploadTask = uploadBytesResumable(fileRef, file);

    // await the upload process and listen to state changes
    await new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`upload is ${progress}% done`);

          // reacting to state changes in snapshot
          switch (snapshot.state) {
            case "paused":
              console.log("upload paused");
              break;

            case "running":
              console.log("upload is running");
              break;
          }
        },

        (error) => {
          switch (error.code) {
            case "storage/unauthorized":
              reject(
                new Error(`User doesn't have permission to access the object`)
              );
              break;

            case "storage/canceled":
              reject(new Error("User canceled the upload"));
              break;

            case "storage/unknown":
              reject(new Error("Unknown error occurred"));
              breaks;
          }
        },

        () => {
          resolve(uploadTask.snapshot.ref);
        }
      );
    });

    // upon successful upload, get the download URL and return it from the function
    const downloadURL = await getDownloadURL(fileRef);
    console.log(`File available for download at ${downloadURL}`);

    return downloadURL;
  } catch (error) {
    console.error("There was an error uploading the file:", error.message);
  }
};

export default firebaseUpload;

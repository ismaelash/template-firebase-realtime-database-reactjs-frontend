// https://firebase.google.com/docs/database/web/read-and-write
// https://firebase.google.com/docs/database/web/lists-of-data

import * as FirebaseApp from "firebase/app";
import * as FirebaseDatabase from "firebase/database";

const FIREBASE_CONFIG = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};

FirebaseApp.initializeApp(FIREBASE_CONFIG);
const FIREBASE_DATABASE = FirebaseDatabase.getDatabase();

export function createOrUpdateData(pathOnDatabase, data, callback) {
  const PATH_REF = FirebaseDatabase.ref(FIREBASE_DATABASE, pathOnDatabase);
  FirebaseDatabase.set(PATH_REF, data)
    .then(() => {
      const DATA_COMPLETE = { ...data, key: PATH_REF.key };
      callback(null, DATA_COMPLETE);
    })
    .catch((error) => {
      callback(error, null);
    });
}

export function createItemToList(pathOnDatabase, data, callback) {
  const PATH_REF = FirebaseDatabase.ref(FIREBASE_DATABASE, pathOnDatabase);
  const ITEM_REF = FirebaseDatabase.push(PATH_REF);
  FirebaseDatabase.set(ITEM_REF, data)
    .then(() => {
      const DATA_COMPLETE = { ...data, key: ITEM_REF.key };
      callback(null, DATA_COMPLETE);
    })
    .catch((error) => {
      callback(error, null);
    });
}

export function listenChangeData(pathOnDatabase, callback) {
  const PATH_REF = FirebaseDatabase.ref(FIREBASE_DATABASE, pathOnDatabase);
  FirebaseDatabase.onValue(PATH_REF, (snapshot) => {
    const DATA = snapshot.val();
    callback(DATA);
  });
}

export function readData(pathOnDatabase, callback) {
  const PATH_REF = FirebaseDatabase.ref(FIREBASE_DATABASE, pathOnDatabase);
  FirebaseDatabase.get(PATH_REF)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const DATA = snapshot.val();
        callback(null, DATA);
      } else {
        callback("No data available", null);
      }
    })
    .catch((error) => {
      callback(error, null);
    });
}

export function deleteData(pathOnDatabase, callback) {
  createOrUpdateData(pathOnDatabase, null, (error, data) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, null);
    }
  });
}
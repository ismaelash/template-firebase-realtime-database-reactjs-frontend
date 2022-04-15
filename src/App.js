import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import * as FirebaseController from "./components/firebaseController";

function App() {
  const [dataReceived, setDataReceived] = useState("");
  const [data, setData] = useState("");
  const [dataIsJson, setDataIsJson] = useState(false);
  const [pathOnDB, setPathOnDB] = useState("/users/ismaelash/");

  // useEffect(() => {
  //   FirebaseController.listenChangeData(pathOnDB, (data) => {
  //     console.log("listenChangeData:", data);
  //   });
  // }, []);

  function createOrUpdateData() {
    console.log(data.trim())
    const DATA = dataIsJson ? JSON.parse(data.trim()) : data
    FirebaseController.createOrUpdateData(pathOnDB, DATA, (error, data) => {
      if (error) {
        console.error(error);
        return;
      }

      console.log("createOrUpdateData", data);
    });
  }

  function createItemToList(){
    const DATA = dataIsJson ? JSON.parse(data) : data
    FirebaseController.createItemToList(pathOnDB, DATA, (error, data) => {
      if (error) {
        console.error(error);
        return;
      }

      console.log("createItemToList", data);
    });
  }

  function readData() {
    FirebaseController.readData(pathOnDB, (error, data) => {
      if (error) {
        console.error(error);
        return;
      }

      console.log("readData", data);
      setDataReceived(data);
    });
  }

  function deleteData() {
    FirebaseController.deleteData(pathOnDB, (error, data) => {
      if (error) {
        console.error(error);
        return;
      }

      console.log("deleteData", data);
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <textarea
          placeholder="pathOnDB"
          onChange={(event) => setPathOnDB(event.target.value)}
        />
        <textarea
          placeholder="data"
          onChange={(event) => setData(event.target.value)}
        />
        <span>On get data: {JSON.stringify(dataReceived)}</span>
        <br />
        <small>Data is json?</small>
        <input type="checkbox" onChange={(event) => setDataIsJson(event.target.checked)}/>
        <br />
        <button onClick={createOrUpdateData}>Create or update data</button>
        <br />
        <button onClick={createItemToList}>Create Item to List data</button>
        <br />
        <button onClick={readData}>Read data</button>
        <br />
        <button onClick={deleteData}>Delete data</button>
      </header>
    </div>
  );
}

export default App;

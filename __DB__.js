import SQLite from "react-native-sqlite-storage";

const DB = SQLite.openDatabase({
  name: "mainDB",
  location: "default"
},
  () => { console.warn("DB CONNECTION SECURED") },
  e => {
    console.warn("Error securing DB connection")
  }
);

export default DB;
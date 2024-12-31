import axios from "axios";

const sapHanaBackend = axios.create({
  baseURL: "http://192.168.10.81:8000",
});

export default sapHanaBackend;

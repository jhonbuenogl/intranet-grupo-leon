import axios from "axios";

const sapHanaBackend = axios.create({
  baseURL: "http://localhost:8000",
});

export default sapHanaBackend;

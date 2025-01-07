import axios from "axios";

const sapHanaBackend = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8000"
      : "http://192.168.10.81:8000",
});

export default sapHanaBackend;

import axios from "axios";

const instance = axios.create({
    baseURL: "https://burger-builder-react-app-d211b.firebaseio.com/"
});

export default instance;
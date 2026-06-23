import axios from "axios";

export default async function GetUser() {
    try {
        const res = await axios.get("http://localhost:3000/auth/get-user", { withCredentials: true });
        console.log(res.data.user)
        return res.data.user;
    } catch (err) {
        console.error("Error fetching user:", err);
        return null;
    }
}
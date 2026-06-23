import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ValidateSession() {
      const [loading, setLoading] = useState(true);
      const navigate = useNavigate();
      useEffect(() => {
        async function checkAuth() {
            try {
            await axios.get("http://localhost:3000/auth/check-session", { withCredentials: true });
            console.log("Authorized Successfully");
            setLoading(false);
            } catch (err) {
            console.log("Unauthorized");
            navigate("/Auth");
            }
        }
        checkAuth();
      }, []);
      
      return loading;
    
}

export default ValidateSession;
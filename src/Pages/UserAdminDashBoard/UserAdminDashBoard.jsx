import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";


const UserAdminDashBoard = () => {
    const { user } = useContext(AuthContext);
    
    return (
        <div>
            <h1>hi</h1>
        </div>
    );
};

export default UserAdminDashBoard;
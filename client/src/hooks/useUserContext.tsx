import { useContext } from "react";
import UserContext from "../contexts/userContext";

const useUserContext = () => {
    return useContext(UserContext);
}

export default useUserContext;
import { useSelector } from "react-redux"

const { Navigate } = require("react-router-dom")
const { selectUserAuthentificated } = require("redux/auth/authSlice")

const PrivateRoute = ({children, redirectTo ='/'}) => {
    const authentificated = useSelector(selectUserAuthentificated)

    return authentificated ? children : <Navigate to={redirectTo} />
}

export default PrivateRoute
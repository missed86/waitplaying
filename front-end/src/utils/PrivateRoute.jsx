import { Route } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
  console.log("🚀 ~ file: PrivateRoute.js:4 ~ PrivateRoute ~ PrivateRoute", "Private route works")
	return <Route {...rest}>{children}</Route>;
};

export default PrivateRoute
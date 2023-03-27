import { Outlet, Link } from "react-router-dom";

const NotFound = () => {


    return (
        <div>
            <h1>There;s noting here!</h1>
            <Link to="/">
              Back to Home
            </Link>
        </div>

    );

}

export default NotFound
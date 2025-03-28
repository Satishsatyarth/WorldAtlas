import { NavLink, useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const errorPage = useRouteError();

    return (
        <div>
            <h1>Oops! An error occurred.</h1>
            {errorPage && <p>{errorPage.data || "An unknown error occurred."}</p>}
            
            <NavLink to="/">
                <button>Go Home</button>
            </NavLink>
        </div>
    );
}

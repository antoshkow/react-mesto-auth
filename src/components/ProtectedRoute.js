import { Route, Redirect } from "react-router-dom";
import Preloader from './Preloader';

function ProtectedRoute({ component: Component, ...props }) {
  return (
    <Route>
      { props.isChecking ? (
        <main className="page">
          <Preloader />
        </main>
      ) : (
        props.isLoggedIn ? <Component {...props}/> : <Redirect to="/sign-in" />
      )}
    </Route>
  );
}

export default ProtectedRoute;

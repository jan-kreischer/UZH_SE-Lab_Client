import Header from "components/views/Header";
import AppRouter from "components/routing/routers/AppRouter";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";

const App = () => {
  return (
    <div>
        <BrowserRouter>
            <Header height="100"/>
            <AppRouter/>
        </BrowserRouter>
    </div>
  );
};

export default App;

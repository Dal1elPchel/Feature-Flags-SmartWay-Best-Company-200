import { Routes, Route } from "react-router-dom";
import Header from "./layouts/Header/Header.tsx"
import LoginPage from "./pages/LoginPage/loginPage.tsx";
import PrivateRoute from "./Routes/PrivateRoute.tsx";
import MainLayout from "./layouts/MainLayout/MainLayout.tsx";

function App() {


  return (
    <>
        <Routes>
            <Route path={"/login"} element={<LoginPage/>}/>
            <Route element={<PrivateRoute/>}>
                <Route element={<MainLayout/>}>
                    <Route path={"/"} element={<></>}/>
                </Route>
            </Route>
        </Routes>

    </>
  );
}

export default App;
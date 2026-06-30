import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/loginPage.tsx";
import PrivateRoute from "./Routes/PrivateRoute.tsx";
import MainLayout from "./layouts/MainLayout/MainLayout.tsx";
import AddPage from "./pages/AddPage/AddPage.tsx";
import TablePage from "./pages/TablePage/TablePage.tsx";
import FlagCardPage from "./pages/FlagCardPage/FlagCardPage.tsx";

function App() {


  return (
    <>
        <Routes>
            <Route path={"/login"} element={<LoginPage/>}/>
            <Route element={<PrivateRoute/>}>
                <Route element={<MainLayout/>}>
                    <Route path={"/"} element={<TablePage/>}/>
                    <Route path={"/add"} element={<AddPage/>}/>
                    <Route path={"/flags/:id"} element={<FlagCardPage/>}/>
                </Route>
            </Route>
        </Routes>

    </>
  );
}

export default App;
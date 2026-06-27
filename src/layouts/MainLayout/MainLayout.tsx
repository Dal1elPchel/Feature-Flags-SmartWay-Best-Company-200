import Header from "../Header/Header.tsx";
import {Outlet} from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar.tsx";

const MainLayout = () => {
    return (
        <>
            <Header />
            <Sidebar/>

            <main>
                <Outlet/>
            </main>
        </>
    );
};

export default MainLayout;
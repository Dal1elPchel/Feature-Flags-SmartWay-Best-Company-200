import Header from "../Header/Header.tsx";
import {Outlet} from "react-router-dom";

const MainLayout = () => {
    return (
        <>
            <Header />

            <main>
                <Outlet/>
            </main>
        </>
    );
};

export default MainLayout;
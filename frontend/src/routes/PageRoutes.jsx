import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserHome from "../pages/User/UserHome";
import UserSupportPage from "../pages/User/UserSupportPage";

function PageRoutes() {
    return (
        <Routes>
            <Route path="/UserHome" element={<UserHome />} />
            <Route path="/UserSupportPage" element={<UserSupportPage />} />
        </Routes>
    );
}

export default PageRoutes;
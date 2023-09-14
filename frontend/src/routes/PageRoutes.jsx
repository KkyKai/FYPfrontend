import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserHome from "../pages/User/UserHome";
import UserSupportPage from "../pages/User/UserSupportPage";
import UserFAQPage from "../pages/User/UserFAQPage";
import UserSettingPage from "../pages/User/UserSettingPage";
import Testing from "../pages/User/Testing";

function PageRoutes() {
    return (
        <Routes>
            <Route path="/UserHome" element={<UserHome />} />
            <Route path="/UserSupportPage" element={<UserSupportPage />} />
            <Route path="/UserFAQPage" element={<UserFAQPage />} />
            <Route path="/UserSettingPage" element={<UserSettingPage />} />
            <Route path="/Testing" element={<Testing />} /> 
        </Routes>
    );
}

export default PageRoutes;
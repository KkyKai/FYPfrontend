import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserHome from "../pages/User/UserHome";
import UserSupportPage from "../pages/User/UserSupportPage";
import UserFAQPage from "../pages/User/UserFAQPage";
import UserSettingPage from "../pages/User/UserSettingPage";
import Testing from "../pages/User/Testing";
import UserSubscriptionPlans from "../pages/User/UserSubscriptionPlans";
import UserTermsAndConditions from "../pages/User/UserTermsAndConditions";

function PageRoutes() {
    return (
        <Routes>
            <Route path="/" element={<UserHome />} />
            <Route path="/UserHome" element={<UserHome />} />
            <Route path="/UserSupportPage" element={<UserSupportPage />} />
            <Route path="/UserFAQPage" element={<UserFAQPage />} />
            <Route path="/UserSettingPage" element={<UserSettingPage />} />
            <Route path="/Testing" element={<Testing />} /> 
            <Route path="/UserSubscriptionPlans" element={<UserSubscriptionPlans />} />
            <Route path="/UserTermsAndConditions" element={<UserTermsAndConditions />} />
        </Routes>
    );
}

export default PageRoutes;
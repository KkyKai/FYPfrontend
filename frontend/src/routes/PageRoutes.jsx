import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserHome from "../pages/User/UserHome";
import UserSupportPage from "../pages/User/UserSupportPage";
import UserFAQPage from "../pages/User/UserFAQPage";
import UserSettingPage from "../pages/User/UserSettingPage";
import Testing from "../pages/User/Testing";
import UserSubscriptionPlans from "../pages/User/UserSubscriptionPlans";
import UserTermsAndConditions from "../pages/User/UserTermsAndConditions";
import AdminHome from "../pages/Admin/AdminHome";
import CustomerServiceOfficerHome from "../pages/CustomerServiceOfficer/CustomerServiceOfficerHome";
import OwnerHome from "../pages/Owner/OwnerHome";

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
            <Route path="/AdminHome" element={<AdminHome />} />
            <Route path="/CustomerServiceOfficerHome" element={<CustomerServiceOfficerHome />} />
            <Route path="/OwnerHome" element={<OwnerHome />} />
        </Routes>
    );
}

export default PageRoutes;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserHome from "../pages/User/UserHome";
import UserSupportPage from "../pages/User/UserSupportPage";
import UserSubscriptionPlans from "../pages/User/UserSubscriptionPlans";
import UserTermsAndConditions from "../pages/User/UserTermsAndConditions";

function PageRoutes() {
    return (
        <Routes>
            <Route path="/UserHome" element={<UserHome />} />
            <Route path="/UserSupportPage" element={<UserSupportPage />} />
            <Route path="/UserSubscriptionPlans" element={<UserSubscriptionPlans />} />
            <Route path="/UserTermsAndConditions" element={<UserTermsAndConditions />} />
        </Routes>
    );
}

export default PageRoutes;
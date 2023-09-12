import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserHome from "../pages/User/UserHome";

function PageRoutes() {
    return (
        <Routes>
            <Route path="/UserHome" element={<UserHome />} />
        </Routes>
    );
}

export default PageRoutes;
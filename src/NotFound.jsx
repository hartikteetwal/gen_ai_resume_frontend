import { useNavigate } from "react-router";
import { FiArrowLeft, FiSearch } from "react-icons/fi";
import "./features/interview/style/home.scss";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <main className="home">
            <div className="interview-card">
                <div className="header">
                    <div className="header-left">
                        <h1>
                            <FiSearch /> Page Not Found
                        </h1>
                        <p>
                            The page you are looking for doesn’t exist or has been moved.
                            Use the button below to return to the dashboard.
                        </p>
                    </div>
                </div>

                <div className="form-layout notfound-layout">
                    <div className="form-section" style={{ maxWidth: 560 }}>
                        <div className="field-card notfound-card">
                            <h2 style={{ color: "#fff", marginBottom: "1rem" }}>404</h2>
                            <p style={{ color: "#cbd5e1", marginBottom: "1.5rem" }}>
                                This route is not available. Please go back to the interview home page.
                            </p>
                            <button className="button primary-button" onClick={() => navigate("/")}>
                                <FiArrowLeft /> Go Home
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default NotFound;

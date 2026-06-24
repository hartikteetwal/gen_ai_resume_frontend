import React, { useRef, useState } from "react";
import {
    FiFileText,
    FiUploadCloud,
    FiUser,
    FiZap,
    FiList,
    FiLogOut,
} from "react-icons/fi";

import { BsStars } from "react-icons/bs";

import "../style/home.scss";
import { useInterview } from "../hooks/useInterview";
import { useNavigate } from "react-router";
import { useAuth } from "../../auth/hooks/useAuth";

const Home = () => {

    const { generateReport, loading } = useInterview()
    const { handleLogout } = useAuth()
    const [selfDescription, setSelfDescription] = useState("")
    const [jobDescription, setJobDescription] = useState("")
    const resumeInputRef = useRef()
    const navigate = useNavigate()

    const HandleLogout = () => {
        handleLogout()
        navigate("/")
    }

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current.files[0]
        const data = await generateReport({ resumeFile, jobDescription, selfDescription })
        navigate(`/interview/${data._id}`)
    }

    if (loading) {
        return (
            <main className="reports-container">
                <div className="loading-screen">
                    <div className="loading-spinner"></div>
                    <h1>Loading your interview prepare...</h1>
                    <p>Please wait while we preparing your report</p>
                </div>
            </main>
        )
    }

    return (
        <main className="home">
            <div className="interview-card">

                <div className="header">
                    <div className="header-left">
                        <h1>
                            <FiZap />
                            AI Interview Report Generator
                        </h1>

                        <p>
                            Upload your resume, provide a self-description, and paste the job
                            description to generate a personalized interview report.
                        </p>
                    </div>

                    <button
                        className="history-button"
                        onClick={() => navigate("/interview")}
                    >
                        <FiList />
                        <span>View History</span>
                    </button>
                    <button
                        className="logout-button primary-button button"
                        onClick={() => HandleLogout()}
                    >
                        <FiLogOut />
                        <span>Logout</span>
                    </button>
                </div>

                <div className="form-layout">

                    {/* Left Side */}
                    <div className="form-section left">
                        <div className="field-card">
                            <label htmlFor="jobDescription">
                                <FiFileText />
                                Job Description
                            </label>

                            <textarea
                                onChange={(e) => setJobDescription(e.target.value)}
                                id="jobDescription"
                                placeholder="Paste job description here..."
                            />
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="form-section">

                        <div className="field-card">
                            <label htmlFor="resume">
                                <FiUploadCloud />
                                Resume Upload
                            </label>

                            <label htmlFor="resume" className="upload-box">
                                <FiUploadCloud size={32} />
                                <span>Choose PDF Resume</span>
                                <small>Maximum file size 5MB</small>
                            </label>

                            <input
                                ref={resumeInputRef}
                                hidden
                                type="file"
                                id="resume"
                                accept=".pdf"
                            />
                        </div>

                        <div className="field-card">
                            <label htmlFor="selfDescription">
                                <FiUser />
                                Self Description
                            </label>

                            <textarea
                                onChange={(e) => setSelfDescription(e.target.value)}
                                id="selfDescription"
                                placeholder="Tell us about yourself..."
                            />
                        </div>

                        <button className="button primary-button"
                            onClick={handleGenerateReport}
                        >
                            <FiZap />
                            Generate Interview Report
                        </button>

                    </div>
                </div>
            </div>
        </main>
    );
};

export default Home;
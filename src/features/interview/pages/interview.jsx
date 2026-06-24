import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiCheckCircle, FiMenu, FiX, FiArrowLeft, FiDownload } from 'react-icons/fi';
import { MdOutlineAutoAwesome } from 'react-icons/md';
import '../style/interview.scss';
import { useInterview } from '../hooks/useInterview';
import { useNavigate, useParams } from 'react-router';

const Interview = () => {
    const [activeTab, setActiveTab] = useState('technical');
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const [showLeftSidebar, setShowLeftSidebar] = useState(false);
    const [showRightSidebar, setShowRightSidebar] = useState(false);

    const navigate = useNavigate()

    const { interviewId } = useParams()

    const { report: data, getReportById, loading, getResumePdf} = useInterview()



    // Check if mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Close sidebars when changing tabs
    useEffect(() => {
        setShowLeftSidebar(false);
        setShowRightSidebar(false);
    }, [activeTab]);

    const getSeverityColor = (severity) => {
        switch (severity) {
            case 'high':
                return '#ef4444';
            case 'medium':
                return '#f59e0b';
            case 'low':
                return '#10b981';
            default:
                return '#3b82f6';
        }
    };



    if (loading) {
        return (
            <main className="reports-container">
                <div className="loading-screen">
                    <div className="loading-spinner"></div>
                    <h1>Loading your interview plans...</h1>
                    <p>Please wait while we fetch your report</p>
                </div>
            </main>
        )
    }

    if (!data) {
        return (
            <main className="loading-screen">
                <h1>No Data Found</h1>
            </main>
        )
    }
    const renderContent = () => {
        if (activeTab === 'technical' || activeTab === 'behavioral') {
            const questions = activeTab === 'technical' ? data?.technicalQuestions || [] : data?.behavioralQuestions || [];

            return (
                <div className="questions-container">
                    {questions.map((item, index) => (
                        <div key={index} className="question-card">
                            <div
                                className="question-header"
                                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                            >
                                <div className="question-title">
                                    <span className="question-number">Q{index + 1}</span>
                                    <p>{item.question}</p>
                                </div>
                                <FiChevronRight
                                    className={`chevron ${expandedIndex === index ? 'expanded' : ''}`}
                                />
                            </div>

                            {expandedIndex === index && (
                                <div className="question-details">
                                    <div className="detail-section">
                                        <h4>Intention</h4>
                                        <p>{item.intention}</p>
                                    </div>
                                    <div className="detail-section">
                                        <h4>Answer</h4>
                                        <p>{item.answer}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            );
        }

        if (activeTab === 'roadmap') {
            return (
                <div className="roadmap-container">
                    {data.preparationPlan.map((day, index) => (
                        <div key={index} className="roadmap-card">
                            <div className="roadmap-header">
                                <div className="day-badge">Day {day.day}</div>
                                <h3>{day.focus}</h3>
                            </div>
                            <ul className="tasks-list">
                                {day.tasks.map((task, taskIndex) => (
                                    <li key={taskIndex}>
                                        <FiCheckCircle className="task-icon" />
                                        {task}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            );
        }
    };

    return (
        <main className="interview">
            <div className="interview-container">
                {/* Mobile Header Controls */}
                {isMobile && (
                    <div className="mobile-header">
                        <button
                            className="mobile-btn menu-btn"
                            onClick={() => setShowLeftSidebar(!showLeftSidebar)}
                        >
                            <FiMenu />
                        </button>
                        <h2 className="mobile-title">Interview Report</h2>
                        <button
                            className="mobile-btn gaps-btn"
                            onClick={() => setShowRightSidebar(!showRightSidebar)}
                        >
                            <MdOutlineAutoAwesome />
                        </button>
                    </div>
                )}

                {/* Left Sidebar */}
                <aside className={`sidebar left-sidebar ${isMobile && showLeftSidebar ? 'active' : ''}`}>
                    <div className="sidebar-header">
                        <h3>Interview Report</h3>
                        {isMobile && (
                            <button
                                className="close-btn"
                                onClick={() => setShowLeftSidebar(false)}
                            >
                                <FiX />
                            </button>
                        )}
                    </div>

                    <nav className="sidebar-nav">
                        <button
                            className={`nav-button ${activeTab === 'technical' ? 'active' : ''}`}
                            onClick={() => setActiveTab('technical')}
                        >
                            Technical Questions
                        </button>
                        <button
                            className={`nav-button ${activeTab === 'behavioral' ? 'active' : ''}`}
                            onClick={() => setActiveTab('behavioral')}
                        >
                            Behavioral Questions
                        </button>
                        <button
                            className={`nav-button ${activeTab === 'roadmap' ? 'active' : ''}`}
                            onClick={() => setActiveTab('roadmap')}
                        >
                            Preparation Road Map
                        </button>
                    </nav>

                    <div className="match-score">
                        <div className="score-circle">
                            <span>{Math.round(data?.matchScore)}%</span>
                        </div>
                        <p>Match Score</p>
                    </div>

                    <button className="view-btn" onClick={()=>getResumePdf(interviewId)}>
                        <FiDownload size={16} /> Download Resume
                    </button>
                </aside>

                {/* Main Content */}
                <section className="main-content">
                    <header className='reports-header'>
                        <div className="content-header">
                            <h2>
                                {activeTab === 'technical' && 'Technical Questions'}
                                {activeTab === 'behavioral' && 'Behavioral Questions'}
                                {activeTab === 'roadmap' && 'Preparation Road Map'}
                            </h2>
                            <p>
                                {activeTab === 'technical' && 'Questions focused on your technical knowledge and skills'}
                                {activeTab === 'behavioral' && 'Questions to assess your soft skills and experience'}
                                {activeTab === 'roadmap' && 'Your personalized preparation plan for the interview'}
                            </p>
                        </div>
                        <button
                            className="create-report-btn"
                            onClick={() => navigate(-1)}
                        >
                            <FiArrowLeft />Back
                        </button>
                    </header>
                    {renderContent()}
                </section>

                {/* Right Sidebar - Skill Gaps */}
                <aside className={`sidebar right-sidebar ${isMobile && showRightSidebar ? 'active' : ''}`}>
                    <div className="sidebar-header">
                        <MdOutlineAutoAwesome className="header-icon" />
                        <h3>Skill Gaps</h3>
                        {isMobile && (
                            <button
                                className="close-btn"
                                onClick={() => setShowRightSidebar(false)}
                            >
                                <FiX />
                            </button>
                        )}
                    </div>

                    <div className="skill-gaps-list">
                        {data.skillGaps.map((gap, index) => (
                            <div key={index} className="skill-gap-item">
                                <div
                                    className="severity-indicator"
                                    style={{ borderColor: getSeverityColor(gap.severity) }}
                                >
                                    <div
                                        className="severity-dot"
                                        style={{ backgroundColor: getSeverityColor(gap.severity) }}
                                    />
                                </div>
                                <span className="skill-text">{gap.skill}</span>
                            </div>
                        ))}
                    </div>
                </aside>
            </div>
        </main>
    );
};

export default Interview;

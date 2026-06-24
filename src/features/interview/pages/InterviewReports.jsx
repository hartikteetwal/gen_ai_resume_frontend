import React, { useState } from 'react'
import { FiClock, FiChevronRight, FiTarget, FiTrendingUp } from 'react-icons/fi'
import { MdOutlineAutoAwesome } from 'react-icons/md'
import { useInterview } from '../hooks/useInterview'
import '../style/reports.scss'
import { useNavigate } from 'react-router'

const InterviewReports = () => {
    const navigate = useNavigate()
    const { loading, reports } = useInterview()
    const [hoveredId, setHoveredId] = useState(null)

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    if (loading) {
        return (
            <main className="reports-container">
                <div className="loading-screen">
                    <div className="loading-spinner"></div>
                    <h1>Loading your interview plans...</h1>
                    <p>Please wait while we fetch your reports</p>
                </div>
            </main>
        )
    }

    if (!reports || reports.length === 0) {
        return (
            <main className="reports-container">
                <div className="empty-state">
                    <div className="empty-icon">
                        <MdOutlineAutoAwesome />
                    </div>
                    <h1>No Interview Reports Yet</h1>
                    <p>Create your first interview report to get personalized AI-powered interview preparation</p>
                    <button
                        className="empty-cta-btn"
                        onClick={() => navigate('/')}
                    >
                        Create Your First Report
                    </button>
                </div>
            </main>
        )
    }

    return (
        <main className="reports-container">
            <div className="reports-wrapper">
                {/* Header Section */}
                <header className="reports-header">
                    <div className="header-content">
                        <h1>
                            <FiTrendingUp />
                            My Interview Reports
                        </h1>
                        <p>Manage and review your personalized interview preparation plans</p>
                    </div>
                    <button
                        className="create-report-btn"
                        onClick={() => navigate('/')}
                    >
                        <span>+</span> Create New Report
                    </button>
                </header>

                {/* Reports Grid */}
                <div className="reports-grid">
                    {reports.map(report => (
                        <div
                            key={report._id}
                            className='report-card'
                            onMouseEnter={() => setHoveredId(report._id)}
                            onMouseLeave={() => setHoveredId(null)}
                            onClick={() => navigate(`/interview/${report._id}`)}
                        >
                            <div className="report-card-header">
                                <div className="report-title-section">
                                    <h2>{report?.title || "Untitled Position"}</h2>
                                    <p className="report-type">Interview Preparation</p>
                                </div>
                                <div className={`report-arrow ${hoveredId === report._id ? 'active' : ''}`}>
                                    <FiChevronRight />
                                </div>
                            </div>

                            <div className="report-body">
                                {/* Match Score */}
                                <div className="report-stat">
                                    <div className="stat-icon score">
                                        <FiTarget />
                                    </div>
                                    <div className="stat-content">
                                        <span className="stat-label">Match Score</span>
                                        <span className="stat-value">
                                            {report?.matchScore ? `${Math.round(report.matchScore)}%` : 'N/A'}
                                        </span>
                                    </div>
                                </div>

                                {/* Questions Count */}
                                <div className="report-stat">
                                    <div className="stat-icon questions">
                                        <MdOutlineAutoAwesome />
                                    </div>
                                    <div className="stat-content">
                                        <span className="stat-label">Questions</span>
                                        <span className="stat-value">
                                            {(report?.technicalQuestions?.length || 0) + (report?.behavioralQuestions?.length || 0)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="report-footer">
                                <div className="report-date">
                                    <FiClock size={16} />
                                    <span>{formatDate(report.createdAt)}</span>
                                </div>
                                <button className="view-btn">
                                    View Report <FiChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Stats Section */}
                {reports.length > 0 && (
                    <section className="reports-stats">
                        <div className="stat-card">
                            <h3>Total Reports</h3>
                            <p className="stat-number">{reports.length}</p>
                        </div>
                        <div className="stat-card">
                            <h3>Average Match Score</h3>
                            <p className="stat-number">
                                {Math.round(reports.reduce((sum, r) => sum + (r.matchScore || 0), 0) / reports.length)}%
                            </p>
                        </div>
                        <div className="stat-card">
                            <h3>Total Questions</h3>
                            <p className="stat-number">
                                {reports.reduce((sum, r) => sum + (r.technicalQuestions?.length || 0) + (r.behavioralQuestions?.length || 0), 0)}
                            </p>
                        </div>
                    </section>
                )}
            </div>
        </main>
    )
}

export default InterviewReports

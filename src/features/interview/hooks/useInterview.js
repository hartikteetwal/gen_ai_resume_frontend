
import { useContext, useEffect } from "react"
import { InterviewContext } from "../interview.context"
import { generateInterviewReport, generateResumePdf, getInterviewReportById, getInterviewReports } from "../services/interview.api"
import { useParams } from "react-router"

export const useInterview = () => {
    const context = useContext(InterviewContext)
    const {interviewId} = useParams()
    const { loading, setLoading, report, setReport, reports, setReports } = context
    
    const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
        setLoading(true)
        let response = null
        try {
            response = await generateInterviewReport({ jobDescription, selfDescription,resumeFile })
            
            setReport(response.interviewReport)
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
console.log("response",response)
        return response.interviewReport
    }

    const getReportById = async (interviewId) => {
        setLoading(true)
        let response = null
        try {
            response = await getInterviewReportById(interviewId)
            setReport(response.interviewReport)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
        return response.interviewReport
    }
    
    const getReports = async(interviewId) => {
        setLoading(true)
        let response = null
        try {
            response = await getInterviewReports()
            setReports(response.interviewReports)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
        return response.interviewReports
    }

    const getResumePdf = async (interviewId) => {
        setLoading(true);

        try {
            const pdfBlob = await generateResumePdf(interviewId);

            const url = window.URL.createObjectURL(pdfBlob);

            const link = document.createElement("a");
            link.href = url;
            link.download = `resume_${interviewId}.pdf`;

            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

      useEffect(() => {
            if (interviewId) {
                getReportById(interviewId)
            } else {
                getReports()
            }
      }, [interviewId])
    
    

    return { loading, report, reports, generateReport, getReportById, getReports, getResumePdf }
}
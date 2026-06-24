import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials:true
})

export const generateInterviewReport = async({ jobDescription, selfDescription, resumeFile }) => {
    try {
        
    const formData = new FormData()
    formData.append("jobDescription",jobDescription)
    formData.append("selfDescription",selfDescription)
    formData.append("resume", resumeFile)
    
    const response = await api.post("/api/interview", formData, {
        headers: {
            "Content-Type":"multipart/form-data"
        }
    })

    return response.data

    } catch (error) {
        console.log(error)
    }
}

export const getInterviewReportById = async (interviewId) => {
    try {
        
    const response = await api.get(`/api/interview/report/${interviewId}`)

    return response.data

    } catch (error) {
        console.log(error)
    }
}

export const getInterviewReports = async () => {
    try {
        
    const response = await api.get(`/api/interview/reports`)

    return response.data

    } catch (error) {
        console.log(error)
    }
}


export const generateResumePdf = async (interviewId)=>{
    const response = await api.get(`/api/interview/resume/pdf/${interviewId}`, { responseType: "blob" })
    
    return response.data
}
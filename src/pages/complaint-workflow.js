import { useRef, useState } from "react"
import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material"
import { PieChart, Pie, ResponsiveContainer } from "recharts"
import { createComplaint, getComplaint, updateComplaint, getComplaints } from "../helpers/apiEndpoints"

const APP_SOURCE = "kenny-front-end" 


const Workflow = () => {
    const [complaint, setComplaint] = useState({})
    const [displayComplaint, setDisplayComplaint] = useState({})
    const displayComplaintId = useRef("cc2ea524-66b5-4d01-8039-897879d77c61") 

    

    

    const getSingleComplaint = async () => {
        const { apiEndpoint, apiOptions } = await getComplaint(displayComplaintId.current)
        console.log("apiEndpoint", apiEndpoint)
        const response = await fetch(apiEndpoint, apiOptions)
        console.log("response", response)
        const data = await response.json()
        console.log(data)
        setDisplayComplaint(data)
    }

    const updateComplaintStatus = async (status) => {
        const { apiEndpoint, apiOptions } = await updateComplaint(displayComplaintId.current, "status", status)
        console.log("apiEndpoint", apiEndpoint)
        const response = await fetch(apiEndpoint, apiOptions)
        console.log("response", response)
        const data = await response.json()
        console.log(data)
        setDisplayComplaint(data)
        getSingleComplaint()
    }


    return (
        <>
            <Typography variant="h1">Workflow</Typography>


            
            <Typography variant="h4">Get Single Complaint</Typography>
            <Box sx={{mb:4}}>
                <Box sx={{display: "flex", justifyContent: "space-between"}}>
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, mr: 2, ml: 2 }}
                        onClick={getSingleComplaint}
                    >   
                        Get Single Complaint
                    </Button>
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, mr: 2, ml: 2 }}
                        onClick={() => {updateComplaintStatus('New')}}
                    >
                        Update Status to New
                    </Button>
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, mr: 2, ml: 2 }}
                        onClick={() => {updateComplaintStatus('In Process')}}
                    >
                        Update Status to In Process
                    </Button>
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, mr: 2, ml: 2 }}
                        onClick={() => {updateComplaintStatus('Resolved')}}
                    >
                        Update Status to Resolved
                    </Button>
                </Box>
                <Box>
                    {displayComplaint.id && (
                        <>
                        <Box sx={{display: "flex", justifyContent: "space-between"}}>
                            <Typography variant="h6">Id:</Typography>
                            <Typography variant="h6">{displayComplaint.id}</Typography>
                        </Box>
                        <Box sx={{display: "flex", justifyContent: "space-between"}}>
                            <Typography variant="h6">Status:</Typography>
                            <Typography variant="h6">{displayComplaint.status}</Typography>
                        </Box>
                        <Box sx={{display: "flex", justifyContent: "space-between"}}>
                            <Typography variant="h6">Message:</Typography>
                            <Typography variant="h6">{displayComplaint.message}</Typography>
                        </Box>
                        </>
                    )}
                    
                </Box>
            </Box>
        </>
    )
}

export default Workflow
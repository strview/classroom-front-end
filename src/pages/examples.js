import { useRef, useState } from "react"
import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material"
import { PieChart, Pie, ResponsiveContainer } from "recharts"
import { createComplaint, getComplaint, updateComplaint, getComplaints } from "../helpers/apiEndpoints"

const APP_SOURCE = "kenny-front-end"


const Examples = () => {
    const [complaint, setComplaint] = useState({})
    const [displayComplaint, setDisplayComplaint] = useState({})
    const [chartData, setChartData] = useState([])
    const displayComplaintId = useRef("cc2ea524-66b5-4d01-8039-897879d77c61")

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log("complaint", complaint)
        const tempComplaint = {...complaint, source: APP_SOURCE}
        console.log("tempComplaint", tempComplaint)
        // setComplaint(tempComplaint)
        const { apiEndpoint, apiOptions } = await createComplaint(complaint)
        console.log("apiEndpoint", apiEndpoint)
        const response = await fetch(apiEndpoint, apiOptions)
        console.log("response", response)
        const data = await response.json()
        console.log(data)
        setComplaint(data)
    }

    const clearComplaint = () => {
        setComplaint({})
    }

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

    const getChartData = async () => {
        const { apiEndpoint, apiOptions } = await getComplaints()
        console.log("apiEndpoint", apiEndpoint)
        const response = await fetch(apiEndpoint, apiOptions)
        console.log("response", response)
        const data = await response.json()
        console.log(data)
        const chartDataDictionary = {}
        // loop through the data and create a dictionary of the types and counts
        data.forEach((item) => {
            if (chartDataDictionary[item.type]) {
                chartDataDictionary[item.type] += 1
            } else {
                chartDataDictionary[item.type] = 1
            }
        })
        // loop through the dictionary and create the chart data
        const chartData = []
        for (const [key, value] of Object.entries(chartDataDictionary)) {
            chartData.push({name: key, value: value})
        }
        console.log("chartData", chartData)
        setChartData(chartData)
    }
               
    





    return (
        <>
            <Typography variant="h1">Examples</Typography>


            <Typography variant="h4">Grid Example</Typography>
            <Box sx={{mb:4}}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, mr: 2, ml: 2 }}
                            onClick={getChartData}
                        >
                            Get Chart Data
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} sx={{height:"300px"}}>
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie 
                                    dataKey="value" 
                                    data={chartData} 
                                    fill="#8884d8" 
                                    labelLine={false}
                                    label={true}
                                    cx="50%"
                                    cy="50%" />
                            </PieChart>
                        </ResponsiveContainer>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6">Number 3</Typography>
                    </Grid>
                    
                </Grid>
            </Box>
            


            <Typography variant="h4">Form Example</Typography>
            <Box sx={{mb:4}}>
                <Container component="main" >
                    <Box sx={{
                        marginTop: 0,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: "50%" }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="message"
                                label="Message"
                                name="message"
                                autoComplete="message"
                                autoFocus
                                value={complaint.message || ""}
                                onChange={(event) => {setComplaint({...complaint, message: event.target.value})}}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="submitter"
                                label="Submitter"
                                name="submitter"
                                autoComplete="submitter"
                                
                                value={complaint.submitter || ""}
                                onChange={(event) => {setComplaint({...complaint, submitter: event.target.value})}}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="type"
                                label="Type"
                                name="type"
                                autoComplete="type"
                                
                                value={complaint.type || ""}
                                onChange={(event) => {setComplaint({...complaint, type: event.target.value})}}
                            />

                            <Box sx={{display: "flex", justifyContent: "space-between"}}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2, mr: 2, ml: 2 }}
                                >
                                    Save
                                </Button>
                                <Button
                                    type="button"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2, mr: 2, ml: 2 }}
                                    onClick={clearComplaint}
                                >
                                    Clear
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Box>



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

export default Examples
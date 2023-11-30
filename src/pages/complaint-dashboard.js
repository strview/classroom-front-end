import { useState } from "react"
import { Box, Button, Grid, Typography } from "@mui/material"
import { PieChart, Pie, ResponsiveContainer } from "recharts"
import { getComplaints } from "../helpers/apiEndpoints"


const ComplaintDashboard = () => {
    const [chartData, setChartData] = useState([])

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

        const currentUtcTime = new Date().toUTCString();
        console.log(currentUtcTime);
    }

    const getDailyStatus = async ()=> {
        const { apiEndpoint, apiOptions } = await getComplaints()
        console.log("apiEndpoint", apiEndpoint)
        const response = await fetch(apiEndpoint, apiOptions)
        console.log("response", response)
        const data = await response.json()
        console.log(data)
        const chartDataDictionary = {}
        const currentDate = new Date();
        // loop through the data and create a dictionary of the types and counts
        data.forEach((item) => {
            const timeDifference = currentDate - item.created_at;
            const hoursDifference = timeDifference / (1000 * 60 * 60);
            if ((timeDifference) < (24)){
                if (chartDataDictionary[item.status]) {
                    chartDataDictionary[item.status] += 1
                } else {
                    chartDataDictionary[item.status] = 1
                }
            }
            else {

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

    const getWeeklyStatus = async ()=> {
        const { apiEndpoint, apiOptions } = await getComplaints()
        console.log("apiEndpoint", apiEndpoint)
        const response = await fetch(apiEndpoint, apiOptions)
        console.log("response", response)
        const data = await response.json()
        console.log(data)
        const chartDataDictionary = {}
        // loop through the data and create a dictionary of the types and counts
        data.forEach((item) => {
            if (chartDataDictionary[item.status]) {
                chartDataDictionary[item.status] += 1
            } else {
                chartDataDictionary[item.status] = 1
            }
        })
        
        // loop through the dictionary and create the chart data
        const chartData = []
        const currentDate = new Date();
        for (const [key, value] of Object.entries(chartDataDictionary)) {
                chartData.push({name: key, value: value})
        }
        console.log("chartData", chartData)
        setChartData(chartData)
        
    }

    const getMonthlyStatus = async ()=> {
        const { apiEndpoint, apiOptions } = await getComplaints()
        console.log("apiEndpoint", apiEndpoint)
        const response = await fetch(apiEndpoint, apiOptions)
        console.log("response", response)
        const data = await response.json()
        console.log(data)
        const chartDataDictionary = {}
        // loop through the data and create a dictionary of the types and counts
        data.forEach((item) => {
            if (chartDataDictionary[item.status]) {
                chartDataDictionary[item.status] += 1
            } else {
                chartDataDictionary[item.status] = 1
            }
        })
        // loop through the dictionary and create the chart data
        const chartData = []
        const currentDate = new Date();
        for (const [key, value] of Object.entries(chartDataDictionary)) {
                chartData.push({name: key, value: value})
        }
        console.log("chartData", chartData)
        setChartData(chartData)

    }

    const getDailyType = async ()=> {
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
        const currentDate = new Date();
        for (const [key, value] of Object.entries(chartDataDictionary)) {
                chartData.push({name: key, value: value})
        }
        console.log("chartData", chartData)
        setChartData(chartData)

    }

    const getWeeklyType = async ()=> {
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

    const getMonthlyType = async ()=> {
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
            <Typography variant="h1">Complaint Dashboard</Typography>

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
                    <Grid item xs={12} sm={6} md={9} sx={{height:"300px"}}>
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
                    <Grid item xs={12} sm={6} md={9} sx={{height:"300px"}}>
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
                    <Grid item xs={12} sm={6} md={9} sx={{height:"300px"}}>
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
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, mr: 2, ml: 2 }}
                            onClick={getDailyStatus}
                        >
                            Get Chart Data
                        </Button>

                    </Grid>
                    <Grid item xs={12} sm={6} md={9} sx={{height:"300px"}}>
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
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, mr: 2, ml: 2 }}
                            onClick={getDailyStatus}
                        >
                            Get Chart Data
                        </Button>

                    </Grid>
                    <Grid item xs={12} sm={6} md={9} sx={{height:"300px"}}>
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
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, mr: 2, ml: 2 }}
                            onClick={getDailyStatus}
                        >
                            Get Chart Data
                        </Button>

                    </Grid>
                    <Grid item xs={12} sm={6} md={9} sx={{height:"300px"}}>
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
                    
                </Grid>
            </Box>
            
        </>
    )
}

export default ComplaintDashboard
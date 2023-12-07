import { useState } from "react"
import { Box, Button, Grid, Typography } from "@mui/material"
import { PieChart, Pie, ResponsiveContainer, Legend } from "recharts"
import { getComplaints } from "../helpers/apiEndpoints"


const ComplaintDashboard = () => {
    const [chartDataStatusDay, setChartDataStatusDay] = useState([])
    const [chartDataStatusWeek, setChartDataStatusWeek] = useState([])
    const [chartDataStatusMonth, setChartDataStatusMonth] = useState([])
    const [chartDataTypeDay, setChartDataTypeDay] = useState([])
    const [chartDataTypeWeek, setChartDataTypeWeek] = useState([])
    const [chartDataTypeMonth, setChartDataTypeMonth] = useState([])

    let COLORS = ["#8884d8", "#82ca9d", "#FFBB28", "#FF8042", "#AF19FF"];

    const getChartData = async () => {
        const { apiEndpoint, apiOptions } = await getComplaints()
        console.log("apiEndpoint", apiEndpoint)
        const response = await fetch(apiEndpoint, apiOptions)
        console.log("response", response)
        const data = await response.json()
        console.log(data)

        //STATUS DATA
        // loop through the data and create a dictionary of the types and counts
        const currentDate = new Date();
        //Daily
        let chartDataDictionary = {}
        data.forEach((item) => {
            var complaintDate = new Date(item.created_at);
            const timeDifference = currentDate - complaintDate;
            const complaintStatusHours = timeDifference / (1000 * 60 * 60);
            if ((complaintStatusHours) < (24)){
                if (chartDataDictionary[item.status]) {
                    chartDataDictionary[item.status] += 1
                } else {
                    chartDataDictionary[item.status] = 1
                }
            }
            else {
                //console.log("ComplaintStatusHours",  complaintStatusHours)  
            }
        }) 
        // loop through the dictionary and create the chart data
        const chartDataStatusDay = []
        for (const [key, value] of Object.entries(chartDataDictionary)) {
                chartDataStatusDay.push({name: key, value: value})
        }
        console.log("chartDataStatusDay", chartDataStatusDay)
        setChartDataStatusDay(chartDataStatusDay)

        //Weekly
        chartDataDictionary = {}
        data.forEach((item) => {
            var complaintDate = new Date(item.created_at);
            const timeDifference = currentDate - complaintDate;
            const complaintStatusDaysW = timeDifference / (1000 * 60 * 60 * 24);
            if ((complaintStatusDaysW) < (7)){
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
        const chartDataStatusWeek = []
        for (const [key, value] of Object.entries(chartDataDictionary)) {
                chartDataStatusWeek.push({name: key, value: value})
        }
        console.log("chartDataStatusWeek", chartDataStatusWeek)
        setChartDataStatusWeek(chartDataStatusWeek)

        //Monthly
        chartDataDictionary = {}
        data.forEach((item) => {
            var complaintDate = new Date(item.created_at);
            const timeDifference = currentDate - complaintDate;
            const complaintStatusDaysM = timeDifference / (1000 * 60 * 60 * 24);
            if ((complaintStatusDaysM) < (31)){
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
        const chartDataStatusMonth = []
        for (const [key, value] of Object.entries(chartDataDictionary)) {
                chartDataStatusMonth.push({name: key, value: value})
        }
        console.log("chartDataStatusMonth", chartDataStatusMonth)
        setChartDataStatusMonth(chartDataStatusMonth)

        //TYPE DATA
        // loop through the data and create a dictionary of the types and counts
        //Daily
        chartDataDictionary = {}
        data.forEach((item) => {
            var complaintDate = new Date(item.created_at);
            const timeDifference = currentDate - complaintDate;
            const complaintTypeHours = timeDifference / (1000 * 60 * 60);
            if ((complaintTypeHours) < (24)){
                if (chartDataDictionary[item.type]) {
                    chartDataDictionary[item.type] += 1
                } else {
                    chartDataDictionary[item.type] = 1
                }
            }
            else {
                //console.log("ComplaintTypeHours",  complaintTypeHours)
            }
        })
        // loop through the dictionary and create the chart data
        const chartDataTypeDay = []
        for (const [key, value] of Object.entries(chartDataDictionary)) {
            chartDataTypeDay.push({name: key, value: value})
        }
        console.log("chartDataTypeDay", chartDataTypeDay)
        setChartDataTypeDay(chartDataTypeDay)

        //Weekly
        chartDataDictionary = {}
        data.forEach((item) => {
            var complaintDate = new Date(item.created_at);
            const timeDifference = currentDate - complaintDate;
            const complaintTypeDaysW = timeDifference / (1000 * 60 * 60 * 24);
            if ((complaintTypeDaysW) < (7)){
                if (chartDataDictionary[item.type]) {
                    chartDataDictionary[item.type] += 1
                } else {
                    chartDataDictionary[item.type] = 1
                }
            }
            else {
                //console.log("ComplaintTypeDaysW",  complaintTypeDaysW)
            }
        })
        // loop through the dictionary and create the chart data
        const chartDataTypeWeek = []
        for (const [key, value] of Object.entries(chartDataDictionary)) {
            chartDataTypeWeek.push({name: key, value: value})
        }
        console.log("chartDataTypeWeek", chartDataTypeWeek)
        setChartDataTypeWeek(chartDataTypeWeek)
        //Monthly
        chartDataDictionary = {}
        data.forEach((item) => {
            var complaintDate = new Date(item.created_at);
            const timeDifference = currentDate - complaintDate;
            const complaintTypeDaysM = timeDifference / (1000 * 60 * 60 * 24);
            if ((complaintTypeDaysM) < (31)){
                if (chartDataDictionary[item.type]) {
                    chartDataDictionary[item.type] += 1
                } else {
                    chartDataDictionary[item.type] = 1
                }
            }
            else {
                
            }
        })
        // loop through the dictionary and create the chart data
        const chartDataTypeMonth = []
        for (const [key, value] of Object.entries(chartDataDictionary)) {
            chartDataTypeMonth.push({name: key, value: value})
        }
        console.log("chartDataTypeMonth", chartDataTypeMonth)
        setChartDataTypeMonth(chartDataTypeMonth)

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
                                    data={chartDataStatusDay} 
                                    fill="#8884d8" 
                                    labelLine={false}
                                    label={true}
                                    cx="50%"
                                    cy="50%"
                                     
                                        />
                                <Legend/>
                            </PieChart>
                        </ResponsiveContainer>
                    </Grid>
                    <Grid item xs={12} sm={6} md={9} sx={{height:"300px"}}>
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie 
                                    dataKey="value" 
                                    data={chartDataStatusWeek} 
                                    fill="#8884d8" 
                                    labelLine={false}
                                    label={true}
                                    cx="50%"
                                    cy="50%" />
                                <Legend/>
                            </PieChart>
                        </ResponsiveContainer>
                    </Grid>
                    <Grid item xs={12} sm={6} md={9} sx={{height:"300px"}}>
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie 
                                    dataKey="value" 
                                    data={chartDataStatusMonth} 
                                    fill="#8884d8" 
                                    labelLine={false}
                                    label={true}
                                    cx="50%"
                                    cy="50%" />
                                <Legend/>
                            </PieChart>
                        </ResponsiveContainer>
                    </Grid>
                    <Grid item xs={12} sm={6} md={9} sx={{height:"300px"}}>
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie 
                                    dataKey="value" 
                                    data={chartDataTypeDay} 
                                    fill="#8884d8" 
                                    labelLine={false}
                                    label={true}
                                    cx="50%"
                                    cy="50%" />
                                <Legend/>
                            </PieChart>
                        </ResponsiveContainer>
                    </Grid>
                    <Grid item xs={12} sm={6} md={9} sx={{height:"300px"}}>
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie 
                                    dataKey="value" 
                                    data={chartDataTypeWeek} 
                                    fill="#8884d8" 
                                    labelLine={false}
                                    label={true}
                                    cx="50%"
                                    cy="50%" />
                                <Legend/>
                            </PieChart>
                        </ResponsiveContainer>
                    </Grid>
                    <Grid item xs={12} sm={6} md={9} sx={{height:"300px"}}>
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie 
                                    dataKey="value" 
                                    data={chartDataTypeMonth} 
                                    fill="#8884d8" 
                                    labelLine={false}
                                    label={true}
                                    cx="50%"
                                    cy="50%" />
                                    <Legend/>
                                
                            </PieChart>
                        </ResponsiveContainer>
                    </Grid>
                    

                </Grid>
            </Box>
            
        </>
    )
}

export default ComplaintDashboard
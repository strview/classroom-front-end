import { useState, useEffect } from "react"
import { Box, Grid, Typography, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material"
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip, Legend } from "recharts"
import { getComplaints } from "../helpers/apiEndpoints"

const ComplaintDashboard = () => {
    const [showProgress, setShowProgress] = useState(false)
    const [chartDataStatusDay, setChartDataStatusDay] = useState([])
    const [chartDataStatusWeek, setChartDataStatusWeek] = useState([])
    const [chartDataStatusMonth, setChartDataStatusMonth] = useState([])
    const [chartDataTypeDay, setChartDataTypeDay] = useState([])
    const [chartDataTypeWeek, setChartDataTypeWeek] = useState([])
    const [chartDataTypeMonth, setChartDataTypeMonth] = useState([])
    const [tableDataNew, setTableDataNew] = useState({})
    const [tableDataInProgress, setTableDataInProgress] = useState({})
    let COLORS = ["#8884d8", "#82ca9d", "#FFBB28", "#FF8042", "#AF19FF", "#3498db", "#2ecc71", "#e74c3c", "#f39c12", '#001F3F']
    const currentDate = new Date()

    const tooltipStyle = {
        backgroundColor: 'white',
        color: 'black',
        border: '1px solid #ccc'
    };

    useEffect(() => {
        getChartData()
        getTableData()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const TooltipDayStatus = ({ active, payload }) => {
        if (active && payload && payload.length) {

            return (
                <div className={`custom-tooltip`} style={tooltipStyle}>
                    {payload.map((entry, index) => {
                        const dataPoint = entry.payload;
                        const percentage = (dataPoint.value / chartDataStatusDay.reduce((sum, entry) => sum + entry.value, 0)) * 100;
                        return (
                            <p key={index}>{`${dataPoint.name}: ${percentage.toFixed(2)}%`}</p>
                        );
                    })}
                </div>
            );
        }
        return null;
    }

    const TooltipWeekStatus = ({ active, payload }) => {
        if (active && payload && payload.length) {

            return (
                <div className={`custom-tooltip`} style={tooltipStyle}>
                    {payload.map((entry, index) => {
                        const dataPoint = entry.payload;
                        const percentage = (dataPoint.value / chartDataStatusWeek.reduce((sum, entry) => sum + entry.value, 0)) * 100;
                        return (
                            <p key={index}>{`${dataPoint.name}: ${percentage.toFixed(2)}%`}</p>
                        );
                    })}
                </div>
            );
        }
        return null;
    }

    const TooltipMonthStatus = ({ active, payload }) => {
        if (active && payload && payload.length) {

            return (
                <div className={`custom-tooltip`} style={tooltipStyle}>
                    {payload.map((entry, index) => {
                        const dataPoint = entry.payload;
                        const percentage = (dataPoint.value / chartDataStatusMonth.reduce((sum, entry) => sum + entry.value, 0)) * 100;
                        return (
                            <p key={index}>{`${dataPoint.name}: ${percentage.toFixed(2)}%`}</p>
                        );
                    })}
                </div>
            );
        }
        return null;
    }

    const TooltipDayType = ({ active, payload }) => {
        if (active && payload && payload.length) {

            return (
                <div className={`custom-tooltip`} style={tooltipStyle}>
                    {payload.map((entry, index) => {
                        const dataPoint = entry.payload;
                        const percentage = (dataPoint.value / chartDataTypeDay.reduce((sum, entry) => sum + entry.value, 0)) * 100;
                        return (
                            <p key={index}>{`${dataPoint.name}: ${percentage.toFixed(2)}%`}</p>
                        );
                    })}
                </div>
            );
        }
        return null;
    }

    const TooltipWeekType = ({ active, payload }) => {
        if (active && payload && payload.length) {

            return (
                <div className={`custom-tooltip`} style={tooltipStyle}>
                    {payload.map((entry, index) => {
                        const dataPoint = entry.payload;
                        const percentage = (dataPoint.value / chartDataTypeWeek.reduce((sum, entry) => sum + entry.value, 0)) * 100;
                        return (
                            <p key={index}>{`${dataPoint.name}: ${percentage.toFixed(2)}%`}</p>
                        );
                    })}
                </div>
            );
        }
        return null;
    }

    const TooltipMonthType = ({ active, payload }) => {
        if (active && payload && payload.length) {

            return (
                <div className={`custom-tooltip`} style={tooltipStyle}>
                    {payload.map((entry, index) => {
                        const dataPoint = entry.payload;
                        const percentage = (dataPoint.value / chartDataTypeMonth.reduce((sum, entry) => sum + entry.value, 0)) * 100;
                        return (
                            <p key={index}>{`${dataPoint.name}: ${percentage.toFixed(2)}%`}</p>
                        );
                    })}
                </div>
            );
        }
        return null;
    }
    

    const getChartData = async () => {
        setShowProgress(true)
        const { apiEndpoint, apiOptions } = await getComplaints()
        console.log("apiEndpoint", apiEndpoint)
        const response = await fetch(apiEndpoint, apiOptions)
        console.log("response", response)
        const data = await response.json()
        console.log(data)
        setShowProgress(false)

        //DAILY STATUS DATA
        // loop through the data and create a dictionary of the types and counts
        let chartDataDictionary = {}
        data.forEach((item) => {
            var complaintDate = new Date(item.created_at)
            const timeDifference = currentDate - complaintDate
            const complaintStatusHours = timeDifference / (1000 * 60 * 60)
            if ((complaintStatusHours) < (24)) {
                if (chartDataDictionary[item.status]) {
                    chartDataDictionary[item.status] += 1
                } else {
                    chartDataDictionary[item.status] = 1
                }
            }
        })
        // loop through the dictionary and create the chart data
        const chartDataStatusDay = []
        for (const [key, value] of Object.entries(chartDataDictionary)) {
            chartDataStatusDay.push({ name: key, value: value })
        }
        console.log("chartDataStatusDay", chartDataStatusDay)
        setChartDataStatusDay(chartDataStatusDay)

        //Weekly
        chartDataDictionary = {}
        data.forEach((item) => {
            var complaintDate = new Date(item.created_at)
            const timeDifference = currentDate - complaintDate
            const complaintStatusDaysW = timeDifference / (1000 * 60 * 60 * 24)
            if ((complaintStatusDaysW) < (7)) {
                if (chartDataDictionary[item.status]) {
                    chartDataDictionary[item.status] += 1
                } else {
                    chartDataDictionary[item.status] = 1
                }
            }
        })
        // loop through the dictionary and create the chart data
        const chartDataStatusWeek = []
        for (const [key, value] of Object.entries(chartDataDictionary)) {
            chartDataStatusWeek.push({ name: key, value: value })
        }
        console.log("chartDataStatusWeek", chartDataStatusWeek)
        setChartDataStatusWeek(chartDataStatusWeek)

        //Monthly
        chartDataDictionary = {}
        data.forEach((item) => {
            var complaintDate = new Date(item.created_at)
            const timeDifference = currentDate - complaintDate
            const complaintStatusDaysM = timeDifference / (1000 * 60 * 60 * 24)
            if ((complaintStatusDaysM) < (31)) {
                if (chartDataDictionary[item.status]) {
                    chartDataDictionary[item.status] += 1
                } else {
                    chartDataDictionary[item.status] = 1
                }
            }
        })
        // loop through the dictionary and create the chart data
        const chartDataStatusMonth = []
        for (const [key, value] of Object.entries(chartDataDictionary)) {
            chartDataStatusMonth.push({ name: key, value: value })
        }
        console.log("chartDataStatusMonth", chartDataStatusMonth)
        setChartDataStatusMonth(chartDataStatusMonth)

        //DAILY TYPE DATA
        // loop through the data and create a dictionary of the types and counts
        chartDataDictionary = {}
        data.forEach((item) => {
            var complaintDate = new Date(item.created_at)
            const timeDifference = currentDate - complaintDate
            const complaintTypeHours = timeDifference / (1000 * 60 * 60)
            if ((complaintTypeHours) < (24)) {
                if (chartDataDictionary[item.type]) {
                    chartDataDictionary[item.type] += 1
                } else {
                    chartDataDictionary[item.type] = 1
                }
            }
        })
        // loop through the dictionary and create the chart data
        const chartDataTypeDay = []
        for (const [key, value] of Object.entries(chartDataDictionary)) {
            chartDataTypeDay.push({ name: key, value: value })
        }
        console.log("chartDataTypeDay", chartDataTypeDay)
        setChartDataTypeDay(chartDataTypeDay)

        //Weekly
        chartDataDictionary = {}
        data.forEach((item) => {
            var complaintDate = new Date(item.created_at)
            const timeDifference = currentDate - complaintDate
            const complaintTypeDaysW = timeDifference / (1000 * 60 * 60 * 24)
            if ((complaintTypeDaysW) < (7)) {
                if (chartDataDictionary[item.type]) {
                    chartDataDictionary[item.type] += 1
                } else {
                    chartDataDictionary[item.type] = 1
                }
            }
        })
        // loop through the dictionary and create the chart data
        const chartDataTypeWeek = []
        for (const [key, value] of Object.entries(chartDataDictionary)) {
            chartDataTypeWeek.push({ name: key, value: value })
        }
        console.log("chartDataTypeWeek", chartDataTypeWeek)
        setChartDataTypeWeek(chartDataTypeWeek)
        //Monthly
        chartDataDictionary = {}
        data.forEach((item) => {
            var complaintDate = new Date(item.created_at)
            const timeDifference = currentDate - complaintDate
            const complaintTypeDays = timeDifference / (1000 * 60 * 60 * 24)
            if ((complaintTypeDays) < (31)) {
                if (chartDataDictionary[item.type]) {
                    chartDataDictionary[item.type] += 1
                } else {
                    chartDataDictionary[item.type] = 1
                }
            }
        })
        // loop through the dictionary and create the chart data
        const chartDataTypeMonth = []
        for (const [key, value] of Object.entries(chartDataDictionary)) {
            chartDataTypeMonth.push({ name: key, value: value })
        }
        console.log("chartDataTypeMonth", chartDataTypeMonth)
        setChartDataTypeMonth(chartDataTypeMonth)
    }

    const getTableData = async () => {
        setShowProgress(true)
        const { apiEndpoint, apiOptions } = await getComplaints()
        console.log("apiEndpoint", apiEndpoint)
        const response = await fetch(apiEndpoint, apiOptions)
        console.log("response", response)
        const data = await response.json()
        console.log(data)
        setShowProgress(false)

        let tableDataDictionary = { bucket1: 0, bucket2: 0, bucket3: 0, bucket4: 0 }
        data.forEach((item) => {
            var complaintDate = new Date(item.created_at)
            const timeDifference = currentDate - complaintDate
            const complaintDays = timeDifference / (1000 * 60 * 60 * 24)
            if ((complaintDays) <= (30) && (item.status?.toLowerCase() === "new")) {
                tableDataDictionary["bucket1"] += 1
            }
            else if (((complaintDays) > (30) && (complaintDays) <= (60) && (item.status?.toLowerCase() === "new"))) {
                tableDataDictionary["bucket2"] += 1
            }
            else if (((complaintDays) > (60) && (complaintDays) <= (90) && (item.status?.toLowerCase() === "new"))) {
                tableDataDictionary["bucket3"] += 1
            }
            else if (((complaintDays) > (90) && (item.status?.toLowerCase() === "new"))) {
                tableDataDictionary["bucket4"] += 1
            }
        })
        setTableDataNew(tableDataDictionary)

        tableDataDictionary = { bucket1: 0, bucket2: 0, bucket3: 0, bucket4: 0 }
        data.forEach((item) => {
            var complaintDate = new Date(item.created_at)
            const timeDifference = currentDate - complaintDate
            const complaintDays = timeDifference / (1000 * 60 * 60 * 24)
            if ((complaintDays) <= (30) && (item.status?.toLowerCase() === "in process")) {
                tableDataDictionary["bucket1"] += 1
            }
            else if (((complaintDays) > (30) && (complaintDays) <= (60) && (item.status?.toLowerCase() === "in process"))) {
                tableDataDictionary["bucket2"] += 1
            }
            else if (((complaintDays) > (60) && (complaintDays) <= (90) && (item.status?.toLowerCase() === "in process"))) {
                tableDataDictionary["bucket3"] += 1
            }
            else if (((complaintDays) > (90) && (item.status?.toLowerCase() === "in process"))) {
                tableDataDictionary["bucket4"] += 1
            }
        })
        setTableDataInProgress(tableDataDictionary)
    }


    return (
        <>
            {(showProgress === true) ? (<Typography></Typography>)
                : <Typography variant="h2" align="center">Complaint Dashboard</Typography>
            }
            <Box sx={{ mb: 4 }}>
                {(showProgress === true) ? (<CircularProgress
                    style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)'
                    }} />) : 
                    (
                        <Grid container spacing={2} align="center" justify="center" alignItems="center">
                            <Grid item xs={12} sm={12} md={12}></Grid>
                            <Grid item xs={12} sm={6} md={4}></Grid>
                            <Grid item xs={12} sm={6} md={4}></Grid>
                            <Grid item xs={12} sm={6} md={4}></Grid>
                            <Grid item xs={12} sm={6} md={4} sx={{ height: "300px" }}>
                                <Typography variant="h5" align="center"><u><b>Daily Complaint Statuses</b></u></Typography>
                                {(chartDataStatusDay.length === 0) ? (<Typography sx={{ pt: 13, pb: 0, pr: 2, pl: 2 }}><b>No Available Data Currently</b></Typography>)
                                    : <ResponsiveContainer>
                                        <PieChart>
                                            <Pie
                                                dataKey="value"
                                                nameKey="name"
                                                data={chartDataStatusDay}
                                                fill="#8884d8"
                                                labelLine={false}
                                                label={true}
                                                cx="50%"
                                                cy="50%"
                                            >
                                                {chartDataStatusDay.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip content={<TooltipDayStatus />} />
                                            <Legend />
                                        </PieChart>
                                    </ResponsiveContainer>
                                }
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} sx={{ height: "300px" }}>
                                <Typography variant="h5" align="center"><u><b>Weekly Complaint Statuses</b></u></Typography>
                                {
                                    (chartDataStatusWeek.length === 0) ? (<Typography sx={{ pt: 13, pb: 0, pr: 2, pl: 2 }}><b>No Available Data Currently</b></Typography>)
                                        : <ResponsiveContainer>
                                            <PieChart>
                                                <Pie
                                                    dataKey="value"
                                                    data={chartDataStatusWeek}
                                                    fill="#8884d8"
                                                    labelLine={false}
                                                    label={true}
                                                    cx="50%"
                                                    cy="50%"
                                                >
                                                    {chartDataStatusWeek.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip content={<TooltipWeekStatus />} />
                                                <Legend />

                                            </PieChart>
                                        </ResponsiveContainer>
                                }
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} sx={{ height: "300px" }}>
                                <Typography variant="h5" align="center"><u><b>Monthly Complaint Statuses</b></u></Typography>
                                {(chartDataStatusMonth.length === 0) ? (<Typography sx={{ pt: 13, pb: 0, pr: 2, pl: 2 }}><b>No Available Data Currently</b></Typography>)
                                    : <ResponsiveContainer>
                                        <PieChart>
                                            <Pie
                                                dataKey="value"
                                                data={chartDataStatusMonth}
                                                fill="#8884d8"
                                                labelLine={false}
                                                label={true}
                                                cx="50%"
                                                cy="50%"
                                            >
                                                {chartDataStatusMonth.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip content={<TooltipMonthStatus />} />
                                            <Legend />
                                        </PieChart>
                                    </ResponsiveContainer>
                                }
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}></Grid>
                            <Grid item xs={12} sm={12} md={12}></Grid>
                            <Grid item xs={12} sm={6} md={4} sx={{ height: "300px" }}>
                                <Typography variant="h5" align="center"><u><b>Daily Complaint Types</b></u></Typography>
                                {(chartDataTypeDay.length === 0) ? (<Typography sx={{ pt: 13, pb: 0, pr: 2, pl: 2 }}><b>No Available Data Currently</b></Typography>)
                                    : <ResponsiveContainer>
                                        <PieChart>
                                            <Pie
                                                dataKey="value"
                                                data={chartDataTypeDay}
                                                fill="#8884d8"
                                                labelLine={false}
                                                label={true}
                                                cx="50%"
                                                cy="50%" >
                                                {chartDataTypeDay.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip content={<TooltipDayType />} />
                                            <Legend />
                                        </PieChart>
                                    </ResponsiveContainer>
                                }
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} sx={{ height: "300px" }}>
                                <Typography variant="h5" align="center"><u><b>Weekly Complaint Types</b></u></Typography>
                                {(chartDataTypeWeek.length === 0) ? (<Typography sx={{ pt: 13, pb: 0, pr: 2, pl: 2 }}><b>No Available Data Currently</b></Typography>)
                                    : <ResponsiveContainer>
                                        <PieChart>
                                            <Pie
                                                dataKey="value"
                                                data={chartDataTypeWeek}
                                                fill="#8884d8"
                                                labelLine={false}
                                                label={true}
                                                cx="50%"
                                                cy="50%"
                                            >
                                                {chartDataTypeWeek.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip content={<TooltipWeekType />} />
                                            <Legend />
                                        </PieChart>
                                    </ResponsiveContainer>
                                }
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} sx={{ height: "300px" }}>
                                <Typography variant="h5" align="center"><u><b>Monthly Complaint Types</b></u></Typography>
                                {(chartDataTypeMonth.length === 0) ? (<Typography sx={{ pt: 13, pb: 0, pr: 2, pl: 2 }}><b>No Available Data Currently</b></Typography>)
                                    : <ResponsiveContainer>
                                        <PieChart>
                                            <Pie
                                                dataKey="value"
                                                data={chartDataTypeMonth}
                                                fill="#8884d8"
                                                labelLine={false}
                                                label={true}
                                                cx="50%"
                                                cy="50%"
                                            >
                                                {chartDataTypeMonth.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip content={<TooltipMonthType />} />
                                            <Legend />

                                        </PieChart>
                                    </ResponsiveContainer>
                                }
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}></Grid>
                            <Grid item xs={12} sm={12} md={12}></Grid>
                            <Grid item xs={12} sm={12} md={12}></Grid>
                            <Grid item xs={12} sm={6} md={3}></Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 480 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell><Typography sx={{ mt: 1, mb: 1, mr: 2, ml: 2 }}><u><b>Days</b></u></Typography></TableCell>
                                                <TableCell><Typography sx={{ mt: 1, mb: 1, mr: 2, ml: 2 }}><u><b>New Complaints</b></u></Typography></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell><Typography sx={{ mt: 1, mb: 1, mr: 2, ml: 2 }}>0-30</Typography></TableCell>
                                                <TableCell><Typography sx={{ pl: 8 }}>{tableDataNew["bucket1"]}</Typography></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell><Typography sx={{ mt: 1, mb: 1, mr: 2, ml: 2 }}>31-60</Typography></TableCell>
                                                <TableCell><Typography sx={{ pl: 8 }}>{tableDataNew["bucket2"]}</Typography></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell><Typography sx={{ mt: 1, mb: 1, mr: 2, ml: 2 }}>61-90</Typography></TableCell>
                                                <TableCell><Typography sx={{ pl: 8 }}>{tableDataNew["bucket3"]}</Typography></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell><Typography><Typography sx={{ mt: 1, mb: 1, mr: 2, ml: 2 }}>90+</Typography></Typography></TableCell>
                                                <TableCell><Typography sx={{ pl: 8 }}>{tableDataNew["bucket4"]}</Typography></TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                            <Grid item xs={12} sm={6} md={1}></Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 480 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell><Typography sx={{ mt: 1, mb: 1, mr: 2, ml: 2 }}><u><b>Days</b></u></Typography></TableCell>
                                                <TableCell><Typography sx={{ mt: 1, mb: 1, mr: 2, ml: 2 }}><u><b>In Process Complaints</b></u></Typography></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell><Typography sx={{ mt: 1, mb: 1, mr: 2, ml: 2 }}>0-30</Typography></TableCell>
                                                <TableCell><Typography sx={{ pl: 8 }}>{tableDataInProgress["bucket1"]}</Typography></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell><Typography sx={{ mt: 1, mb: 1, mr: 2, ml: 2 }}>31-60</Typography></TableCell>
                                                <TableCell><Typography sx={{ pl: 8 }}>{tableDataInProgress["bucket2"]}</Typography></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell><Typography sx={{ mt: 1, mb: 1, mr: 2, ml: 2 }}>61-90</Typography></TableCell>
                                                <TableCell><Typography sx={{ pl: 8 }}>{tableDataInProgress["bucket3"]}</Typography></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell><Typography><Typography sx={{ mt: 1, mb: 1, mr: 2, ml: 2 }}>90+</Typography></Typography></TableCell>
                                                <TableCell><Typography sx={{ pl: 8 }}>{tableDataInProgress["bucket4"]}</Typography></TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}></Grid>
                        </Grid>
                    )
                }
            </Box>

        </>
    )
}

export default ComplaintDashboard
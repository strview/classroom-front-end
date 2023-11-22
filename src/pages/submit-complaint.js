import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { createComplaint } from "../helpers/apiEndpoints"

const APP_SOURCE = "kobe-front=end"

const SubmitComplaint = () => {
    const [complaint, setComplaint] = useState({})

    //This is to be able to handle and submit the complaint information from the client
    //The console logs is for de-bugging purposes for the developer
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

    //This is a function that is used for the clear button in the form 
    const clearComplaint = () => {
        setComplaint({})
    }
}

export default SubmitComplaint
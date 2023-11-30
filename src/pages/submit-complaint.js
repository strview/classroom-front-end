import { Box, Button, Container, Grid, TextField, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import * as React from 'react'
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

//This is for the type form dropdown
    const [type, setFood] = React.useState('noise');

//This is for selecting type form dropdown
    const handleTypeChange = (event) => {

        setFood(event.target.value);

 };


    return (
        <>
            <h1>Complaint Form</h1>


            <form>
            <FormControl fullWidth>

            <TextField margin="normal"
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


                <InputLabel id="type-label">Complaint type</InputLabel>
                <Select
                    labelId="type-label"
                    id="type"
                    value={type}
                    label="Complaint Type"
                    onChange={handleTypeChange}
                >
                    <MenuItem value="noise">Noise</MenuItem>
                    <MenuItem value="trash">Trash</MenuItem>
                    <MenuItem value="parking">Parking</MenuItem>
                    <MenuItem value="pet">Pet/Pet Waste</MenuItem>
                    <MenuItem value="safety">Life Safety</MenuItem>
                    <MenuItem value="fire">Outdoor Fires</MenuItem>
                    <MenuItem value="night">Night Lighting</MenuItem>
                    <MenuItem value="hazard">Hazardous/Unsafe Conditions</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                </Select>

                
            </FormControl>
            
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

                    </form>

        </>
    )
    
}

export default SubmitComplaint
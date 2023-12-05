import { Box, Button, Container, Grid, TextField, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import * as React from 'react'
import { useState } from "react"
import { createComplaint } from "../helpers/apiEndpoints"
import validator from 'validator'

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


//This is for selecting type form dropdown
    const handleTypeChange = (event) => {

        setComplaint({...complaint, type: event.target.value})

 };
   
 //This is the new code to try and get the Anonymous button fields
    const [isButtonClicked, setButtonClicked] = useState(false);
    
    const handleButtonClick = () => {
        setButtonClicked(!isButtonClicked);
        };

    const [emailError, setEmailError] = useState('')
    
    //Email Validation
    const validateEmail = (event) => {
        var email = event.target.value
      
        if (validator.isEmail(email)) {
           setEmailError('Valid Email :)')
        } else {
           setEmailError('Enter valid Email!')
        }
      }

    const [phoneError, setPhoneError] = useState('')
    
    //Phone number validation
    const validatePhone = (event) => {
        var phone = event.target.value
      
        if (validator.isMobilePhone(phone)) {
           setPhoneError('Valid Phone :)')
        } else {
           setPhoneError('Enter valid Phone!')
        }
      }

    const handleEmailChange = (event) => {
        setComplaint({...complaint, email: event.target.value})
        validateEmail(event)
    }

    const handlePhoneChange = (event) => {
        setComplaint({...complaint, phone: event.target.value})
        validatePhone(event)
    }
      //This is a comment 
    

    return (
        <>
            <h1>Complaint Form</h1>
            <div>
                {emailError}
            </div>

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
                    id="complaint type"
                    value={complaint.type || ""}
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


                <TextField margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            value={complaint.name || ""}
                            onChange={(event) => {setComplaint({...complaint, name: event.target.value})}}
                            />

                <TextField margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={complaint.email || ""}
                            onChange={(event) => {handleEmailChange(event)}}
                            />
                <div>
                    {emailError}
                </div>

                <TextField margin="normal"
                            required
                            fullWidth
                            id="phone"
                            label="Phone Number"
                            name="phone"
                            autoComplete="phone"
                            autoFocus
                            value={complaint.phone || ""}
                            onChange={(event) => {handlePhoneChange(event)}}
                            />
                <div>
                    {phoneError}
                </div>

                
            </FormControl>
            
            <Box sx={{display: "flex", justifyContent: "space-between"}}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, mr: 2, ml: 2 }}
                            onClick = {handleSubmit}
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
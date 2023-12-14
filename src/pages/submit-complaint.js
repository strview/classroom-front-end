import { Box, Button,  TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import * as React from 'react'
import { useState } from "react"
import { createComplaint } from "../helpers/apiEndpoints"
import validator from 'validator'
import Alert from '@mui/material/Alert'
import LinearProgress from '@mui/material/LinearProgress'
import Checkbox from '@mui/material/Checkbox';

const APP_SOURCE = "kobe-front=end"

const SubmitComplaint = () => {
    const [complaint, setComplaint] = useState({})
    const [showAlert, setShowAlert] = useState(false)
    const [showProgress, setShowProgress] = useState(false)
    const [emailError, setEmailError] = useState('')
    const [phoneError, setPhoneError] = useState('')
    const [fieldsHidden, setFieldsHidden] = useState(false)
    //This is to be able to handle and submit the complaint information from the client
    //The console logs is for de-bugging purposes for the developer
    const handleSubmit = async (event) => {
        event.preventDefault()
        setShowProgress(true)
        console.log("complaint", complaint)
        const tempComplaint = { ...complaint, source: APP_SOURCE }
        console.log("tempComplaint", tempComplaint)
        const { apiEndpoint, apiOptions } = await createComplaint(complaint)
        console.log("apiEndpoint", apiEndpoint)
        const response = await fetch(apiEndpoint, apiOptions)
        console.log("response", response)
        const data = await response.json()
        console.log(data)
        setComplaint(data)
        setShowAlert(true)
        setShowProgress(false)
        clearComplaint()
    }

    //This is a function that is used for the clear button in the form 
    const clearComplaint = () => {
        setComplaint({})
    }

    //This is for selecting type form dropdown
    const handleTypeChange = (event) => {
        setComplaint({ ...complaint, type: event.target.value })
    }

    //Email Validation
    const validateEmail = (event) => {
        var email = event.target.value
        if (validator.isEmail(email)) {
            setEmailError('')
        } else {
            setEmailError('Please enter a valid email')
        }
    }

    //Phone number validation
    const validatePhone = (event) => {
        var phone = event.target.value
        if (validator.isMobilePhone(phone)) {
            setPhoneError('')
        } else {
            setPhoneError('Please enter a valid phone number')
        }
    }

    //This handles the email validator
    const handleEmailChange = (event) => {
        setComplaint({ ...complaint, email: event.target.value })
        validateEmail(event)
    }

    //This handles the phone validator
    const handlePhoneChange = (event) => {
        setComplaint({ ...complaint, phone: event.target.value })
        validatePhone(event)
    }

    //This is to hide and show fields if anonymous button is clicked
    const toggleFieldsVisibility = () => {
        setFieldsHidden(!fieldsHidden)
    }

    //This is for the styling of the Complaint form tag   
    const mystyle = {
        color: "black",
        padding: "10px",
        fontFamily: "Arial",
        textAlign: 'center',
    }

    const checkBoxLabel = { inputProps: { 'aria-label': 'Checkbox demo' } };

    return (
        <>
            {showAlert && <Alert severity="success">Your Response has been recorded</Alert>}
            {showAlert && <Alert severity="info" sx={{ mt: 1 }}>If you have any questions or concerns, contact us at email@gmail.com or 111-111-1111</Alert>}
            {showProgress && (<Box sx={{ width: '100%' }}>
                                <LinearProgress />
                              </Box>)}
            <h1 style={mystyle}> Complaint Form</h1>
            <form>
                
                <FormControl fullWidth>
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
                </FormControl>
                <TextField margin="normal"
                    required
                    fullWidth
                    id="address"
                    label="Address of complaint location"
                    name="address"
                    autoComplete="address"
                    autoFocus
                    value={complaint.address || ""}
                    inputProps={{ maxLength: 200 }}
                    onChange={(event) => { setComplaint({ ...complaint, address: event.target.value }) }}
                />
                
                <TextField margin="normal"
                    required
                    fullWidth
                    id="message"
                    label="Message"
                    name="message"
                    autoComplete="message"
                    autoFocus
                    value={complaint.message || ""}
                    inputProps={{ maxLength: 2000 }}
                    onChange={(event) => { setComplaint({ ...complaint, message: event.target.value }) }}
                />
                {!fieldsHidden && (
                    <><TextField margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        value={complaint.name || ""}
                        onChange={(event) => { setComplaint({ ...complaint, name: event.target.value }) }} /><TextField margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={complaint.email || ""}
                            onChange={(event) => { handleEmailChange(event) }} />
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
                            onChange={(event) => { handlePhoneChange(event) }}
                        />
                        <div>
                            {phoneError}
                        </div>
                    </>
                )}
                
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                
                <label>
                <Checkbox {...checkBoxLabel} 
                onClick = {toggleFieldsVisibility}
                checked = {fieldsHidden} />
                I want to be anonymous
                </label> 
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, mr: 2, ml: 2 }}
                        onClick={handleSubmit}
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
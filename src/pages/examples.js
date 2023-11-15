import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { createComplaint } from "../helpers/apiEndpoints"

const APP_SOURCE = "kenny-front-end"


const GridExample = () => {
    return (
        <div className="grid-example">
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                    <div className="grid-item">1</div>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <div className="grid-item">2</div>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <div className="grid-item">3</div>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <div className="grid-item">4</div>
                </Grid>
            </Grid>
        </div>
    )
}

const Examples = () => {
    const [complaint, setComplaint] = useState({})

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





    return (
        <>
            <Typography variant="h1">Examples</Typography>


            <Typography variant="h2">Grid Example</Typography>
            <GridExample />


            <Typography variant="h2">Form Example</Typography>
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
        </>
    )
}

export default Examples
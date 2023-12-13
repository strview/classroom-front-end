import { useRef, useState } from "react"
import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material"
import { createComplaint, getComplaint, updateComplaint, getComplaints } from "../helpers/apiEndpoints"
import Autocomplete from '@mui/material/Autocomplete';






const Workflow = () => {
    const [complaint, setComplaint] = useState({})
    const [displayComplaint, setDisplayComplaint] = useState({})
    const [notes, setNotes] = useState("");
    const [selectedComplaintId, setSelectedComplaintId] = useState(null);
    const multipleComplaints = {
        "cc2ea524-66b5-4d01-8039-897879d77c61": useRef("cc2ea524-66b5-4d01-8039-897879d77c61"),
        "fc41d8e6-5058-46d3-8d4a-4892254454c2": useRef("fc41d8e6-5058-46d3-8d4a-4892254454c2"), 
        "b5615263-c677-4592-8c6b-ee5ba27ecb42": useRef("b5615263-c677-4592-8c6b-ee5ba27ecb42"),
        "fe871c91-a983-4168-8c83-52c8f4ca9df1": useRef("fe871c91-a983-4168-8c83-52c8f4ca9df1"),
        "b8744fd7-1159-414b-908f-3f0cd994b796": useRef("b8744fd7-1159-414b-908f-3f0cd994b796"),
        "4bb2091e-c820-4da8-8ac9-d5f5f089aefc": useRef("4bb2091e-c820-4da8-8ac9-d5f5f089aefc"),
        "cc47f81a-0f83-4758-9588-c15415c8b496": useRef("cc47f81a-0f83-4758-9588-c15415c8b496"),
        "6c137431-0add-4456-9b6e-4738d7aa47a6": useRef("6c137431-0add-4456-9b6e-4738d7aa47a6"),

    };
   

     const getSingleComplaint = async () => {
        if (selectedComplaintId) {
            const { apiEndpoint, apiOptions } = await getComplaint(selectedComplaintId);
            console.log("apiEndpoint", apiEndpoint)
            const response = await fetch(apiEndpoint, apiOptions);
            console.log("response", response)
            const data = await response.json();
            console.log(data)
            setDisplayComplaint(data);
        }
        else {
            alert("Please Enter A Complaint ID")
        } 




    }


   




    const updateComplaintStatus = async (status) => {
        const { apiEndpoint, apiOptions } = await updateComplaint(displayComplaint.id, "status", status)
        console.log("apiEndpoint", apiEndpoint)
        const response = await fetch(apiEndpoint, apiOptions)
        console.log("response", response)
        const data = await response.json()
        console.log(data)
        setDisplayComplaint(data)
        getSingleComplaint()
        
    };
       
   


    const assignToPerson = async () => {
        const { apiEndpoint, apiOptions } = await updateComplaint(displayComplaint.id, "assigned", displayComplaint.assigned)
        console.log("apiEndpoint", apiEndpoint)
        const response = await fetch(apiEndpoint, apiOptions)
        console.log("response", response)
        const data = await response.json()
        console.log(data)
        setDisplayComplaint(data)
        getSingleComplaint()
        
    };

    
 


 
 


    return (
        <>
            <Typography variant="h1">Workflow</Typography>


            


           
            <Typography variant="h4" sx={{mb:2}}>Complaints Portal</Typography>
            <Box sx={{mb:4}}>
                <Box sx={{display: "flex", justifyContent: "space-between"}}>






                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={Object.keys(multipleComplaints)}
                    sx={{ width: 2000 }}
                    renderInput={(params) => <TextField {...params} label="Search for a Complaint ID" />}
                    onChange={(event, value) => {
                        setSelectedComplaintId(multipleComplaints[value].current);
                    }}
                />














                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, mr: 2, ml: 2 }}
                        onClick={() => {getSingleComplaint()}}
                       
                    >  
                        Get Single Complaint
                    </Button>

                                 
                </Box>
                <Box>
               
                {displayComplaint.id && (
                        <>
                        <Box sx={{display: "flex", justifyContent: "space-between"}}>
                            <Typography variant="h6">Id: {displayComplaint.id}</Typography>
                            
                        </Box>
                        <Box sx={{display: "flex", justifyContent: "space-between"}}>
                            <Typography variant="h6">Status: {displayComplaint.status}</Typography>
                            
                        </Box>
                        <Box sx={{display: "flex", justifyContent: "space-between"}}>
                            <Typography variant="h6">Message: {displayComplaint.message}</Typography>
                            
                        </Box>

                        <Box sx={{display: "flex", justifyContent: "space-between"}}>
                            <Typography variant="h6">Assigned to: {displayComplaint.assigned}</Typography>
                            
                        </Box>
                        
                    
                    <Box sx={{mb:4}}>
                    <Box sx={{display: "flex", justifyContent: "space-between"}}>
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
                        onClick={() => {updateComplaintStatus('In Progress')}}
                    >
                        Update Status to In Progress
                    </Button>






                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, mr: 2, ml: 2 }}
                        onClick={() => {updateComplaintStatus('Resolved')}}
                    >
                        Update Status to Resolved
                    </Button>

                   

                    </Box>   
                       
                    </Box>


                       
                       
                       <TextField sx={{mb:4}}
                            id="AssignText"
                            label="Assignment:"
                            helperText="Insert Assigned Person"
                            value={displayComplaint.assigned}
                            onChange={(event) => {setDisplayComplaint({...displayComplaint, assigned: event.target.value})}}
                        />


                    <Button 
                        type="button"    
                        variant="contained"
                        sx={{ mt: 3, mb: 2, mr: 2, ml: 2 }}
                        onClick={() => {assignToPerson()}}
                    >
                        Press to Assign
                    </Button>

                            
                    <Box sx={{mb:4}}>
                       <TextField 
                            
                            id="outlined-helperText"
                            label="Notes:"
                            helperText="Insert any special notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                        </Box>
                    </>
                       
                    )}    
                    </Box>
                 

               
    </Box>
 


               














        </>
       
    )
   
                    }


                   












export default Workflow



                

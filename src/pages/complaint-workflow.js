import { useRef, useState } from "react"
import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material"
import { createComplaint, getComplaint, updateComplaint, getComplaints } from "../helpers/apiEndpoints"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


//const APP_SOURCE = "kenny-front-end" 


const Workflow = () => {
    const [complaint, setComplaint] = useState({})
    const [displayComplaint, setDisplayComplaint] = useState({})
    const [notes, setNotes] = useState("");
    const [age, setAge] = useState('');
    const handleChange = (event) => {
        setAge(event.target.value);
      };  
    const [timestamps, setTimestamps] = useState({
        timeReceived: "",
        timeNew: "",
        timeInProgress: "",
        timeForwarded: "",
        timeResolved: "",
    });
    const multipleComplaints = {
        displayComplaintId : useRef("cc2ea524-66b5-4d01-8039-897879d77c61"),
        displayComplaintId2: useRef("another-complaint-id"),
    }
    

    const handleSelectChange = async (event) => {
        const selectedComplaintId = event.target.value;
        const { apiEndpoint, apiOptions } = await getComplaint(selectedComplaintId);
        const response = await fetch(apiEndpoint, apiOptions);
        const data = await response.json();
        setDisplayComplaint(data);
        setNotes(""); 
        setTimestamps({
            timeReceived: getTimeStamp(),
            timeNew: "",
            timeInProgress: "",
            timeForwarded: "",
            timeResolved: "",
        });
    };

    const getSingleComplaint = async () => {
        const { apiEndpoint, apiOptions } = await getComplaint(multipleComplaints.displayComplaintId.current)
        console.log("apiEndpoint", apiEndpoint)
        const response = await fetch(apiEndpoint, apiOptions)
        console.log("response", response)
        const data = await response.json()
        console.log(data)
        setDisplayComplaint(data)
        setTimestamps({
            timeReceived: getTimeStamp(),
            timeNew: "",
            timeInProgress: "",
            timeForwarded: "",
            timeResolved: "",
        });

        
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
        const updatedTimestamps = { ...timestamps };
        switch (status) {
            case 'New':
                updatedTimestamps.timeNew = getTimeStamp();
                break;
            case 'In Process':
                updatedTimestamps.timeInProgress = getTimeStamp();
                break;
            case 'Forwarded: In Process':
                updatedTimestamps.timeForwarded = getTimeStamp();
                break;
            case 'Resolved':
                updatedTimestamps.timeResolved = getTimeStamp();
                break;
            default:
                break;
        }
        setTimestamps(updatedTimestamps);
    };
        
    


    function getTimeStamp() {
        var now = new Date();
        return ((now.getMonth() + 1) + '/' + (now.getDate()) + '/' + now.getFullYear() + " " + now.getHours() + ':'
                      + ((now.getMinutes() < 10) ? ("0" + now.getMinutes()) : (now.getMinutes())) + ':' + ((now.getSeconds() < 10) ? ("0" + now
                      .getSeconds()) : (now.getSeconds())));
 }
 

  
  

    return (
        <>
            <Typography variant="h1">Workflow</Typography>

            

            
            <Typography variant="h4">Complaints Portal</Typography>
            <Box sx={{mb:4}}>
                <Box sx={{display: "flex", justifyContent: "space-between"}}>
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, mr: 2, ml: 2 }}
                        onClick={() => {getSingleComplaint()}}
                       
                    >   
                        Get Single Complaint
                    </Button>


                    <FormControl fullWidth sx={{ mt: 3, mb: 2, mr: 2, ml: 2 }}>
                        <InputLabel id="allComplaints">Complaints</InputLabel>
                        <Select
                        labelId="allComplaints"
                        id="allComplaints"
                        value={displayComplaint.id}
                        label="Complaints"
                        onChange={handleSelectChange}
                        >
                        <MenuItem value={"cc2ea524-66b5-4d01-8039-897879d77c61"}>cc2ea524-66b5-4d01-8039-897879d77c61</MenuItem>
                        <MenuItem value={"another-complaint-id"}>another-complaint-id</MenuItem>
                        </Select>
                        </FormControl>

                    





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
                        onClick={() => {updateComplaintStatus('Forwarded: In Process')}}
                    >
                        Forward to Code Office
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
                        <Box sx={{display: "flex", justifyContent: "space-between"}}>
                            <Typography variant="h6">Time Recieved: {timestamps.timeReceived}</Typography>
                        </Box>
                        <Box sx={{display: "flex", justifyContent: "space-between"}}>
                            <Typography variant="h6">Time as New: {timestamps.timeNew}</Typography>
                        </Box>
                        <Box sx={{display: "flex", justifyContent: "space-between"}}>
                            <Typography variant="h6">Time In Progress: {timestamps.timeInProgress}</Typography>
                        </Box>
                        <Box sx={{display: "flex", justifyContent: "space-between"}}>
                            <Typography variant="h6">Time Forwarded: {timestamps.timeForwarded}</Typography>
                        </Box>
                        <Box sx={{display: "flex", justifyContent: "space-between"}}>
                            <Typography variant="h6">Time Resolved: {timestamps.timeResolved}</Typography>
                        </Box>
                    

                        
                        
                        


                        <TextField
                            id="outlined-helperText"
                            label="Notes:"
                            helperText="Insert any special notes"
                            value={notes} 
                            onChange={(e) => setNotes(e.target.value)}
                        />
                        </>
                    )}    
                </Box>

                
    </Box>
 

                







        </>
        
    )
   
                    }

                    






export default Workflow



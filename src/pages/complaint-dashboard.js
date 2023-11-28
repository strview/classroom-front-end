import {Grid} from "@mui/material"
import { useState } from 'react';
import DownloadingIcon from '@mui/icons-material/Downloading';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import PieChart from "./components/PieChart";
import {UserData, UserData2} from "./Data";

const ComplaintDashboard = () => {

    const [userData2, setUserData2] = useState({
        labels: UserData2.map((data) => data.status), 
        datasets: [
            {
              label: "Status Amount",
              data: UserData2.map((data) => data.statusAmount),
              backgroundColor: ["#04668c", "#45bf55", "#04bfbf"],
            },
        ],    
    });

    const [userData, setUserData] = useState({
        labels: UserData.map((data) => data.type),
        datasets: [
            {
              label: "Type Amount",
              data: UserData.map((data) => data.typeAmount),
              backgroundColor: ["#04668c", "#45bf55", "#04bfbf", "#04668c", "blue", "#4192d9","#96ca2d","#1bbc9b","#168039"],
            },
        ], 
    });
   
    return (
        <>
            <h1>Complaint Dashboard</h1>
            <h2>Download Report&nbsp;<DownloadingIcon></DownloadingIcon></h2>
            <h2>Dark Mode&nbsp;<DarkModeIcon></DarkModeIcon></h2>
            {/*<button type="button" onclick="myFunction()">Dark Mode</button>
            <script>function myFunction() {
				var element = document.getElementById("main");
				element.classList.toggle("dark-mode");
				}</script>
            */}
            
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                    <div className="grid-item">Complaint Status Past Day <PieChart chartData={userData2}/></div>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <div className="grid-item">Compliant Status Past Week <PieChart chartData={userData2}/></div>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <div className="grid-item">Complaint Status Past Month <PieChart chartData={userData2}/></div>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <div className="grid-item">Complaint Types Past Day <PieChart chartData={userData}/></div>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <div className="grid-item">Complain Types Past Week <PieChart chartData={userData}/></div>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <div className="grid-item">Complain Types Past Month <PieChart chartData={userData}/></div>
                </Grid>
                <Grid item xs={12} sm={8} md={6}>
                    <div className="grid-item">
                        <table>
                            <thead>
                                <tr>
                                    <th>Days</th>
                                    <th>Amount New</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><b>0-30 days</b></td>
                                    <td>2</td>
                                </tr>
                                <tr>
                                    <td><b>30-60 days</b></td>
                                    <td>4</td>
                                </tr>
                                <tr>
                                    <td><b>60-90 days</b></td>
                                    <td>6</td>
                                </tr>
                                <tr>
                                    <td><b>90+ days</b></td>
                                    <td>8</td>
                                </tr> 
                            </tbody>
                        </table>   
                    </div>
                </Grid>
                <Grid item xs={12} sm={8} md={6}>
                    <div className="grid-item">
                        <table>
                            <thead>
                                <tr>
                                    <th>Days</th>
                                    <th>Amount In-Progress</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><b>0-30 days</b></td>
                                    <td>2</td>
                                </tr>
                                <tr>
                                    <td><b>30-60 days</b></td>
                                    <td>4</td>
                                </tr>
                                <tr>
                                    <td><b>60-90 days</b></td>
                                    <td>6</td>
                                </tr>
                                <tr>
                                    <td><b>90+ days</b></td>
                                    <td>8</td>
                                </tr> 
                            </tbody>
                        </table>    
                    </div>
                </Grid>
            </Grid>
        </>
    )
}

export default ComplaintDashboard
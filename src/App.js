import { useEffect, useState } from 'react';
import './App.css';
import { getComplaints, createComplaint } from './helpers/apiEndpoints';
import React, { Component } from 'react'

function App() {

  const dummyCompaints = [
    {
      "id": "1",
      "message": "This is a dummy complaint",
    },
    {
      "id": "2",
      "message": "This is another dummy complaint",
    }
  ]
  const [complaints, setComplaints] = useState(dummyCompaints)

  useEffect(() => {
    const fetchComplaints = async () => {
      const { apiEndpoint, apiOptions } = await getComplaints()
      console.log("apiEndpoint", apiEndpoint)
      const response = await fetch(apiEndpoint, apiOptions)
      console.log("response", response)
      const data = await response.json()
      console.log(data)
      setComplaints(data)
    }
    fetchComplaints()
  }, [])

//Create 
const handleSubmit = async (event) => {
  event.preventDefault()
  const complaint = {
    message: event.target.message.value,
    source: "james-front-end",
    submitter: event.target.submitter.value,
    type: event.target.type.value,
  }
  console.log("complaint", complaint)
  const { apiEndpoint, apiOptions } = await createComplaint(complaint)
  console.log("apiEndpoint", apiEndpoint)
  const response = await fetch(apiEndpoint, apiOptions)
  console.log("response", response)
  const data = await response.json()
  console.log(data)
  setComplaints([...complaints, data])
}

const CoolTable = ({data}) => {

  const result = data.filter((item) => item.source === "Ethan-front-end")

  return (
          <table>
            <thead>
                <tr>
                  <th>Message</th>
                  <th>Submitter</th>
                  <th>Source</th>
                  <th>Type</th>
                  <th>Date</th>
                </tr>
            </thead>
            <tbody>
              {result.map((complaint) => (
                <tr key={complaint.id}>
                  <td>{complaint.message}</td>
                  <td>{complaint.submitter}</td>
                  <td>{complaint.source}</td>
                  <td>{complaint.type}</td>
                  <td>{complaint.created_at}</td>
                </tr> 
              ))}
            </tbody>
          </table>
  )
}

  return (
    <div className="App">
      <header className="App-header">
        <div>
        <h1>Complaint Portal</h1>
        </div>  
      
        <div>
          <hr></hr>
          <h2>Enter your complaint(s)</h2>
          <form onSubmit={handleSubmit}>
            Message &emsp;&emsp;&emsp;<input type="text" name="message" /> 
            <br/>
            Submitter &emsp;&emsp;&nbsp; <input type="text" name="submitter" />
            <br/>
            Complaint Type <input type="text" name="type" />
            <br/>
            <button type="submit">Submit Complaint</button>
          </form>
        </div>
        
        <div>
          <hr/>
          <h2>Complaints</h2>
          <CoolTable data={complaints}/> 
        </div>
          
      </header>
    </div>
  );

}

export default App;
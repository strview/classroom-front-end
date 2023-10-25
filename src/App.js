import { useEffect, useState } from 'react';
import './App.css';
import { getComplaints, createComplaint } from './helpers/apiEndpoints';
import React, { Component } from 'react'
import { useTable } from 'react-table';

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
class Table extends Component {

  constructor(props) {

     super(props) //since we are extending class Table so we have to use super in order to override Component class constructor

     this.state = { //state is by default an object

        students: [

           { Message: 1, name: 'deepak', age: 21, email: 'deepak@email.com' },

           { id: 2, name: 'arsad', age: 19, email: 'arsad@email.com' },

           { id: 3, name: 'raman', age: 16, email: 'raman@email.com' },

           { id: 4, name: 'ajeet', age: 25, email: 'ajeet@email.com' }

        ]

     }

  }
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
          <table>
          {complaints.map((complaint) => (
            <div key={complaint.id}>
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
              
              <tr>
                <td>{complaint.message}</td>
                <td>{complaint.submitter}</td>
                <td>{complaint.source}</td>
                <td>{complaint.created_at}</td>
              </tr>
              </tbody>
              
            </div>
          ))}
          
          </table>
        </div>
        
      </header>
    </div>
  );

}

export default App;
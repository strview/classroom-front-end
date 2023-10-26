import { useEffect, useState } from 'react';
import './App.css';
import { getComplaints, createComplaint } from './helpers/apiEndpoints';

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
    source: "kobe-front-end",
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


  return (
    <div className="App">
      <header className="App-header">
       
        <p>
          Complaint Portal
        </p>
        
        <div>
          <hr></hr>
          <h2>Submit a complaint</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" name="message" />
            <input type="text" name ="Name" />
            <input type="text" name = "Type" />
            <button type="submit">Submit Complaint</button>
          </form>
        </div>
 

        <div>
        <hr/>
      <h2>Sample Table</h2>
      <table>
      <thead>
        <tr>
          <th>Month</th>
          <th>Savings</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>January</td>
          <td>$100</td>
        </tr>
        <tr>
          <td>February</td>
          <td>$80</td>
        </tr>
      </tbody>

    </table>

      </div>




        <div>
          <hr/>
          <h2>Complaints</h2>
          <table>
          <thead>
            <tr>
              <th> Complaint Message</th>
              <th>Complaint Submitter</th>
              <th>Complaint Source </th>
              <th>Complaint Type</th>
              <th>Complaint Date</th>
            </tr>
            </thead>
            <tbody>
              <tr>
                <td> {complaints.message}</td>
                <td> {complaints.submitter}</td>
                <td> {complaints.source}</td>
                <td> {complaints.type}</td>
                <td> {complaints.created_at}</td>
              </tr>
            </tbody>

          {complaints.map((complaint) => (
            <div key={complaint.id}>
              <p>{complaint.message} | {complaint.submitter} | {complaint.source} | {complaint.created_at}</p>

            </div>
          ))}
          </table>
        </div>
        
      </header>
    </div>
  );
}

export default App;
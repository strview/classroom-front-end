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
    source: "Ethan-front-end",
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
            <label for="complaint">Complaint:</label><br></br>
            <input type="text" name="message" /><br></br>
            <label for="submitter">Name:</label><br></br>
            <input type="text" name="submitter" /><br></br>
            <input type="radio" id="type1" name="type"/>
            <label for="type1">Parking</label><br></br>
            <input type="radio" id="type2" name="type"/>
            <label for="type2">Noise</label><br></br>
            <input type="radio" id="type3" name="type"/>
            <label for="type3">Cleanliness</label><br></br>
            <input type="radio" id="type4" name="type"/>
            <label for="type4">Other</label><br></br>
            <button type="submit">Submit Complaint</button>
          </form>
        </div>

        

      
      <div>
  <hr />
  <h2>Complaints</h2>
  <table>
    <thead>
      <tr>
        <th>Message</th>
        <th>Submitter</th>
        <th>Source</th>
        <th>Type</th>
        <th>Created</th>
      </tr>
    </thead>
    <tbody>
      {complaints.map((complaint) => (
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
</div>



        
        
      </header>
    </div>
  );
}

export default App;
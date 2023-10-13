import { useEffect, useState } from 'react';
import './App.css';
import { getComplaints } from './helpers/apiEndpoints';

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

  return (
    <div className="App">
      <header className="App-header">
       
        <p>
          Complaint Portal
        </p>
        <div>
          {complaints.map((complaint) => (
            <div key={complaint.id}>
              <p>{complaint.message} | {complaint.submitter} | {complaint.source} | {complaint.type} | {complaint.created_at} </p>
            </div>
          ))}
        </div>
        
      </header>
    </div>
  );
}

export default App;

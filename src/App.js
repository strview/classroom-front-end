
import './App.css'
import OldPage from './pages/old-page'
import Examples from './pages/examples'
import TabbedLayout from './layout/tabbed-layout'
import ComplaintDashboard from './pages/complaint-dashboard'
import ComplaintWorkflow from './pages/complaint-workflow'
import SubmitComplaint from './pages/submit-complaint'

function App() {
  const tabLabels = [  "Submit Complaint", "Complaint Workflow", "Complaint Dashboard", "Examples", "Old Page"]
  const tabPanels = [  <SubmitComplaint />, <ComplaintWorkflow />, <ComplaintDashboard />, <Examples />, <OldPage />]
  return (
    <>
        <TabbedLayout  
          tabLabels={tabLabels} 
          tabPanels={tabPanels}
        />
    </>
  )
}

export default App;
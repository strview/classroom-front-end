
import './App.css'
import OldPage from './pages/old-page'
import Examples from './pages/examples'
import TabbedLayout from './layout/tabbed-layout'

function App() {
  const tabLabels = [ "Examples", "Old Page",]
  const tabPanels = [ <Examples />, <OldPage />,]
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
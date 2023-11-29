//import './workforce.css';
import '../App.css';


const ComplaintWorkflow = () => {
    return (
        <>  
        <div className='whole'>
            <div className='header'>
                <h1>Complaint Workflow</h1>
                <small>Powered by Azura</small>
                <div className='bubble'>EM</div>
                <div className='log'>
                    <button>Logout</button>
                </div>    
            </div>
            <div className="therest">
            <div className="leftside">
                <h1>this is gonna be the leftside </h1> 
                <p>
                    <ul>
                        <li>New Complaints</li>
                        <li>Complaints in Progress</li>
                        <li>Make a Complaint</li>
                        <li>Forwarded Complaints</li>
                        <li><a href='https://www.dhcd.virginia.gov/codes' target='_blank'>Code Office</a></li>

                    </ul>
                </p>

            </div>

            <div className="rightside">
                <p>I want this to be the rightside. data and stuff is this still wokring</p>


            </div>
            </div>
        </div>
        </>
            
    )
}



export default ComplaintWorkflow
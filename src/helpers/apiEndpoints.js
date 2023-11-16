


/** This is a helper function to get the api endpoint and options for the api call
 * 
 * @param {string} method - The api verb (GET, POST, etc)
 * @returns {string, object} - The api verb (GET, POST, etc) and the content type within the headers
 */
const getApiOptions = async (method) => {
    const apiOptions = {
        method: method,
        // mode : 'no-cors', // no-cors, *cors, same-origin
        headers: {
            'Content-Type': 'application/json',
        }
    }
    return apiOptions
}

/** This function returns the api endpoint and options for the api call to get the complaints
 * 
 * @returns {string, object} - The api endpoint and options for the api call
 */
export const getComplaints = async () => {
    const urlBase = "https://ypibol5gl3.execute-api.us-east-2.amazonaws.com/dev"
    const apiOptions = await getApiOptions('GET')
    const apiEndpoint = urlBase + '/complaint/query?mode=complaintsOnly'
    return {
        apiEndpoint: apiEndpoint,
        apiOptions: apiOptions
    }
}

/** This function returns the api endpoint and options for the api call to create a new complaint
 * @param {object} complaint - The complaint object to be created
 * @returns {string, object} - The api endpoint and options for the api call
 */
export const createComplaint = async (complaint) => {
    const urlBase = "https://ypibol5gl3.execute-api.us-east-2.amazonaws.com/dev"
    const apiOptions = await getApiOptions('POST')
    const apiEndpoint = urlBase + '/complaint/create'
    apiOptions.body = JSON.stringify(complaint)
    return {
        apiEndpoint: apiEndpoint,
        apiOptions: apiOptions
    }   
}
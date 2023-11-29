
const URL_BASE = "https://ypibol5gl3.execute-api.us-east-2.amazonaws.com/dev"

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
    const urlBase = URL_BASE
    const apiOptions = await getApiOptions('GET')
    const apiEndpoint = urlBase + '/complaint/query?mode=complaintsOnly'
    return {
        apiEndpoint: apiEndpoint,
        apiOptions: apiOptions
    }
}

/** This function returns the api endpoint and options for the api call to get a single complaint.
 * 
 * @param {string} id - The id of the complaint to get
 * @param {string} mode - (optional) if you want to get the complaint with the workflow history, pass in 'all'
 * @returns {string, object} - The api endpoint and options for the api call
 */
export const getComplaint = async (id, mode = null) => {
    const urlBase = URL_BASE
    const apiOptions = await getApiOptions('GET')
    let apiEndpoint = urlBase + '/complaint/get?id=' + id
    if (mode) {
        apiEndpoint += '&mode=' + mode
    }
    return {
        apiEndpoint: apiEndpoint,
        apiOptions: apiOptions
    }
}

/** This function returns the api endpoint and options for the api call to update a complaint
 * 
 * @param {string} id - The id of the complaint to update
 * @param {string} key - The key of the complaint to update
 * @param {string} value - The value of the complaint to update
 * @returns {string, object} - The api endpoint and options for the api call
 */
export const updateComplaint = async (id, key, value) => {
    const urlBase = URL_BASE
    const apiOptions = await getApiOptions('POST')
    const apiEndpoint = urlBase + '/complaint/update?id=' + id + '&key=' + key + '&value=' + value
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
    const urlBase = URL_BASE
    const apiOptions = await getApiOptions('POST')
    const apiEndpoint = urlBase + '/complaint/create'
    apiOptions.body = JSON.stringify(complaint)
    return {
        apiEndpoint: apiEndpoint,
        apiOptions: apiOptions
    }   
}
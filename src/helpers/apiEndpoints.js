


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

export const getComplaints = async () => {
    const urlBase = "https://ypibol5gl3.execute-api.us-east-2.amazonaws.com/dev"
    const apiOptions = await getApiOptions('GET')
    const apiEndpoint = urlBase + '/complaint/query'
    return {
        apiEndpoint: apiEndpoint,
        apiOptions: apiOptions
    }
}
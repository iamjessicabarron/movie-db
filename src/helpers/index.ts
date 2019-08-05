const getFromApi = (path: string, params: string | null) => {
let baseUrl = process.env.REACT_APP_API_BASE_URL
let apiKey = process.env.REACT_APP_API_KEY

let paramsString = params !== null ? params : ""

let url = `${baseUrl}${path}?api_key=${apiKey}${paramsString}`

  return fetch(url)
  .then(response => response.json())
  .then(data => {
    return data
  })
  .catch(err => {
    console.log("There was a problem fetching", path, "at", baseUrl, "with params", params)
  })
}

export { getFromApi }
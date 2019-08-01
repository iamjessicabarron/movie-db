const getFromApi = (path: string) => {
let baseUrl = process.env.REACT_APP_API_BASE_URL
let apiKey = process.env.REACT_APP_API_KEY

let url = `${baseUrl}${path}?api_key=${apiKey}`

  return fetch(url)
  .then(response => response.json())
  .then(data => {
    return data
  })
}

export { getFromApi }
const baseUrl = 'http://localhost:3000/api/v1/'

export default class AuthAdapter {
  static login = (loginParams) => {
    return fetch(`${baseUrl}auth`, {
      method: 'POST',
      body: JSON.stringify(loginParams),
      headers: headers()
    }).then(resp => resp.json())
  }

  static currentUser = () => {
    return fetch(`${baseUrl}me`, {
      
    })
  }
}

function headers () {
  return {
    'content-type': 'application/json',
    'accept': 'application/json',
    'Authorization': ''
  }
}

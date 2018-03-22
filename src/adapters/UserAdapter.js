const baseUrl = 'http://localhost:3000/api/v1/'

export default class UserAdpater {
  static createUser(params) {
    fetch(`${baseUrl}users`, {
      method: 'post',
      body: JSON.stringify(params),
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      }
    }).then(resp => resp.json())
  }
}

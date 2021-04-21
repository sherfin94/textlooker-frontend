import api from '../api'

describe('#login', () => {
  test('it contains login function', () => {
    const username = 'user'
    const password = 'password'

    expect(api.login(username, password)).toBe(true)
  })
})
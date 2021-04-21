import api from '../api'

describe('Signup and login', () => {

  const email = 'testuser@gmail.com'
  const password = 'testpassword'

  xtest('returns true on successful sign up', async () => {
    expect(api.signup(email, password)).toEqual(true)
  })
 
  xtest('returns true on successful verification', async () => {
    expect(api.verify(email, password, verificationToken)).toEqual(true)
  })

  test('returns status(true) and token on successful login', async () => {

    expect(await api.login(email, password)).toEqual(
      [true, expect.any(String)]
    )
  })

  test('returns status(false) on failed login', async () => {
    const password = 'wrongpassword'

    expect(await api.login(email, password)).toEqual(
      [false, expect.any(String)]
    )
  })
})
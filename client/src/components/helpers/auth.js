// ? Gets token from local storage
export const getTokenFromLocalStorage = () => {
  return window.localStorage.getItem('londonmapper')
}

// ? Splits the token then returns the payload encoded using base64
export const getPayload = () => {
  const token = getTokenFromLocalStorage()
  if (!token) return
  const payload = token.split('.')[1]
  return JSON.parse(atob(payload))
}

// ? Checks if user is authenticated
export const userIsAuthenticated = () => {
  const payload = getPayload()
  if (!payload) return false
  const currentTime = Math.floor(Date.now() / 1000)
  return currentTime < payload.exp
}

// ? Checks if payload ID matches owner ID
// export const userIsOwner = (singlePlant) => {
//   const payload = getPayload()
//   if (!payload) return
//   return singlePlant.owner === payload.sub
// }
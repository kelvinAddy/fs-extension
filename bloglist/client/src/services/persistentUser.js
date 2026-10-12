const getUser = (key, initValue) => {
  try {
    const item = window.localStorage.getItem(key)
    return item ? JSON.parse(item) : initValue
  } catch (error) {
    console.error(error, 'Your initial value will be used instead')
    return initValue
  }
}

const removeUser = async (key) => {
  try {
    window.localStorage.removeItem(key)
  } catch (error) {
    console.error(error)
  }
}

const saveUser = async (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(error)
  }
}

export default { removeUser, saveUser, getUser }


export const validateEmail = (email) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return (true)
  } else {
    return (false)
  }
}

export const mataching = (password, password1) => {
  if (!password) {
    return false
  }

  if (password === password1) {
    return true
  } else {
    return false
  }
}

export const requiredLength = (password) => {
  if (password.length >= 8) {
    return true
  } else {
    return false
  }
}

export const emptyString = (string) => {
  if (string) {
    return true
  }
}

export const Validationfunc = (validationResult, message) => {
  if (!validationResult) {
    return { error: true, helpText: message }
  } else {
    return { error: false, helpText: '' }
  }
}

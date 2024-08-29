export const useTestPassword = (password: string) => {
  const uppercaseRegex = /[A-Z]/
  const lowercaseRegex = /[a-z]/
  const numberRegex = /\d/
  const specialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/

  return {
    upperCaseTest: uppercaseRegex.test(password),
    lowerCaseTest: lowercaseRegex.test(password),
    numberTest: numberRegex.test(password),
    specialCharacterTest: specialCharRegex.test(password),
  }
}

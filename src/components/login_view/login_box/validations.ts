export function validateEmail(email:string):boolean {
  let re:RegExp = /\S+@\S+\.\S+/
  return re.test(email)
}

export function validatePassword(password:string):[boolean, string[]] {
  let issues:string[] = []
  if(password.length < 6) issues.push('Password should be atleast 6 letters')
  // if(numberOfUpperCaseLetters(password) < 1) issues.push('Password should contain atleast 1 uppercase letter')
  return [issues.length === 0, issues]
}

// function numberOfUpperCaseLetters(string:string):number {
//   let count = 0
//   for(let i = 0; i < string.length; i++) {
//     const letter:string = string[i]
//     if(letter >= 'A' && letter <= 'Z') count++
//   }
//   return count
// }
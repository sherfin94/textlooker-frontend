import { loginViewIssues } from '../../store'

export let clearIssues = () => {
  loginViewIssues.update(_ => [])
}

export let setIssues = (issues:string[]) => {
  loginViewIssues.update(_ => issues)
}
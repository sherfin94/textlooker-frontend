import { loginViewIssues } from '../../store'

export let clearIssues = () => {
  loginViewIssues.update(_ => [])
}
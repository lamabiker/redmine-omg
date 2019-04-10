const config = {
  options: {
    redirectIssues: true
  },
  root: 'https://redmine.storyful.com',
  paths: {
    taskboard: '/rb/projects/mercury/taskboard'
  },
  getPath(item) {
    return `${this.root}${this.paths[item]}`;
  },
  setOptions(options) {
    for (option in options) {
      this.options[option] = options[option];
    }
  }
}

const customButtons = [
  {
    button: '👍',
    title: 'Add PO sign off story',
    ticketText: '[PO] sign off',
    assignee: 105 // Shweta
  },
  {
    button: '🤖',
    title: 'Add dev sign off story',
    ticketText: 'PR, merge, release, deploy'
  },
  {
    button: '✔︎',
    title: 'Do it',
    ticketText: 'Do it'
  },
  {
    button: '︎🔧',
    title: 'Fix it',
    ticketText: 'Fix it'
  }
];
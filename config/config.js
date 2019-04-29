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
};

const today = () => {
  const date = new Date();
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

const deleteableElements = [
  '.remaininghours'
];

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
    button: '🕵️‍',
    title: 'Investigate',
    ticketText: 'Investigate'
  },
  {
    button: '︎🔧',
    title: 'Fix it',
    ticketText: 'Fix it'
  },
  {
    button: '📅',
    title: 'Set deploy date to today',
    ticketText: today()
  }
];
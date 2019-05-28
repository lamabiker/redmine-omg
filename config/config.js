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

const customStories = [
  {
    subject: 'Tech Work',
    type: 3,
    storyPoints: '1.0'
  },
  {
    subject: 'Chapter work',
    type: 3
  },
  {
    subject: 'Gold Card',
    type: 10,
    storyPoints: '1.0'
  },
  {
    subject: 'Retro Action',
    type: 11,
    storyPoints: '1.0'
  },
  {
    subject: 'Who is doing the next retro?',
    type: 11
  }
]

const customButtons = [
  {
    button: '👍',
    title: 'Add PO sign off story',
    ticketText: '[PO] sign off',
    assignee: 105, // Shweta
    hours: 1
  },
  {
    button: '🤖',
    title: 'Add dev sign off story',
    ticketText: 'PR, merge, release, deploy',
    hours: 1
  },
  {
    button: '✔︎',
    title: 'Do it',
    ticketText: 'Do it',
    hours: 1
  },
  {
    button: '🕵️‍',
    title: 'Investigate',
    ticketText: 'Investigate',
    hours: 1
  },
  {
    button: '︎🔧',
    title: 'Fix it',
    ticketText: 'Fix it',
    hours: 1
  },
  {
    button: '📅',
    title: 'Set deploy date to today',
    ticketText: today()
  }
];
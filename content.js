chrome.storage.local.get(['redirectIssues'], function(items) {
  if(items.redirectIssues === undefined) {
    config.setOptions({ redirectIssues: true });
    chrome.storage.local.set({ redirectIssues: true }, init);
  } else {
    config.setOptions({ redirectIssues: items.redirectIssues });
    init();
  }
});

function init() {
  // Redirect to taskboard from issues
  if(config.options.redirectIssues && window.location.href.match(/.*\/(.*)$/)[1] === 'issues') {
    window.location.replace(config.getPath('taskboard'));
  }

  addElements('issue', addDeleteButton);
  addElements('story', addNewTaskButton);

  setInterval(() => addElements('issue', addDeleteButton), 5000);
}

function addElements(selector, callback) {
  const items = document.getElementsByClassName(selector);
  Array.prototype.filter.call(items, callback);
}

function addDeleteButton(issue) {
  const header = issue.querySelector('.t');

  if(!header || header.querySelector('.delete-issue')) return;

  if(header && header.innerHTML) {
    header.innerHTML = `
      <a
        href="/issues/${issue.id.substring(6)}"
        class="icon icon-del delete-issue"
        data-confirm="Are you sure you want to delete the selected issue(s)?"
        data-method="delete"
        rel="nofollow">
        &nbsp;
      </a>
      ${header.innerHTML}
    `;

    header.classList += ` issue-header`;
  }
}

function addNewTaskButton(story) {
  const storyHeader = story.querySelector('.story_tooltip');

  if(!storyHeader) return;

  customButtons.forEach(customButton => {
    let { button, title, ticketText, assignee } = customButton;
    let buttonElement = createTaskButton(button, title);
    buttonElement.onclick = () => { createTask(story, ticketText, assignee) };
    storyHeader.appendChild(buttonElement);
  });
}

function createTaskButton(text, title, story) {
  const button = document.createElement('button');
  button.className = 'custom-button';
  button.innerHTML = text;
  button.title = title;

  return button;
}

function createTask(story, ticketText, assignee) {
  story.querySelector('.add_new').click();
  document.querySelector('#task_editor [name="subject"]').value = ticketText;
  if(assignee) document.querySelector('#task_editor [name="assigned_to_id"]').value = assignee;

  const buttons = document.querySelectorAll('.ui-button-text');

  buttons[1].click(); // 'OK' button
}
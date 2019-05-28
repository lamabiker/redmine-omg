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
  if(config.options.redirectIssues &&
     window.location.href.match(/.*\/(.*)$/)[1] === 'issues') {
    window.location.replace(config.getPath('taskboard'));
  }

  hideElements(deleteableElements);

  addElements('issue', addDeleteButton);
  addElements('story', addNewTaskButton);

  setInterval(() => {
    addElements('issue', addDeleteButton);
    checkDateTickets();
  }, 5000);

  if(window.location.href.indexOf('master_backlog') > -1) {
    window.setTimeout(initBacklogPage, 1000);
  }
}

function initBacklogPage() {
  const backlog = document.getElementById('sprint_backlogs_container');
  const button = document.createElement('button');
  button.className = 'add-stories-button';
  button.innerHTML = `Add stuff`;
  button.onclick = injectBaseStories;

  backlog.insertBefore(button, backlog.firstChild);
}

function injectBaseStories() {
  customStories.forEach(injectBaseStory);
}

function storyAlreadyThere(subject) {
  const stories = document.querySelectorAll('#sprint_backlogs_container .story_field[fieldtype="textarea"]');
  return ![...stories].every(story => story.innerHTML.indexOf(subject) === -1);
}

function injectBaseStory(story) {
  const { subject, type, storyPoints } = story;

  if (storyAlreadyThere(subject)) return;
  
  const newStoryButton = document.querySelector('.add_new_story.project_id_32');
  const mouseupEvent = new MouseEvent('mouseup', {
    view: window, cancelable: true, bubbles: true
  });
  
  newStoryButton.dispatchEvent(mouseupEvent);

  document.querySelector('textarea[name="subject"]').value = subject;
  if (type)
    document.querySelector('select[name="tracker_id"]').value = type;
  if (storyPoints)
    document.querySelector('select[name="story_points"]').value = storyPoints;

  document.querySelector('.edit-actions .save').click();
}

function checkDateTickets() {
  const regex = /^([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{4})/g;

  document.querySelectorAll('.subject').forEach(field => {
    const test = regex.exec(field.textContent);
    if (test) {
      const dateTs = new Date(`${test[3]}-${test[2]}-${test[1]}`).valueOf();
      const todayTs = new Date().setHours(0,0,0,0).valueOf();
      
      if(dateTs !== todayTs && !field.classList.contains('has-warning')) {
        // const warning = document.createTextNode(' ⚠️ ');
        // field.appendChild(warning);
        field.classList.add('has-warning');
      }
    }
  })
}

function addElements(selector, callback) {
  const items = document.getElementsByClassName(selector);
  Array.prototype.filter.call(items, callback);
}

function hideElements(elements) {
  if(!Array.isArray(elements)) return;

  elements.forEach(element => {
    document.querySelectorAll(element).forEach(e => e.style.display = 'none');
  });
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
    const { button, title } = customButton;
    const buttonElement = createTaskButton(button, title);
    buttonElement.onclick = () => { createTask(story, customButton) };
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

function createTask(story, taskDetails) {
  const { ticketText, assignee, hours } = taskDetails;
  const queryStr = name => `#task_editor [name="${name}"]`;

  story.querySelector('.add_new').click();

  document.querySelector(queryStr('subject')).value = ticketText;

  if(hours) document.querySelector(queryStr('remaining_hours')).value = hours;
  if(assignee) document.querySelector(queryStr('assigned_to_id')).value = assignee;

  const buttons = document.querySelectorAll('.ui-button-text');

  buttons[1].click(); // 'OK' button
}
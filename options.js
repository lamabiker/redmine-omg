chrome.storage.local.get(['redirectIssues'], function(items) {
  const redirectIssues = items.redirectIssues;

  let checkbox = document.getElementById('redirect_from_issues');
      checkbox.checked = redirectIssues;

  checkbox.addEventListener('change', function() {
    chrome.storage.local.set({redirectIssues: checkbox.checked}, function() {
      console.log('Redirecting from issues is ' + checkbox.checked);
    });
  });
});
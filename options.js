chrome.storage.local.get(['redirectIssues'], function(items) {
  const redirectIssues = items.redirectIssues;

  const redIrectCB = document.getElementById('redirect_from_issues');
        redIrectCB.checked = redirectIssues;

  redIrectCB.addEventListener('change', function() {
    chrome.storage.local.set({redirectIssues: redIrectCB.checked}, function() {
      console.log('Redirecting from issues is ' + redIrectCB.checked);
    });
  });
});
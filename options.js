// Saves options to chrome.storage
function save_options() {
  var columns = document.getElementById('columns').value;
  var showRanges = document.getElementById('ranges').checked;
  chrome.storage.sync.set({
    columns: columns,
    showRanges: showRanges
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
  
  chrome.runtime.sendMessage({"message": "option_update"});
}

function restore_options() {
  chrome.storage.sync.get({
    columns: 3,
    showRanges: true
  }, function(items) {
    document.getElementById('columns').value = items.columns;
    document.getElementById('ranges').checked = items.showRanges;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
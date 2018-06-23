function updateWithPreferences(preferences) {
    updateRangePreference(preferences.showRanges);
    updateColumnPreference(preferences.columns);
}

function updateRangePreference(showRanges) {
    var bodyClassList =  document.body.classList;

    var hasRangeClass = bodyClassList.contains("show-ranges");
    if (showRanges && !hasRangeClass) {
        bodyClassList.add("show-ranges");
    } else if (!showRanges && hasRangeClass) {
        bodyClassList.remove("show-ranges");
    }
}

function updateColumnPreference(columns) {
    var colClasses = {
        NO_PREFERENCE: "col-none",
        ONE_COLUMN: "col-1",
        TWO_COLUMN: "col-2",
        THREE_COLUMN: "col-3",
        FOUR_COLUMN: "col-4"
    }

    var possibleClassKeys = Object.keys(colClasses);

    for (i = 0; i < possibleClassKeys.length; i++) {
        removeExistingColumnClass(colClasses[possibleClassKeys[i]]);
    }

    var bodyClassList =  document.body.classList;
    bodyClassList.add(colClasses[possibleClassKeys[columns]]);
}

function removeExistingColumnClass(columnClass) {
    var bodyClassList =  document.body.classList;

    if (bodyClassList.contains(columnClass)) {
        bodyClassList.remove(columnClass);
    }
}

chrome.storage.sync.get({"showRanges": true, "columns": 3}, function(prefs) {
    updateWithPreferences(prefs);
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message == "option_update") {
    chrome.storage.sync.get({"showRanges": true, "columns": 3}, function(prefs) {
        updateWithPreferences(prefs)
    });
  }
});
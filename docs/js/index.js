/* Do not remove
GPL 3.0 License
Copyright (c) 2020 Mani
*/

var deckName = "Addon in browser";

// add note data to pyodide output text file for deck export
var textToExport = "";
var textFileName = "";
function addNoteToList() {
    textFileName = "output-all-notes.txt";
    
    var container = document.getElementById("add-note");

    // tab separated value for genanki
    for (i = 0; i < container.childElementCount; i++) {
        textToExport += container.children[i].children[1].value.trim() + "\t";
    }

    // remove last space, tab...
    textToExport = textToExport.trim();

    // write to file using pyodide
    pyodide.runPython("textFileName = js.textFileName")
    pyodide.runPython("textToExport = js.textToExport")

    pyodide.runPython(`with open(textFileName, 'a', encoding='utf-8') as f: 
                            f.write(textToExport)`)

    showSnackbar("Note added to list");

    clearNote();
}

function clearNote() {
    var container = document.getElementById("add-note");
    for (i = 0; i < container.childElementCount; i++) {
        container.children[i].children[1].value = "";
    }
}

function showSnackbar(msg) {
    var x = document.getElementById("snackbar");

    x.innerHTML = msg;
    x.className = "show";

    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

// export and download deck 
function exportAll() {
    document.getElementById('statusMsg').innerHTML = "Wait, deck generating...";
    setTimeout(function () { document.getElementById('statusMsg').innerHTML = ""; }, 2000);

    exportDeck();
    downloadDeck();
}

// https://stackoverflow.com/questions/6604192/showing-console-errors-and-alerts-in-a-div-inside-the-page
if (typeof console != "undefined")
    if (typeof console.log != 'undefined')
        console.olog = console.log;
    else
        console.olog = function () { };

console.log = function (message) {
    console.olog(message);
    document.getElementById("pyodide-load-msg").innerHTML += '<p>' + message + '</p>';
};
console.debug = console.info = console.log

console.error = function (message) {
    console.error(message);
    document.getElementById("pyodide-load-msg").innerHTML += '<p style="color:red;">' + message + '</p>';
};

function closeConsole() {
    document.getElementById("pyodide-load-status").style.display = "none";
}
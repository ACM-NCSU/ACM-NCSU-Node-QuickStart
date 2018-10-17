'use strict';
// This file hold functions run by the 'renderer' process
// All of the Node.js APIs are available in this process.
var ipcRenderer = require('electron').ipcRenderer;
const path = require("path");



function openHome() {
    ipcRenderer.send('show-home');
}

function order() {
    ipcRenderer.send('show-order-page');
}


// Called when submit is clicked.
// Put together sandwich options into object, send to main process
function submitOrder() {

    var toppings = []
    if (document.getElementById('salamiChk').checked) {
        toppings.push('salami')
    }
    if (document.getElementById('lettuceChk').checked) {
        toppings.push('lettuce')
    }
    if (document.getElementById('tomatoesChk').checked) {
        toppings.push('tomatoes')
    }
    var toppings_str = toppings.join(', ')

    var params = { 'name': document.getElementById('name').value,
                   'breadType': document.getElementById('breadType').value,
                   'toppings': toppings_str,
                   'notes': document.getElementById('notes').value
                 }

    ipcRenderer.send('place-order', params);
}


ipcRenderer.on('confirm-order', function(event, params) {

    // Dynamically fill page with parameters
    var h3 = document.getElementById('confirmation-h3')
    var h3_txt = h3.innerHTML
    h3.innerHTML = "Thanks for your order, " + params.name + "!"

    var p = document.getElementById('confirmation-p')

    var msg = "Your sandwich with " + params.toppings + " on " +
              params.breadType + " bread is being prepared. You are number " +
              params.position + " in line."
    p.innerHTML = msg

    var notes = document.getElementById('confirmation-notes')
    notes.innerHTML = params.notes

});

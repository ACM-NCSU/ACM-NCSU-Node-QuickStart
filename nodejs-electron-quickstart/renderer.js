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

function submitOrder(event) {
    event.preventDefault();
    console.log(document.getElementById('breadType'))

}

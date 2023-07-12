window.onload = (e) => {

    var div = document.createElement('div'), // Create a new div
    script = document.scripts[document.scripts.length - 1]; // A reference to the currently running script

    
    div.load("./nav.html"); // Add some content to the newly-created div
    script.parentElement.insertBefore(div, script); // Add the newly-created div to the page


    //Straight from stackoverflow :P
};
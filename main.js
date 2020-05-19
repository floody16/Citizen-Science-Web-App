console.log("Hello World");

import {Model} from './model.js';

function redraw() { 

    let content = "<h2>Data</h2><ul>";
    content += "<li><a href='/api/observations'>List of Observations</a></li>";
    content += "<li><a href='/api/users'>List of Users</a></li>"; 
    content += "<li><a href='/api/observations/1'>Details of one observation</a></li>"; 
    content += "</ul>";

    // update the page
    document.getElementById("target").innerHTML = content;
}

function id_submit_handler(e) {

    let id = Model.get_user(this.dataset.id);

    Views.userView("userInfo", user);

}

function bindings() {

    let elements = document.getElementById("user");
    for (let i=0; i<elements.length; i++) {
        elements[i].onclick = id_submit_handler;
    }
}

window.onload = async function() {
    await Model.update_observations();
    // TODO (james) change the number below and you should always get the correct id back.
    const result1 = Model.get_observation(1);
    const result2 = Model.get_observation(2);
    this.console.log('result1: ', result1);
    this.console.log('result2: ', result2);
    redraw();
    bindings();
};


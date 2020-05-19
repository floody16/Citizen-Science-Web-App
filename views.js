function applyTemplate(targetid, templateid, data) {

    console.log(data);

    let target = document.getElementById(targetid);

    let template  = Handlebars.compile(
                        document.getElementById(templateid).textContent
                    )
    target.innerHTML = template(data);

}

function listUsersView(targetid, users) {
    
    applyTemplate(targetid, "users-list-template", {'Users': users});

}

function userView(targetid, user) {

    applyTemplate(targetid, "user-detail-template", user);

}

function listObservationsView(targetid, observations) {

    applyTemplate(targetid, "observations-list-template", {'Observations' : observations});

}

function observationView(targetid, observation) {

    applyTemplate(targetid, "observation-template", observation);

}

function leaderboardView(targetid, user, observation) {

    applyTemplate(targetid, "leaderboard-template", user, observation);

}
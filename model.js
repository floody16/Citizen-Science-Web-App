export {Model};

/* 
 * Model class to support the Citizen Science application
 * this class provides an interface to the web API and a local
 * store of data that the application can refer to.
 * The API generates two different events:
 *   "modelChanged" event when new data has been retrieved from the API
 *   "observationAdded" event when a request to add a new observation returns
*/
    
const Model = {

    observations_url: '/api/observations', 
    users_url:  '/api/users',   
    
    // this will hold the data stored in the model
    data: {
        observations: [],
        users: []
    },

    // update_users - retrieve the latest list of users 
    //    from the server API
    // when the request is resolved, creates a "modelUpdated" event 
    // with the model as the event detail
    update_users: function() {
        return fetch(this.users_url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            this.data.users = data;
            window.dispatchEvent(new Event('modelUpdated'))
        });
        
    },

    // update_observations - retrieve the latest list of observations
    //   from the server API
    // when the request is resolved, creates a "modelUpdated" event 
    // with the model as the event detail
    update_observations: function() {
        return fetch(this.observations_url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            this.data.observations = data;
            let event = new CustomEvent("modelUpdated", {detail: this});
            window.dispatchEvent(event);
        });
        
    },

    // get_observations - return an array of observation objects
    get_observations: function() {
        return this.data.observations;
    },

    
    // get_observation - return a single observation given its id
    get_observation: function(observationid) {
        for (const observation of this.data.observations) {
            if (observation.id === observationid) {
                return observation;
            }
        }
    },
 
    set_observations: function(observations) {
        this.data.observations = observations;
    },

    // add_observation - add a new observation by submitting a request
    //   to the server API
    //   formdata is a FormData object containing all fields in the observation object
    // when the request is resolved, creates an "observationAdded" event
    //  with the response from the server as the detail
    add_observation: function(newObservation) {
        
        // TODO (james) step 1. get a simple version working with hard coded data and send to the end point
        // step 2 make it generic by taking in the new observation object above
        newObservation = new FormData();
        data.append("id", 30);
        data.append("participant", 7)
        data.append("timestamp","2020-04-17T08:53:02.157338")
        data.append("temperature", 2);
        data.append("weather", "\"fine\"");
        data.append("wind", "\"none\"");
        data.append("location", "\"Eastwood\"");
        data.append("height", 3.0);
        data.append("girth", 0.75);
        data.append("leaf_size", "\"small\"");
        data.append("leaf_shape", "\"rounded");
        data.append("bark_colour", "\"grey\"");
        data.append("bark_texture", "\"smooth\"");

        let event = new CustomEvent("observationAdded", {detail: this});
        window.dispatchEvent(event);

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readyStateoChange", function () {
            console.log('state change');
            if (this.readyState === this.DONE) {
              console.log(this.responseText);
            }
        });

        // TODO (james) this sends it to the backend confirm endpoint and try to get it working
        xhr.open("POST","http://127.0.0.1:8010/#!/observations");
        xhr.send(data);

    },

    // get_user_observations - return just the observations for
    //   one user as an array
    get_user_observations: function(userid) {
        // TODO (james) confirm what user observations are this would need to combine the data of both users and observations
        let userObservations = this.get_observations();
        console.log(userObservations);
            if (userObservations === []){
                return [];
            }
            else {
                for(let i=0; i < userObservations.length; i++) {
                    if (userObservations[i].userid == userid) {
                        return userObservations;
                    }
                }
            }
    },  

    // get_recent_observations - return the N most recent
    //  observations, ordered by timestamp, most recent first
    get_recent_observations: function(N) {
        // TODO (try to sort and return the most recent observations by time)
        // Look up sorting this.data.observations.sort((a,b) => {a.timestamp > b.timestamp})
        // Then build and return an array

        console.log("get_recent_observations is called");
        
        var recentObservations = this.data.observations.slice();
        
        recentObservations.sort(function(a, b){
            return (a.timestamp > b.timestamp);    
        });

        console.log(recentObservations);
        return recentObservations;

    },

    /* 
    * Users
    */
    // get_users - return the array of users
    get_users: function() {
        return this.data.users;
    },

    // set_users - set the array of users
    set_users: function(users) {
        this.data.users = users;
    },

    // get_user - return the details of a single user given 
    //    the user id
    get_user: function(userid) {
            for (const user of this.data.users) {
                if (user.id == userid) {
                    return user;
                }           
            }
    }
};
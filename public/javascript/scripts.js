// scripts.js

// listen for a form submit event
// prevent the default form behavior
// serialize the form data into an object
// use axios to initialize a post request and send in the form data
// wait for the success response from the server
// remove the information from the form
// display the data as a new comment on the page
// handle any errors


// Only run this if we find the new-comment element
if (document.getElementById('new-campaign')) {
    // listen for a form submit event
    document.getElementById("new-campaign").addEventListener("submit", e => {
        // prevent the default form behavior
        e.preventDefault();

        // serialize the form data into an object
        let campaign = {};
        const inputs = document.getElementsByClassName('form-control');
        for (var i = 0; i < inputs.length; i++) {
            campaign[inputs[i].name] = inputs[i].value;
        }

        // use axios to initialize a post request and send in the form data

        axios.post('/campaigns', campaign)
            .then(function (response) {
                // wait for the success response from the server
                console.log(response);
                // remove the information from the form
                // display the data as a new comment on the page
            })
            .catch(function (error) {
                console.log(error);
                // handle any errors
                alert('There was a problem saving your campaign. Please try again.')
            });
    });
}
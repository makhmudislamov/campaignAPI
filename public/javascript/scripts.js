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

// We'll need this for re-constructing our delete form
const campaignId = campaign._id;
axios.post('/campaigns', campaign)
    .then(function (response) {
        // wait for the success response from the server
        console.log("response: ", response);
        // remove the information from the form
        document.getElementById('new-campaign').reset();
        // display the data as a new comment on the page
        document.getElementById('campaigns').insertAdjacentHTML('afterbegin',
            `<div class="card">
        <div class="card-block">
            <h4 class="card-title">${response.data.campaign.camp_title}</h4>
            <p class="card-text">${response.data.campaign.camp_duration}</p>
            <p class="card-text">${response.data.campaign.camp_numb}</p>
            <p class="card-text">${response.data.campaign.camp_target}</p>
            <p class="card-text">${response.data.campaign.camp_message}</p>
            <p>
                <form method="POST" action="/campaigns/${response.data.campaign.campaignId}?_method=DELETE">
                    <button class="btn btn-link" type="submit">Delete</button>
                </form>
            </p>
        </div>
    </div>`
        );
    })
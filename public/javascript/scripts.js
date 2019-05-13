// scripts.js

// Make a request to the color api
axios.get('http://www.thecolorapi.com/id?hex=24B1E0')
    .then(function (response) {
        // handle success
        alert(response.data.hex.value);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    });
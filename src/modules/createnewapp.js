// this code is executed only once to obtain the ID of the new APP to create on API server (with console log)

fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/', {
  method: 'POST',
  body: JSON.stringify({
    //name: 'Kanza and Osvaldo Capstone2 Project',
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})

.then((response) => response.json());
console.log(json);

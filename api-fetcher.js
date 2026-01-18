fetch("https://api.eksempel.dk/data", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer minapikey123456"
    }
})
    .then(response => response.json())
    .then(data => {
        console.log("API-svar:", data);
    })
    .catch(error => {
        console.error("Fejl ved API-kald:", error);
    });
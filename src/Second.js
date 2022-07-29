// import  React from 'react'
//
// function authenticate() {
//     return gapi.auth2.getAuthInstance()
//         .signIn({scope: "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.readonly"})
//         .then(function() { console.log("Sign-in successful"); },
//             function(err) { console.error("Error signing in", err); });
// }
// function loadClient() {
//     gapi.client.setApiKey("AIzaSyA5wgijQEivvwvubqVfP3p02YM89c5d3aw");
//     return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/calendar/v3/rest")
//         .then(function() { console.log("GAPI client loaded for API"); },
//             function(err) { console.error("Error loading GAPI client for API", err); });
// }
// // Make sure the client is loaded and sign-in is complete before calling this method.
// function execute() {
//     return gapi.client.calendar.calendarList.get({})
//         .then(function(response) {
//                 // Handle the results here (response.result has the parsed body).
//                 console.log("Response", response);
//             },
//             function(err) { console.error("Execute error", err); });
// }
// gapi.load("client:auth2", function() {
//     gapi.auth2.init({client_id: "589147212334-ipoh0p2h1fjtssbso88ch90e36fkof5e.apps.googleusercontent.com"});
// });
//
//
// const Second = () => {
//
//     return(
//
//         <div>
//
//             <button onClick={()=> {
//                 authenticate().then(loadClient)
//                 console.log(window.gapi)
//             }}>authorize and load</button>
//             <button onClick={()=> {
//                 execute()
//             }}>execute</button>
//         </div>
//     )
// }
//
// export default Second
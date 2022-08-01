import './Main.scss';
import  React from 'react'


const oauthSignIn = () => {
    const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

    // Create <form> element to submit parameters to OAuth 2.0 endpoint.
    const form = document.createElement('form');
    form.setAttribute('method', 'GET'); // Send as a GET request.
    form.setAttribute('action', oauth2Endpoint);

    // Parameters to pass to OAuth 2.0 endpoint.
    const params = {'client_id': '589147212334-ipoh0p2h1fjtssbso88ch90e36fkof5e.apps.googleusercontent.com',
        'redirect_uri': 'http://localhost:3000/view',
        'response_type': 'token',
        'scope': 'https://www.googleapis.com/auth/calendar',
        'include_granted_scopes': 'true',
        'state': 'pass-through value'};

    // Add form parameters as hidden input values.
    for (let p in params) {
        let input = document.createElement('input');
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', p);
        input.setAttribute('value', params[p]);
        form.appendChild(input);
    }

    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    form.submit();
}
const Main = () => {

  return (
    <div className="Main">
        <input className='loginBtn' type='button'  value='login with google' onClick={()=> {
            oauthSignIn()
        }}/>
    </div>
  );
}

export default Main;

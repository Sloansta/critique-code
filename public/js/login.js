// sign up form that POSTS new user data to /api/users
async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector("#password-signup").value.trim();

    if (username && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            console.log('success');
        } else {
            console.log('failure to signup');
        }
    }
}

// login form posts user info to our login route
// async function loginFormHandler(event) {
//     event.preventDefault();

//     const username = document.querySelector('#username-login').value.trim();
//     const password = document.querySelector('#password-login').value.trim();

//     if (username && password) {
//         const response = await fetch('/api/users/login', {
//             method: 'POST',
//             body: JSON.stringify({
//                 username,
//                 password
//             }),
//             headers: { 'Content-Type': 'application/json' }
//         });
//         if (responses.ok) {
//             console.log('success');
//         } else {
//             console.log('failure to login')
//         }
//     }
// }

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
// document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
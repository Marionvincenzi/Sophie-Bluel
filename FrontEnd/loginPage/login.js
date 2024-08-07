//****LOGIN */
const loginUrl = "http://localhost:5678/api/users/login";
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");
const form = document.getElementById("loginForm");
const loginError = document.querySelector(".loginError");
const passwordError = document.querySelector(".passwordError");
const submitButton = document.querySelector("button[type='submit']");

const logUser = {
    email: "",
    password: "",
};


// EVENEMENT AU SUBMIT 

form.addEventListener("submit", (e) => {
    e.preventDefault();
    loginUser();
});

// EVENEMENT AU MAIL

inputEmail.addEventListener("input", (e) => {
    logUser.email = e.target.value;
    inputEmail.style.color ="";
    loginError.textContent ="";
});

//EVENEMENT AU MOT DE PASSE
inputPassword.addEventListener("input", (e) => {
    logUser.password = e.target.value;
    inputPassword.style.color = "";
    passwordError.textContent = "";
});

const isAuth = sessionStorage.getItem('authToken');
loginLink.style.display = isAuth ? 'none' : 'block';
logoutLink.style.display = isAuth ? 'block' : 'none';
document.getElementById('')

//EVENEMENT AU CHARGEMENT DU DOM

document.addEventListener("DOMContentLoaded", () => {
    logUser.email = inputEmail.value;
    logUser.password = inputPassword.value;
    console.log(logUser);
});

//FETCH ROUTE USER

async function loginUser() {
    submitButton.disabled = true;
    try {
       const response = await fetch(loginUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body : JSON.stringify(logUser),
        });

        const data = await response.json();
        console.log(data);
        
        if (response.ok) {
            inputPassword.style.color = "#1d6154";
            passwordError.textContent = "";
            loginError.textContent = "";
            console.log("LogAdmin OK");

            localStorage.setItem("token", data.token);
             window.location.href = "../index.html"
        }else {
            handleErrors(data)
        }
     } catch (error) {
        console.log(error);
        loginError.textContent = "Une errreur s'est produite. Veuillez réessayer."
     } finally {
        submitButton.disabled = false;
     }
}
     function handleErrors(data) {
        
     
        
        if (data.message) {
            loginError.textContent = "Erreur dans l'identifiant !!";
            inputEmail.style.color = "red";
        } else if (data.error) {
            passwordError.textContent = "Erreur dans le mot de passe !!";
            inputPassword.style.color = "red";
            inputEmail.style.color = "#1d6154";
        } else {
          
            loginError.textContent = "Une erreur inconnue s'est produite";
            
         }  
        }

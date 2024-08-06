//****LOGIN */
const loginUrl = "http://localhost:5678/api/users/login";
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");
const form = document.getElementById("loginForm");
const loginError = document.querySelector(".loginError");
const passwordError = document.querySelector(".passwordError");

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
    logUser.email = inputEmail.value;
    inputEmail.style.color ="";
    loginError.textContent ="";
});

//EVENEMENT AU MOT DE PASSE
inputPassword.addEventListener("input", (e) => {
    logUser.password = e.target.value;
    inputPassword.style.color = "";
    passwordError.textContent = "";
})

//EVENEMENT AU CHARGEMENT DU DOM

document.addEventListener("DOMContentLoaded", () => {
    logUser.email = inputEmail.value;
    logUser.password = inputPassword.value;
    console.log(logUser);
});

//FETCH ROUTE USER

async function loginUser() {
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
        
        
        if (data.message) {
            loginError.textContent = "Erreur dans l'identifiant !!";
            inputEmail.style.color = "red";
        } else if (data.error) {
            passwordError.textContent = "Erreur dans le mot de passe !!";
            inputPassword.style.color = "red";
            inputEmail.style.color = "#1d6154";
        } else {
            inputPassword.style.color ="#1d6154";
            passwordError.textContent = "";
            loginError.textContent = "";
            console.log("LogAdmin OK");

            localStorage.setItem("token", data.token);

            window.location.href = "../index.html"
        }

    } catch (error) {
        console.log(error);
    }
}
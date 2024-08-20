// //****LOGIN */
// console.log("login.js chargé");

// const loginUrl = "http://localhost:5678/api/users/login";
// const inputEmail = document.getElementById("email");
// const inputPassword = document.getElementById("password");
// const form = document.getElementById("loginForm");
// const loginSection = document.getElementById("loginForm");
// const loginError = document.querySelector(".loginError");
// const passwordError = document.querySelector(".passwordError");
// const submitButton = document.querySelector("button[type='submit']");

// const logUser = {
//     email: "",
//     password: "",
// };


// // EVENEMENT AU SUBMIT 

// form.addEventListener("submit", (e) => {
//     e.preventDefault();
//     logUser.email = inputEmail.value;
//     logUser.password = inputPassword.value;
//     loginUser();
// });

// // EVENEMENT AU MAIL

// inputEmail.addEventListener("input", (e) => {
//     logUser.email = e.target.value;
//     inputEmail.style.color ="";
//     loginError.textContent ="";
// });

// //EVENEMENT AU MOT DE PASSE
// inputPassword.addEventListener("input", (e) => {
//     logUser.password = e.target.value;
//     inputPassword.style.color = "";
//     passwordError.textContent = "";
// });

// //EVENEMENT AU CHARGEMENT DU DOM

// document.addEventListener("DOMContentLoaded", () => {
//     const token = localStorage.getItem("token");
//     if (token) {
//         window.location.href = "../index.html"
//     } else {

//         loginSection.style.display = "block";
//     }
    
//     logUser.email = inputEmail.value;
//     logUser.password = inputPassword.value;
//     console.log(logUser);
// });

// //FETCH ROUTE USER

// async function loginUser() {
//     submitButton.disabled = true;
//     try {
//        const response = await fetch(loginUrl, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body : JSON.stringify(logUser),
//         });

//         const data = await response.json();
//         console.log(data);
        
//         if (response.ok) {
//             localStorage.setItem("token", data.token);
//              window.location.href = "../index.html"
//         }else {
//             handleErrors(data)
//         }
//      } catch (error) {
//         console.log(error);
//         loginError.textContent = "Une errreur s'est produite. Veuillez réessayer."
//      } finally {
//         submitButton.disabled = false;
//      }
// }
//      function handleErrors(data) {   
//         if (data.message) {
//             loginError.textContent = "Erreur dans l'identifiant !!";
//             inputEmail.style.color = "red";
//         } else if (data.error) {
//             passwordError.textContent = "Erreur dans le mot de passe !!";
//             inputPassword.style.color = "red";
//             inputEmail.style.color = "#1d6154";
//         } else {
          
//             loginError.textContent = "Une erreur inconnue s'est produite";
            
//          }  
//         }


// URL de l'API de connexion
const loginApi = "http://localhost:5678/api/users/login";

// Ajout d'un gestionnaire d'événements pour la soumission du formulaire
document.getElementById("login-section").addEventListener("submit", handleSubmit);

// Fonction asynchrone qui gère la soumission du formulaire
async function handleSubmit(event) {
    event.preventDefault();
    
    const emailElement = document.getElementById("email");
    const passwordElement = document.getElementById("password");

    let user = {
        email: emailElement.value,
        password: passwordElement.value,
    };

    try {
        let response = await fetch(loginApi, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        const previousError = document.querySelector(".error-login");
        if (previousError) {
            previousError.remove();
        }

        console.log("Response Status:", response.status);

        if (response.status !== 200) {
            const errorBox = document.createElement("div");
            errorBox.className = "error-login";
            errorBox.innerHTML = "Veuillez vérifier votre email et/ou votre mot de passe";
            document.querySelector("form").prepend(errorBox);
        } else {
            let result = await response.json();
            const token = result.token;

            console.log("Login Success:", result);

            localStorage.setItem("authToken", token);

            //Vérification de l'enregistrement du token 
            const storedToken = localStorage.getItem("authToken");
            console.log("Token enregistré", storedToken);
            
            // Pour vérifier que la redirection fonctionne
            window.location.href = "../index.html";
        }
    } catch (error) {
        console.error("Erreur lors de la soumission du formulaire:", error);
    }
}
      


    
    
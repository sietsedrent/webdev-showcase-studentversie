// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
class site {
    const inputEmail = document.getElementById('email');
    const inputSubject = document.getElementById('subject');
    const inputDescription = document.getElementById('description');

    const validateEmail = () => {
        if (inputEmail.validity.typeMismatch) {
            inputEmail.setCustomValidity("Voer een geldig e-mailadres in!");
            inputEmail.reportValidity();
        } else if (inputEmail.value.length > 80) {
            inputEmail.setCustomValidity("Email moet niet langer dan 80 tekens zijn!");
        } else {
            inputEmail.setCustomValidity("");
        }
    }

    const validateSubject = () => {
        if (inputSubject.value.length > 200) {
            inputSubject.setCustomValidity("Onderwerp mag niet langer dan 200 tekens zijn!")
        } else {
            inputEmail.setCustomValidity("");
        }
    }

    const validateDescription = () => {
        if (this.inputDescription.value.length > 600) {
            inputDescription.setCustomValidity("Beschrijving mag niet langer dan 600 tekens zijn!");
        }
    }

    const validateForm = () => {
        validateEmail();
        validateSubject();
        validateDescription();
    }

   // Event listener voor email
   // Aanbevolen events voor formulieren: https://github.com/Windesheim-HBO-ICT/client_studenten/blob/main/lessen/week-2/les-1/form-constraint-validation-api/studentversie/events-voor-invoer-validatie.md
   inputEmail.addEventListener("blur", validateEmail);
   inputEmail.addEventListener("input", validateEmail);

    // Selecteer het formelement
    const form = document.querySelector('.form-contactpagina');

   // Event listener voor formulierinzending
   form.addEventListener('submit', function(event) {
        event.preventDefault(); // Voorkom standaard formulierinzending

        // Valideer alle velden voor de zekerheid
        validateForm();

        // Verkrijg CSRF-token van het formulier
        const csrfToken = document.querySelector('input[name="__RequestVerificationToken"]').value;

        // Serialiseer formuliergegevens
        const formData = new URLSearchParams();

        formData.append('email', form.email.value);

        formData.append('__RequestVerificationToken', csrfToken); // Voeg CSRF-token toe

        // Voer een POST-verzoek uit
        fetch('/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded' // Stel de inhoudstype in
            },
            body: formData // Stuur de geserialiseerde formuliergegevens als de body
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Netwerkrespons was niet ok');
                }
                return response.text();
            })
            .then(data => {
                // Verwerk succesvolle formulierinzending
                console.log('Formulier succesvol ingediend:', data);
                // Optioneel: je kunt hier een redirect uitvoeren of een succesbericht tonen
            })
            .catch(error => {
                console.error('Er was een probleem met de formulierinzending:', error);

                alert(error.message)

                // Verwerk fouten hier
            });
    });



}
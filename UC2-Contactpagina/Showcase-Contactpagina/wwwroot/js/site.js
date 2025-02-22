document.addEventListener('DOMContentLoaded', () => {
    // Initialiseer een nieuwe instance van de Site class
    // Initialiseer een nieuwe instance van de Site class
    const site = new Site();

    // Selecteer het emailveld
    const inputEmail = document.getElementById('email');

    // Zorg ervoor dat inputEmail niet null is voordat je er iets mee doet
    if (inputEmail) {
        // Event listeners voor het emailveld
        inputEmail.addEventListener("blur", () => site.validateEmail(inputEmail));
        inputEmail.addEventListener("input", () => site.validateEmail(inputEmail));
    }

    // Selecteer het formelement
    const form = document.querySelector('.form-contactpagina');

    if (form) {
        // Event listener voor formulierinzending
        form.addEventListener('submit', function (event) {
            event.preventDefault(); // Voorkom standaard formulierinzending

            // Valideer alle velden voor de zekerheid
            site.validateForm(inputEmail);

            // Controleer of reCAPTCHA is voltooid
            site.validateRecaptcha(); // Roep validateRecaptcha aan

            if (!site.allowSubmit) { // Gebruik hier site.allowSubmit
                alert("Gelieve de reCAPTCHA te voltooien.");
                return; // Stop de form submit als reCAPTCHA niet voltooid is
            }

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
                })
                .catch(error => {
                    console.error('Er was een probleem met de formulierinzending:', error);
                    alert(error.message);
                });
        });
    }

});

// De Site class die verantwoordelijk is voor formuliervalidatie
class Site {
    constructor() {
        this.allowSubmit = false; // Declaratie van de allowSubmit variabele
    }

    // Functie voor email validatie
    validateEmail(inputEmail) {
        if (inputEmail.validity.typeMismatch) {
            inputEmail.setCustomValidity("Voer een geldig e-mailadres in!");
            inputEmail.reportValidity();
        } else if (inputEmail.value.length > 80) {
            inputEmail.setCustomValidity("Email moet niet langer dan 80 tekens zijn!");
        } else {
            inputEmail.setCustomValidity("");
        }
    }

    validateRecaptcha() {
        const recaptchaResponse = grecaptcha.getResponse(); // Verkrijg de reCAPTCHA reactie
        console.log('reCAPTCHA Response:', recaptchaResponse); // Debugging

        if (recaptchaResponse.length === 0) {
            console.log('reCAPTCHA niet ingevuld!');
            this.allowSubmit = false; // Validatie mislukt, set allowSubmit to false
            return false;
        } else {
            this.allowSubmit = true; // Als reCAPTCHA is ingevuld, allowSubmit wordt true
            return true;
        }
    }

    // Functie voor formuliervalidatie
    validateForm(inputEmail) {
        this.validateEmail(inputEmail);
    }
}

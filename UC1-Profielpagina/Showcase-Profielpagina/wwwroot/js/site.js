// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
class Site {
    constructor() {
        this.slideIndex = 1; 
    }

    //Methode voor het tonen van de slides
    showSlides(n) {
        let i;
        let slides = document.getElementsByClassName("mySlides");

        if (n > slides.length) { this.slideIndex = 1; }
        if (n < 1) { this.slideIndex = slides.length; }

        // Verbergen alle slides
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        //Tonen huidige slide
        slides[this.slideIndex - 1].style.display = "block";
    }

    //Volgende/Vorige slide
    plusSlides(n) {
        this.showSlides(this.slideIndex += n);
    }


}

const site = new Site();

//instellen eventlisteners
document.querySelector(".prev").onclick = () => site.plusSlides(-1);
document.querySelector(".next").onclick = () => site.plusSlides(1);


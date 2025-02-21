class GDPR {

    constructor() {
        this.showStatus();
        this.showContent();
        this.bindEvents();

        if (this.cookieStatus() !== 'accept') {
            this.showGDPR();
        }
        if (this.cookieStatus() == 'accept') {
            document.querySelector('.personalia').style.display = 'flex';
            document.querySelector('.profile').style.display = 'flex';
            document.querySelector('.gdpr-container').style.display = 'none';
        }
    }

    bindEvents() {
        const d = new Date();
        let time = d.getHours().toString().padStart(2, '0') + ':' + d.getMinutes().toString().padStart(2, '0');
        let date = d.getDate().toString().padStart(2, '0') + '-' + (d.getMonth() + 1).toString().padStart(2, '0') + '-' + d.getFullYear();

        let buttonAccept = document.querySelector('.gdpr-consent__button--accept');

        buttonAccept.addEventListener('click', () => {
            this.cookieStatus('accept');
            this.showStatus();
            this.showContent();
            this.hideGDPR();
            let DateAndTime = { Datum: date, Tijd: time };
            localStorage.setItem('gegevens', JSON.stringify(DateAndTime));

            document.querySelector('.personalia').style.display = 'flex';
            document.querySelector('.profile').style.display = 'flex';
            document.querySelector('.gdpr-container').style.display = 'none';
        });

        let buttonReject = document.querySelector('.gdpr-consent__button--reject');
        buttonReject.addEventListener('click', () => {
            this.cookieStatus('reject')
            this.showStatus();
            this.showContent();
            this.hideGDPR();
            let DateAndTime = { Datum: date, Tijd: time };
            localStorage.setItem('gegevens', JSON.stringify(DateAndTime));
        });
        
    }   

    showContent() {
        this.resetContent();
        const status = this.cookieStatus() == null ? 'not-chosen' : this.cookieStatus();
        const element = document.querySelector(`.content-gdpr-${status}`);
        element.classList.add('show');
    }

    resetContent(){
        const classes = [
            '.content-gdpr-accept',
            '.content-gdpr-not-chosen'];

        for(const c of classes){
            document.querySelector(c).classList.add('hide');
            document.querySelector(c).classList.remove('show');
        }
    }

    showStatus() {
        document.getElementById('content-gpdr-consent-status').innerHTML =
            this.cookieStatus() == null ? 'Niet gekozen' : this.cookieStatus();
    }

    cookieStatus(status) {
        if (status) localStorage.setItem('gdpr-consent-choice', status);
        return localStorage.getItem('gdpr-consent-choice');
    }

    
    hideGDPR(){
        document.querySelector(`.gdpr-consent`).classList.add('hide');
        document.querySelector(`.gdpr-consent`).classList.remove('show');
    }

    showGDPR(){
        document.querySelector(`.gdpr-consent`).classList.add('show');
    }
}
const gdpr = new GDPR();


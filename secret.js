import CryptoJS from 'crypto-js';

let randomImage;
let randomImage2;
let firstActive = false;
let secondActive = false;
let secretCode = 'aWxpa2Vyb2JvdHM=';
let secretCode2 = 'YW5kc2FsdHRvbw==';

fetch('./secret.txt').then((response) => {
    return response.text();
}).then((data) => {
    let encRandomImage = data;
    fetch('./secret2.txt').then((response) => {
        return response.text();
    }).then((data2) => {
        let encRandomImage2 = data2;
        const iv = CryptoJS.enc.Hex.parse(import.meta.env.VITE_DECRYPTION_IV);
        const key = CryptoJS.enc.Hex.parse(import.meta.env.VITE_DECRYPTION_KEY);

        randomImage = CryptoJS.AES.decrypt(encRandomImage, key, { iv: iv }).toString(CryptoJS.enc.Utf8);
        randomImage2 = CryptoJS.AES.decrypt(encRandomImage2, key, { iv: iv }).toString(CryptoJS.enc.Utf8);
        fetch('./secret3.txt').then((response) => {
            return response.text();
        }).then((data3) => {
            secretCode = CryptoJS.AES.decrypt(data3, key, { iv: iv }).toString(CryptoJS.enc.Utf8);
            fetch('./secret4.txt').then((response) => {
                return response.text();
            }).then((data4) => {
                secretCode2 = CryptoJS.AES.decrypt(data4, key, { iv: iv }).toString(CryptoJS.enc.Utf8);
            });
        });
    });
});

export function init() {
    document.addEventListener('keydown', function (event) {
        const image = document.querySelector('.cat');
        const image2 = document.querySelector('.car');
        if (event.key === atob(secretCode).charAt(0)) {
            let index = 1;
            event.preventDefault();
            document.addEventListener('keydown', function (event) {
                if (event.key === atob(secretCode).charAt(index)) {
                    index++;
                    if (index === atob(secretCode).length) {
                        image.src = randomImage;
                        firstActive = true;
                    }
                } else {
                    index = 0;
                }
            });
        }

        if (event.key === atob(secretCode2).charAt(0) && firstActive) {
            let index = 1;
            event.preventDefault();
            document.addEventListener('keydown', function (event) {
                if (event.key === atob(secretCode2).charAt(index)) {
                    index++;
                    if (index === atob(secretCode2).length) {
                        image2.src = randomImage2;
                        secondActive = true;
                    }
                } else {
                    index = 0;
                }
            });
        }

        if (event.key === 'r' && firstActive && secondActive) {
            firstActive = false;
            secondActive = false;
            image.src = './img/macska.webp'
            image2.src = './img/merci.webp'
        }
    });
}

export function getRandomImage() {
    return randomImage;
}
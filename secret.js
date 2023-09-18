import axios from 'axios';

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
        fetch('./secret3.txt').then((response) => {
            return response.text();
        }).then((data3) => {
            let encSecretCode = data3;
            fetch('./secret4.txt').then((response) => {
                return response.text();
            }).then((data4) => {
                let encSecretCode2 = data4;
                let url = 'https://macskamerci.ntsexp.site/decrypt';

                axios.post(url, { data: encRandomImage })
                    .then((response) => {
                        if (response.status === 200) {
                            const { data } = response;
                            randomImage = data;
                        }
                    })
                axios.post(url, { data: encRandomImage2 })
                    .then((response) => {
                        if (response.status === 200) {
                            const { data } = response;
                            randomImage2 = data;
                        }
                    })
                axios.post(url, { data: encSecretCode })
                    .then((response) => {
                        if (response.status === 200) {
                            const { data } = response;
                            secretCode = data;
                        }
                    })
                axios.post(url, { data: encSecretCode2 })
                    .then((response) => {
                        if (response.status === 200) {
                            const { data } = response;
                            secretCode2 = data;
                        }
                    })
            });
        });
    });
});

export function init() {
    axios.get('https://macskamerci.ntsexp.site/check').then((response) => {
        if (response.status === 200) {
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
    });
}

export function getRandomImage() {
    return randomImage;
}
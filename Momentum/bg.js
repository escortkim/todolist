const body = document.querySelector("body");

const IMG_NUMBER = 5;


function paintImage(){
    const image = new Image();
    image.src = 'https://source.unsplash.com/random/1920x1080/daily';
    image.classList.add("bgImage");
    body.prepend(image);
}

function genRandom(){
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function init(){
    //const randomNumber = genRandom();
    paintImage();
}

init();

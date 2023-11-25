const tentang = document.querySelector('.aTentang');
const sejarah = document.querySelector('.atengah-2 h2');
const isiSejarah = document.querySelector('.atengah-2 p');
const titleRektor = document.querySelector('.titleRektor');
const fotoRektorKiri = document.querySelector('.atengah3-1');
const fotoRektorKanan = document.querySelector('.atengah3-2');
// const tDarkMode = document.querySelector('.tDarkMode');
const body = document.querySelector('.body');
const fontHitam = document.querySelector('.fontHitam');

// console.log(window.scrollY);
// tDarkMode.addEventListener('click', ()=>{
//     body.classList.toggle('darkMode');
//     fontHitam.classList.toggle('fontPutih');


// });



const scrolly = window.addEventListener('scroll', ()=>{
const y = window.scrollY;
    
    console.log(window.scrollY);

    if(y >= 83){
        tentang.classList.add('muncul');
        tentang.classList.remove('hiden');
    }

    if(y >= 750){
        sejarah.classList.add('muncul');
        sejarah.classList.remove('hiden');
    }

    if(y>= 800){
        isiSejarah.classList.add('muncul');
        isiSejarah.classList.remove('hiden');
    }
    if(y>=999){
        titleRektor.classList.add('muncul');
        titleRektor.classList.remove('hiden');
    }

    if(y>=1009){
        fotoRektorKiri.classList.add('fotoRektorKiri');
        fotoRektorKiri.classList.remove('hiden'); 
        fotoRektorKanan.classList.add('fotoRektorKanan');
        fotoRektorKanan.classList.remove('hiden');
    }
}); 




// tentang.addEventListener()
const { Db } = require('mongodb');
const mongoose = require('mongoose');

//membuat schema 
const mhs = mongoose.model('mahasiswa', { //mahasiswa akan menjadi mahasiswas
    nama: {
        type: String,
        require: true
    },
    nim: {
        type: String,
        require: true
    },
    jurusan: {
        type: String,
        require: true
    },
    noHp: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    }, 
    callname: {
        type: String,
        require: true
    }, 
    foto : {
        type: String, 
        require : true 


    }

});
const kosong = mongoose.model('kosong', { //kosong akan menjadi kosongs
    nama: {
        type: String,
       
    },
    nim: {
        type: String,
       
    },
    jurusan: {
        type: String,
       
    },
    noHp: {
        type: String,
       
    },
    email: {
        type: String,
       
    }, 
    callname: {
        type: String,
    
    }

});



module.exports= {mhs, kosong}

// const mhs1 = new mhs({
//     nama: 'maeka',
//     nim: '2115091066',
//     jurusan: 'Teknik ikan '
// });
// mhs1.save().then((res) => {
//     console.log(res);
// });



const express = require('express');
const {
    cookie
} = require('express-validator');
require('./public/js/jsMe/db');
const {
    mhs,
    kosong //kosong untuk add
} = require('./public/js/jsMe/mahasiswa');
const {
    body,
    validationResult,
    check
} = require('express-validator');
const expressLayouts = require('express-ejs-layouts');
const formidable = require('formidable');
// const session = require('express-session');
// const cookiParser = require('cookie-parser');
// const flash = require('connect-flash');


const path = require("path");
const multer = require("multer");
const {
    encode
} = require('punycode');
const {
    Console
} = require('console');


const app = express();
const port = 3000;
app.use(express.urlencoded());
let salahEmail;
let salahNim;
app.use(expressLayouts);


//konfigurasi flash
// app.use(cookiParser('secret'));
// app.use(
//     session({
//         cookie : {maxAge: 6000},
//         secret : 'secret', 
//         resave : true , 
//         saveUninitialized : true,
//     })
// );
// app.use(flash());
// //gunakan ejs



//UPLOAD FOR ADD
let storage = multer.diskStorage({
    destination: async function (req, file, cb) {
        console.log(`Nimmm = ${req.body.nim}`);
        const find = await mhs.findOne({
            nim: req.body.nim
        });
        if (!find) {
            // Uploads is the Upload_folder_name
            cb(null, "public/img");
            //  console.log('helllllll');

        } else {
            cb(null, "");
            // console.log('helllllll2');
        }



    },

    filename: function (req, file, cb) {
        cb(null, req.body.nim + ".jpg")
    }
})
const maxSize = 1 * 1000 * 1000;

let upload = multer({

    storage: storage,
    limits: {
        fileSize: maxSize
    },
    fileFilter: function (req, file, cb) {

        // Set the filetypes, it is optional
        let filetypes = /jpeg|jpg|png/;
        let mimetype = filetypes.test(file.mimetype);

        let extname = filetypes.test(path.extname(
            file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }

        cb("Error: File upload only supports the " +
            "following filetypes - " + filetypes);
    }

    // foto is the name of file attribute
});


// UPLOAD FOR EDIT
let storage1 = multer.diskStorage({
    destination: async function (req, file, cb) {
        console.log(`Nimmm = ${req.body.nim}`);
        const find = await mhs.findOne({
            nim: req.body.nim
        });
        if (!find || req.body.nim === req.body.oldNim) {
            cb(null, "public/img");
            // Uploads is the Upload_folder_name
            console.log('helllllll');
        } else {
            cb(null, "");
        }
        console.log('helllllll2');




    },

    filename: function (req, file, cb) {
        cb(null, req.body.nim + ".jpg")
    }
})


let uploads = multer({

    storage: storage1,
    limits: {
        fileSize: maxSize
    },
    fileFilter: function (req, file, cb) {

        // Set the filetypes, it is optional
        let filetypes = /jpeg|jpg|png/;
        let mimetype = filetypes.test(file.mimetype);


        let extname = filetypes.test(path.extname(
            file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }

        cb("Error: File upload only supports the " +
            "following filetypes - " + filetypes);
    }

    // foto is the name of file attribute
});
app.set('view engine', 'ejs');

//Bertujuan agar file yang berada di folder public dapat dipakai/ ditampilkan. NB: File yang berada diluar folder tidak dapat digunakan 
app.use(express.static('public'));

//melakukan koneksi 
app.listen(port, () => {
    console.log(`Berhasil connect port ${port}\n http://localhost:${port}`);
});

app.get('/', (req, res) => {
    res.render('home', {
        title: 'Home',
        layout: 'layout/layoutUtama'
    });

});
//halaman home
app.get('/home', (req, res) => {
    //memanggil file 
    res.render('home', {
        title: 'Home',
        layout: 'layout/layoutUtama'
    });
});

//HALAMAN DATABASE
app.get('/database', async (req, res) => {

    const dataMhs = await mhs.find();

    res.render('database', {
        dataMhs,
        title: 'Home',
        layout: 'layout/layoutUtama',
        // msg : req.flash('msg'),
    })
});

// HALAMAN DETAIL
app.get('/detail/:nim', async (req, res) => {
    const data = await mhs.findOne({
        nim: req.params.nim
    });

    res.render('detail', {
        data,
        layout: 'layout/layoutDetail',
        title: `Detail ${req.params.nim}`
    });

});

//HALAMAN ABOUT

app.get('/about', (req, res) => {

    res.render('about', {
        title: 'Home',
        layout: 'layout/layoutUtama'
    });
});

//HALAMAN HAPUS
app.get('/hapus/:nim', async (req, res) => {
    await mhs.find({
        nim: req.params.nim
    }).remove();
    // .exec()
    const dataMhs = await mhs.find();
    res.render('hapus', {
        dataMhs,
        layout: 'layout/layoutUtama',
        title: 'hapus'
        // msg : req.flash('msg'),
    })
});


//HALAMAN EDIT UNTUK METHOD POST 
app.post('/edit',
    uploads.single('foto'),
    //array middleware
    [
        //melakukan validasi duplikat data 
        body('nim').custom(async (value, {
            req
        }) => {
            //memanggil unction duplikat
            const duplikat = await mhs.findOne({
                nim: value
            });
            // console.log(value);

            if (duplikat) {
                if (value !== req.body.oldNim) {
                    salahNim = 'salahInput';
                    throw new Error('Nim sudah tersedia! ')

                }

                return true;

            }
            salahNim = '';
            return true;
        }),
        body('email').custom(async (nilai, {
            req
        }) => {
            const duplikat = await mhs.findOne({
                email: nilai
            });
            if (duplikat) {
                if (nilai !== req.body.oldEmail) {
                    salahEmail = 'salahInput';
                    throw new Error('Email sudah tersedia! ')

                }

                return true;

            }
            salahEmail = '';
            return true;
        }),

        //Validasi, dimana kita dapat custom msg-nya  
        //melakukan validasi email, apabila tidak valid maka akan mengirimkan msg email tidak valid 
        body('email', 'Email tidak valid').isEmail(),
        body('noHp', 'No Hp tidak valid').isNumeric(),
        //Bisa menggunakan check
        check('nama', 'Nama tidak valid').isString(),
        check('nim', 'Nim tidak valid!').isNumeric()




    ], async (req, res) => {

        const errors = validationResult(req);

        //ketika error tidak kosong
        if (!errors.isEmpty()) {

            res.render('edit', {
                //kirim error ke halaman edit
                errors: errors.array(),
                dataMhs: req.body,
                salahEmail,
                salahNim,
                layout: 'layout/layoutEditandAdd',
                title: `Edit ${req.params.nim}`



            });
        } else {
            console.log(req.body);
            await mhs.updateMany({
                _id: req.body._id
            }, {
                $set: {
                    nama: req.body.nama,
                    jurusan: req.body.jurusan,
                    nim: req.body.nim,
                    email: req.body.email,
                    noHp: req.body.noHp,
                    callname: req.body.callname,


                }

            })
            res.render('simpan', {
                title: 'berhasil',
                layout: 'layout/layoutEditandAdd',

            });

            // res.send(req.body);
        }


    });
//HALAMAN EDIT 
app.get('/edit/:nim', async (req, res) => {
    const dataMhs = await mhs.findOne({
        nim: req.params.nim
    });
    salahEmail = '';
    salahNim = '';
    res.render('edit', {
        dataMhs,
        salahEmail,
        salahNim,
        layout: 'layout/layoutEditandAdd',
        title: `Edit ${req.params.nim}`,
    })
});


//HALAMAN ADD
app.get('/add', async (req, res) => {
    const dataMhs = kosong.findOne({
        _id: kosong
    });
    salahEmail = '';
    salahNim = '';
    res.render('add', {
        dataMhs,
        salahEmail,
        salahNim,
        layout: 'layout/layoutEditandAdd',
        title: 'Tambah data'

    });
});

// HALAMAN ADD POST
app.post('/add',
    upload.single('foto'),
    //array middleware



    [

        //melakukan validasi duplikat data 
        body('nim').custom(async (value) => {
            //memanggil unction duplikat

            const find = await mhs.findOne({
                nim: value
            });
            if (find) {
                salahNim = 'salahInput'
                throw new Error('Nim sudah tersedia! ')

            }
            salahNim = '';

            return true;

        }),


        body('email').custom(async (nilai) => {
            const duplikat = await mhs.findOne({
                email: nilai
            });
            if (duplikat) {
                salahEmail = 'salahInput';
                throw new Error('Email sudah tersedia! ');
            }
            salahEmail = '';
            return true;


        }),

        //Validasi, dimana kita dapat custom msg-nya  
        //melakukan validasi email, apabila tidak valid maka akan mengirimkan msg email tidak valid 
        body('email', 'Email tidak valid').isEmail(),
        // console.log(body('nim', '').not()), 
        body('noHp', 'No Hp tidak valid').isNumeric(),
        //Bisa menggunakan check
        check('nama', 'Nama tidak valid').isString(),
        check('nim', 'Nim tidak valid!').isNumeric(),


    ], (req, res) => {
        // const data =  req.body;
        //  mhs.insertOne(req.body);
        // const formData = {
        //     textInput: req.body,

        // };
        // console.log('1');
        // console.log(formData);


        // console.log(`Nim ${req.body.nim}`);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {


            // console.log(req.params.body);
            res.render('add', {
                errors: errors.array(),
                dataMhs: req.body,
                salahEmail,
                salahNim,
                layout: 'layout/layoutEditandAdd',
                title: 'Tambah data'

            })
        } else {


            mhs.insertMany(req.body)

            res.render('simpan', {
                layout: 'layout/layoutEditandAdd',
                // dataMhs : req.body,
                title: 'berhasil'
            });
        }

    });

//EDIT BAGIAN DETAIL 
app.get('/detail/edit/:nim', async (req, res) => {
    const dataMhs = await mhs.findOne({
        nim: req.params.nim
    });
    salahEmail = '';
    salahNim = '';
    res.render('edit', {
        dataMhs,
        salahEmail,
        salahNim,
        layout: 'layout/layoutEditandAdd',
        title: `Edit ${req.params.nim}`,
    })


});
// HAPUS BAGIAN DETAIL 

app.get('/detail/hapus/:nim', async (req, res) => {
    await mhs.find({
        nim: req.params.nim
    }).remove();
    // .exec()
    const dataMhs = await mhs.find();
    res.render('hapus', {
        dataMhs,
        layout: 'layout/layoutUtama',
        title: 'hapus'
        // msg : req.flash('msg'),
    })
});





/* Catatan : 

1. collection kosong berfungsi agar tidak error saat klik tombol add (diakal). Terdapat data yang isinya kosong
2. salahEmail dan salahNim digunakan untuk menampung nama class, dimana apabila error bagian email atau dan nim, maka border pada form inputan akan berwarna merah  

*/


/*
NOTE ERROR:  
1. Masalah validator tidk berfungsi ketika menambahkan enctype="multipart/form-data" pada form halaman add(error telah di perbaiki)


*/
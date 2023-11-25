const console = require('console');
const fs = require('fs');

const simpan = (nama) => {
    //membuat object
    const info = { 
        nama : nama,
        //persingkat :
        // alamat,
        // ttl,
        // jurusan,
    };
    const infos = a();
    //mencari apakah ada nama yang duplikat
    const duplikat = infos.find((infos) => infos.nama === nama);
    if (!duplikat) {
        //melakukan push info kedalam infos
        infos.push(info);
        //setelah push kedalam infos, infos akan disimpan dalam bentuk JSON 
        // fs.writeFileSync('LATIHAN 11 MIDDLEWARE/public/js/jsMe/program.js', JSON.stringify(infos));
        fs.writeFileSync('./data.json', JSON.stringify(infos));
        

        console.log("Data telah disimpan, terima kasih");

    } else {
        console.log("Nama yang dimasukan telah terdaftar, mohon masukan nama yang lain!");
    }



}
const a = () => {
    //membaca file
    const file = fs.readFileSync('public/json/data.json', 'utf-8');
    //ubah file menjadi json
    const infos = JSON.parse(file);
    //kembalikan infos
    return infos;
}



const cariNim = (nim)=>{

    const data = a();
    const find = data.find((infos) => infos.nim === nim);

    if(!find){
        return false;    
    }
    
    return find;

}
const hapusData = (nim)=>{
    const data =  a();
    const filterData = data.filter((datas)=> datas.nim != nim );
    saveData(filterData);
}

const cariEmail = (email)=>{

    const data = a();
    const find = data.find((infos) => infos.email === email);

    if(!find){
        return false;    
    }
    
    return find;

}

//menulis atau menimpa file data.json dengan data baru 
const saveData = (data)=>{
    fs.writeFileSync('public/json/data.json', JSON.stringify(data));
}


//menambahkan data baru ke json
const addData = (data)=>{
    const data1 =a();
    data1.push(data);
    saveData(data1);
    

}


const cariEmail2 = (email)=>{
    const loadDatas = a();
    const find = loadDatas.find((loadData)=> loadData.email === email);
    console.log(find);


}

const cariNim2 = (nim)=>{
    const loadDatas = a();
    const find = loadDatas.find((loadData) => loadData.nim === nim);
    console.log(find);
}


const updateData = (dataBaru)=>{
    const datas = a();
    const filterData = datas.filter((dataMhs) => dataMhs.nim !== dataBaru.oldNim);
    delete dataBaru.oldNim;
    filterData.push(dataBaru);
    saveData(filterData);
}
module.exports = {simpan, cariNim, addData, cariEmail, hapusData, cariEmail2, cariNim2, updateData};
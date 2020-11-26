//gọi express
var express = require('express');
//tạo app để cấu hình router
var app = express();

//goi thu vien multer
var multer = require('multer');
var storage = multer.diskStorage({
    /**
     * @param {*} cb : kiem tra file co the luu tru hay khong hoac
     * de thay doi duong dan, thay doi ten file 
     */
    destination: function (req, file, cb) {
        //dua file vao thu muc uploads
        cb(null, '/ServerAndroid/NodeJS-UploadFileWithMulted/uploads');
    },
    filename: function (req, file, cb) {
        //de nguyen ten file khong thay doi
        cb(null, file.originalname);
    }
});

var uploadFile = multer({ storage: storage });
//cai dat handlebars
var expressHbs = require('express-handlebars');
app.engine('handlebars', expressHbs());
//lưu template vào foder "views"
app.set('view engine', 'handlebars')

//goi trang hbs, đưa layout vào đây
app.get('/', function (req, res) {
    /**
     * đã có thư mục index.handlebars rồi và chỉ cần gọi ra
     */
    res.render('upload')
})

//uploadFile.single("ten name trong truong field cua cac ban")
app.post('/profile', uploadFile.single('avatar'), function (req, res, err) {
    // if (err) throw err;
    //sau khi upload se tra ve thong tin cua file
    console.log(req.file);
    res.send("Uploades");
})


//chạy lên local host với post 3000
app.listen(process.env.PORT || '3000');
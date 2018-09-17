const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/config').get(process.env.NODE_ENV);

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

const {User} = require('./models/user');
const {Book} = require('./models/book');
const {Auth} = require('./middleware/auth');

app.use(bodyParser.json());
app.use(cookieParser());

// GET //

app.get('/api/getBook',(req,res)=>{
  let id = req.query.id;
  Book.findById(id,(err,doc)=>{
    if(err) return res.status(400).send(err);
    res.send(doc);
  })
})


app.get('/api/books',(req,res)=>{
  let skip = parseInt(req.query.skip);
  let limit = parseInt (req.query.limit);
  let order = req.query.order;
  Book.find().skip(skip).sort({_id:order}).limit(limit).exec((err,doc)=>{
    if(err) return res.status(400).json({
      message:"تعداد کتاب های موجود کمتر از حد نصاب است"
    })
    res.send(doc)
  })
})

app.get('/api/getReviewer',(req,res)=>{
  let id = req.query.id;
  User.findById(id,(err,user)=>{
    if(err) return res.status(400).send(err);
    res.json({
      name:user.name,
      lastname:user.lastname
    })
  })
})

app.get('/api/users',(req,res)=>{
  User.find().exec((err,users)=>{
    if(err) return res.status(400).send(err);
    res.status(200).send(users)
  })
})

app.get('/api/user_posts',(req,res)=>{
  Book.find({ownerId:req.query.userId}).exec((err,book)=>{
    if (err) return res.status(400).send(err);
    res.json({
      book
    })
  })
})

app.get('/api/auth',Auth,(req,res)=>{
  res.status(200).json({
    isAuth:true,
    id:req.user._id,
    name:req.user.name,
    lastname:req.user.lastname,
    email:req.user.email
  })
})

app.get('/api/logout',Auth,(req,res)=>{
  req.user.deleteToken(req.token,(err,user)=>{
    if (err) res.send(err);
    res.status(200).json({
      message:"خدانگهدارتان"
    })
  })
})
// POST //
app.post('/api/book',(req,res)=>{
  const book = new Book(req.body);
  book.save((err,doc)=>{
    if(err) return res.status(400).send(err);
    res.status(200).json({
      post:true,
      bookId:doc._id
    })
  })
})


app.post('/api/register',(req,res)=>{
  const user = new User(req.body);
  user.save((err,doc)=>{
    if(err) return res.json({success:false})
    res.status(200).json({
      success:true,
      user:doc
    })
  })
})

app.post('/api/login',(req,res)=>{
  User.findOne({email:req.body.email},(err,user)=>{
    if(!user) return res.json({isAuth:false,message:"ایمیل اشتباه است"});
    user.comparePassword (req.body.password,(err,isMatch)=>{
      if (err) return res.json({
        message:"ایراد اساسی رخ داده است"
      });
      if(!isMatch) return res.json({
        isAuth:false,
        message:"رمز عبور اشتباه است"
      });
      user.generateToken((err,user)=>{
        if (err) return res.status(400).send(err);
        res.cookie('auth',user.token).json({
          isAuth:true,
          id:user._id,
          email:user.email
        })
      })

    })
  })
})

// UPDATE //
app.post('/api/book_update',(req,res)=>{
  Book.findByIdAndUpdate(req.body._id,req.body,{new:true},(err,doc)=>{
    if(err) return res.status(400).json({
      message:"کتاب مورد نظر یافت نشد",
      doc
    });
    res.status(200).json({
      success:true,
      doc
    });
  })
})

// DELETE //
app.post('/api/book_delete',(req,res)=>{
  Book.findOneAndDelete(req.body._id,(err,doc)=>{
    if(err) return res.status(400).json({
      message:"کتاب موجود نیست"
    })
    res.status(200).json({
      success:true,
      message:"عملیات حذف با موفقیت انجام شد"
    })
  })
})

app.delete('/api/delete_book',(req,res)=>{
  let id = req.query.id;
  Book.findByIdAndRemove(id,(err,doc)=>{
    if(err) return res.status(400).json({
      message:"کتاب مورد نظر یافت نشد"
    })
    res.status(200).json({
      success:true,
      message:"حذف کتاب موفقیت آمیز بود"
    })
  })
})


const port = process.env.PORT || 3001;
app.listen(port,()=>{
  console.log(`Server Run on port ${port}`);
});

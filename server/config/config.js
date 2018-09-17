const config ={
  production:{
    SECRET : process.env.SECRET,
    DATABASE : process.env.MONGODB_URI
  },
  default:{
    SECRET : 'secretpassword123',
    DATABASE : 'mongodb://localhost:27017/BooksShelf'
  }
}


exports.get = (env) => {
   return config [env] || config.default;  
}

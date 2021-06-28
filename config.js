module.exports = {
    port: process.env.PORT || 3000,
    //db: process.env.MONGODB || 'mongodb://localhost:27017/mytest2',
    db: process.env.MONGODB || 'mongodb+srv://squielgr:703ttPHUKrmf8rPu@dbclustere.cxjab.mongodb.net/mytest2?retryWrites=true&w=majority',
    urlParser : {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }
}
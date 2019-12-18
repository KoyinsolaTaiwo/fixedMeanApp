const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const mongoose = require('mongoose');

mongoDB = 'mongodb+srv://dbusername:dbpassword@meanappdb-ry4xi.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(mongoDB, {useUnifiedTopology: true,useNewUrlParser:true});

const Schema =mongoose.Schema;

const artistSchema = new Schema({
  name:String,
  song:String,
  image:String
});

const ArtistModel = mongoose.model('artist', artistSchema);

const PORT = 3000
const api = require('./routes/api')
const app = express()


const cors = require('cors');
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())



app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
res.header("Access-Control-Allow-Headers",
"Origin, X-Requested-With, Content-Type, Accept");
next();
});



app.get('/', function(req, res){
    res.send('Hello from server')
})

//app.get('*',(req, res) => {
//    res.sendFile(path.join(__dirname, 'dist/mean-secure/index.html'));
//});

app.get('/api/artist', (req, res, next) => {
  console.log("get request")
  ArtistModel.find((err,data) => {
    res.json({artist:data});
  })
})

app.delete('/api/artist/:id', (req,res) =>{
  console.log(req.params.id);

  ArtistModel.deleteOne({_id:req.params.id},(error,data)=>{
    if(error)
      res.json(error);

    res.json(data);
  })
})

//search name
app.get('/api/artist/search/:name/:criteria', (req,res)=>{
  console.log(req.params.name);
  console.log(req.params.criteria);
if(req.params.criteria == 'name')
  {
  ArtistModel.find({ 'name': req.params.name},
(error,data) =>{
  res.json(data);
})
  }
})


    app.get('/serverhtml/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
    });

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());


    app.post('/name', (req, res) => {
    console.log("post method");
    console.log(req.body.email);
    res.send('The artist '+ " " + req.query.artistname +' sang the song' + " " + req.query.songname  + "<br /> " +'Thank you '  + " " + req.query.username + "<br />"+ 'We will email ' + " " + req.query.email +" "+ ' shortly' );
    })


    app.get('/name', (req, res) => {
        console.log("get method");
        console.log(req.query.email);
        res.send('The artist '+ " " + req.query.artistname +' sang the song' + " " + req.query.songname  + "<br />" +'Thank you '  + " " + req.query.username + "/<br />"+ 'We will email ' + " " + req.query.email +" "+ ' shortly' );
        })



app.get('/api/artists', (req,res,next) =>{
    const artists = [
    {
        "Artist Name":"T-Pain",
        "Top Song":"I'm Sprung",
        "Artist":"https://peopledotcom.files.wordpress.com/2019/10/tpain.jpg"
    },
    {
        "Artist Name":"Trey Songz",
        "Top Song":"Slow Motion",
        "Artist":"http://static1.dallasblack.com/Articles/TreySongz08_article.jpgg"
    }
    ];
    res.status(200).json({
    message: 'Posts fetched succesfully!',
    artists: artists
    });
    })


    app.get('/api/artists', (req, res)=>{
        const artists = [
            {
                "Artist Name":"T-Pain",
                "Top Song":"I'm Sprung",
                "Artist":"https://peopledotcom.files.wordpress.com/2019/10/tpain.jpg"
            },
            {
                "Artist Name":"Trey Songz",
                "Top Song":"Slow Motion",
                "Artist":"http://static1.dallasblack.com/Articles/TreySongz08_article.jpgg"
            }
        ];
        res.status(200).json({
        message: "Everything is good",
        myArtists:artists
        })
        })



    app.post('/api/artist', (req,res) =>{
        console.log('post Sucessfull');
        console.log(req.body)
        console.log(req.body.name);
        console.log(req.body.song);
        console.log(req.body.image);

        ArtistModel.create({
        name: req.body.name,
        songs: req.body.songs,
        image: req.body.image
        });
        res.json('data uploaded')

        })

        app.get('/api/artist/:id',(req,res)=>{
          console.log(req.params.id);

          ArtistModel.findById(req.params.id, (err, data)=>{
            res.json(data);
          })
        })

        app.put('/api/artist/:id', (req, res)=>{
          console.log(req.body);
          console.log("Edit "+req.params.id);

          ArtistModel.findByIdAndUpdate(req.params.id,
            req.body, {new:true}, (error, data)=>{
              res.send(data);
            })
        })

app.listen(PORT, function(){
    console.log('Server running on localhost: ' + PORT)
})

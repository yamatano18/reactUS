
import express from 'express';
import corsPrefetch from 'cors-prefetch-middleware';
import imagesUpload from 'images-upload-middleware';
import {MongoClient, ObjectID} from 'mongodb';
import bodyParser from 'body-parser';

import {SERVER, PORT, HTTP_SERVER_PORT, HTTP_SERVER_PORT_IMAGES, IMAGES} from './constants';


const app = express();
app.use(express.static(__dirname + '/../static'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(corsPrefetch);

let db; // global variable for getting an access to the database
MongoClient.connect('mongodb://' + SERVER)
    .then(connection => {
        db = connection.db('dbCities');
        app.listen(PORT, () => console.log('Server Listening on Port 9090'));
    })
    .catch(error => console.log('ERROR:', error));

app.post('/images', imagesUpload(
    './static/' + IMAGES,
    HTTP_SERVER_PORT_IMAGES
));

//routes
app.use(bodyParser.urlencoded({
    extended: true
}));

/* GET */
app.get('/cities', function (req, res) {
    db.collection('cities').find().toArray()
        .then(cities => res.json(cities))
        .catch(error => {
            res.status(500).json({message: `Internal Server Error: ${error}`});
        });
});
app.get('/city/:id', function (req, res) {
    db.collection('cities').findOne({'_id':ObjectID(req.params.id)}, function(error, result) {
        if (error)
            res.status(400).json({message: `Internal Server Error: ${error}`});
        else if (result)
            res.send(result);
        else
            res.status(404);
    })
});

app.get('/activities', function (req, res) {
    db.collection('activities').find().toArray()
        .then(cities => res.json(cities))
        .catch(error => {
            res.status(500).json({message: `Internal Server Error: ${error}`});
        });
});
app.get('/activity/:id', function (req, res) {
    db.collection('activities').findOne({'_id':ObjectID(req.params.id)}, function(error, result) {
        if (error)
            res.status(400).json({message: `Internal Server Error: ${error}`});
        else if (result)
            res.send(result);
        else
            res.status(404);
    });
});

app.post('/cities/addcity', function (req, res) {
    db.collection('cities').insertOne(req.body, (err, result) => {
        if(err)
            res.status(500).json({message: "error"});
        else
            res.status(200).json({message: "success"});
    });
});

app.route('/activities/addactivity')
    .get((req, res) => {
        db.collection('activities').find().toArray()
            .then(cities => res.json(cities))
            .catch(error => {
                res.status(500).json({message: `Internal Server Error: ${error}`});
            });
    })
    .post((req, res) => {
        db.collection('activities').insertOne(req.body)
            .then(res.status(200).json({message: `Success`}))
            .catch(error => {
                res.status(500).json({message: `Internal Server Error: ${error}`});
            });
        db.collection('cities').updateOne({_id: ObjectID(req.body.cityId)}, {$push: {activities: req.body}})
            .then(res.status(200).json({message: `Success`}))
            .catch(error => {
                res.status(500).json({message: `Internal Server Error: ${error}`});
            });
    });

app.post('/comments', (req, res) => {
    const update = {
        comments: {
            user: {
                _id: ObjectID(req.body.userId),
                email: req.body.email
            },
            date: new Date(),
            text: req.body.text
        }
    }
    if(req.body.type === undefined)
        res.status(500).json({message: `Internal Server Error`});
    db.collection(req.body.type).updateOne({
        _id: ObjectID(req.body.parentId)
    }, {$push: update}).then(res.status(200).json({message: `Success`}))
        .catch(error => {
            res.status(500).json({message: `Internal Server Error`});
        });
})

app.post('/images', imagesUpload('./static/upload',HTTP_SERVER_PORT_IMAGES));

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require('cors');

var indexRouter = require('./routes/index');


// importing API Routes 
var blogsRouter = require('./routes/api/blogs');


// configure swagger in app.js 
// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: '1.0.0',
      title: 'My Blog',
      description: 'Blog API Documentation'
    },
    servers: ['http://localhost:3000']
  },
  apis: ["app.js"]
}
const swaggerDocs = swaggerJsDoc(swaggerOptions);


/**
 * @swagger
 * definitions:
 *  Blog:
 *   type: object
 *   properties:
 *    title:
 *     type: String
 *     description: Title of the Blog
 *     example: 'My Country'
 *    content:
 *     type: String
 *     description: Content of the blog
 *     example: 'India is my Country'
 *    createdBy:
 *     type: String
 *     description: Creator of blog
 *     example: 'Ashutosh'
 *    updatedBy:
 *     type: String
 *     description: Last Updated by
 *     example: 'Ashu'
 */

// Routes
 /**
 * @swagger
 * /api/blogs/:
 *  get:
 *    tags:
 *      - Blogs
 *    summary: Listing all Blogs
 *    description: Lists all Blogs in Database
 *    responses:
 *      '200':
 *        description: A successful response
 */
/**
 * @swagger
 /api/blogs/{id}:
 *  get:
 *   tags:
 *    - Blogs
 *   summary: Listing a Blog by particular id
 *   description: Lists Blog by id
 *   produces:
 *    - appication/json
 *   parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      description: id of the blog
 *      schema:
 *       $ref: '#/definitions/Blog'
 *   responses:
 *    '200':
 *     description: Successful 
 *    '500':
 *     description: Fail
 */
/**
 * @swagger
 * /api/blogs:
 *  post:
 *   tags:
 *    - Blogs
 *   summary: Add a Blog
 *   description: Creates a new Blog
 *   consumes:
 *    - application/json
 *   parameters:
 *      - in: body
 *        name: user
 *        description: The blog to create.
 *        schema:
 *          $ref: '#/definitions/Blog' 
 *   responses:
 *    200:
 *     description: Blog created successfully
 *    500:
 *     description: Fail
 */
/**
 * @swagger
 * /api/blogs/{id}:
 *  put:
 *   tags:
 *    - Blogs
 *   summary: Editing a Particular Blog
 *   description: Updates the info of a Blog
 *   consumes:
 *    - application/json
 *   produces:
 *    - appication/json
 *   parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      description: id of the Blog
 *      schema:
 *       $ref: '#/definitions/Blog'
 *    - in: body
 *      name: Blog
 *      description: The user to create.
 *      schema:
 *       $ref: '#/definitions/Blog'
 *   responses:
 *    '200':
 *     description: Successful 
 *    '500':
 *     description: Fail
 */
/**
 * @swagger
 /api/blogs/{id}:
 *  delete:
 *   tags:
 *    - Blogs
 *   summary: Deleting a Blog by id
 *   description: Deletes a blog
 *   produces:
 *    - appication/json
 *   parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      description: id of the blog
 *      schema:
 *       $ref: '#/definitions/Blog'
 *   responses:
 *    '200':
 *     description: Successful 
 *    '500':
 *     description: Fail
 */


var app = express();


var corsOptions = {
  origin: 'http://localhost:8080/',
  optionsSuccessStatus: 200,
  methods: "GET, PUT, POST, DELETE"
}

app.use(cors(corsOptions));
//app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// API Endpoints 

app.use('/api/blogs', blogsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



app.listen(8080, function () {
  console.log('CORS-enabled web server listening on port 8080')
})

module.exports = app;

const express = require('express');
const router = express.Router();

// connecting to service
const blogService = require('../../services/blogService');

/* POST Blog */
router.post('/', (req, res, next) => { 
  console.log(req.body);

  blogService.createBlog(req, function(err, data){
    if(!err){
      res.json(data);
    }else{
      res.json(err);
    }
  });
  
});

// /* GET blogs listing. */
router.get('/', (req, res, next) => {
  
    blogService.getBlogs( (err, data)=>{
    if(!err){
      res.json(data);
    }else{
      res.json(err);
    }
  });
  
});

 /* GET blogs/1 . */
router.get('/:id', (req, res, next) => { // URL Param is: id
  
    blogService.getBlogById(req.params.id, (err, data)=>{
    if(!err){
      res.json(data);
    }else{
      res.json(err);
    }
  });

});

// /* PUT blog/1 */
router.put('/:id', (req, res, next) => {
  console.log(req.params.id); 
  console.log(req.body); 

  blogService.updateBlog(req.params.id, req.body, (err, data) => {
    if(!err){
      res.json(data);
    }else{
      res.json(err);
    }
  });
});

// /* DELETE blogs/1 */
router.delete('/:id', (req, res, next) => {
  console.log(req.params.id);

  blogService.deleteBlog(req.params.id, (err, data) => {
    if(!err){
      res.json(data);
    }else{
      res.json(err);
    }
  })
});

module.exports = router;
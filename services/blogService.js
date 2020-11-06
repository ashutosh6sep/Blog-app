const Blog = require('../models/blog');


//Create Blog
exports.createBlog = (req, callback) => {
    console.log(req.body);

    // Construct a query
    let blogDao = new Blog(req.body);

    // executing query
    blogDao.save((err, savedBlog) => {
        if (!err) {
            console.log(`Blog added successfully: ${savedBlog.blogId}`)
        }
        callback(err, savedBlog);
    })
}

//getBlogs
exports.getBlogs = (callback) => {
    //1.construct and execute query
    Blog.find((err, blogsList) => {

        if (!err) {
            console.log(`Blogs loaded successfully: ${blogsList.length}`)
        }

        //2.get the data from db and send it to router        
        callback(err, blogsList);
    });

};

 //getBlogs by id
exports.getBlogById = (_blogId, callback) => {
    Blog.findOne({ blogId: _blogId }, (err, blog) => {
        //console.log("ASHU", err);
        if(blog){
            console.log(`Blog with Id ${blog.blogId} Loaded Successfully`);
          }else {
            console.log(err);    
        }

        //2.get the data from db and send it to router        
        callback(err, blog);
    });

}

 //updateBlog
exports.updateBlog = (_blogId, blogData, callback) => {
    console.log(blogData);

    //1.construct query and exec
    Blog.updateOne({ blogId: _blogId }, blogData, (err, status) => {
        let msg = "Not updated";
        if (!err) {
            console.log(status);
            if (status.n == 1 && status.ok == 1) {
                msg = 'Updated success';
            }
        }
        //2.get the data from db and send it to router  
        callback(err, msg);
    });

}

//deleteBlog
exports.deleteBlog = (_blogId, callback) => {
    Blog.deleteOne({ blogId: _blogId }, (err, status) => {
        let msg = "Not deleted";
        if (!err) {
            console.log("a1", status);
            if (status.n == 1 && status.ok == 1) {
                msg = 'Delete success';
            }
        }
        callback(err, msg);
    });

}

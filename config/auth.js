module.exports={
    ensureAuthenticated:function(req,res,next){
        if(req.isAuthenticated()){
            return next()
        }
        req.flash('error msg ','You must be logged in')
        res.redirect('/users/login')
    }
}
const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
// const ExpressError=require("../utils/ExpressError.js");
// const {listingSchema,reviewSchema}=require("../schema.js");
const Listing=require("../models/listing.js");
const {isLoggedIn, isOwner,validateListing}=require("../middleware.js");
const listingController=require("../controllers/listings.js");
const multer=require('multer');
const {storage}=require("../cloudConfig.js");//
const upload=multer({storage});//
// const upload=multer({dest: 'uploads/'});



router.route("/")
//Index route
.get(wrapAsync(listingController.index))
//Create route
.post(isLoggedIn,upload.single("listing[image]"),validateListing,wrapAsync(listingController.createListing));
// .post(upload.single("listing[image]"),(req,res)=>{
    //     res.send(req.file);
    // })
    
    //New route
    router.get("/new",isLoggedIn,listingController.renderNewForm);
    
    
    router.route("/:id")
    //Show route
    .get(wrapAsync(listingController.showListing))
    //Update route
    .put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing,wrapAsync(listingController.updateListing))
    //Delete route
    .delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));
    
    
    //Edit route
    router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));
    
    module.exports=router;
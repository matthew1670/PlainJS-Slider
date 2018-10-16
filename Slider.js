function $Slider(SliderID, options = {}) {
  this.slider =  document.getElementById(SliderID),
  this.slides = this.slider.getElementsByTagName('li');
  this.SlideCount = this.slides.length ? this.slides.length : 0 ;
  this.SlideshowSpeed = options.speed ? options.speed : 5000;
  this.SlideshowAutoplay = options.autoplay ? options.autoplay : true;
  this.HoverPause = options.hoverStop ? options.hoverStop : true;
  this.thumbnails = options.thumbnails ? options.thumbnails : true;
  this.loopSlides = options.loop ? options.loop : true;
  this.startID = options.startAt ? options.startAt : 0;
  this.isPaused = false;
  this.initiated = false;
  this.defaultThumbnail = "https://via.placeholder.com/150x150?text=?";
//Function usefull for debugging.
  this.debug = function(){
    console.log("SliderID =",this.slider.id);
    console.log("Slides = ", this.slides);
  }

//Go to next Slide
  this.nextSlide = function(){
    console.log("Next Slide");
  };
  //Go to prev Slide
  this.PrevSlide = function(){
    console.log("Next Slide");
  };

//Initiate The slider
  this.init = function(){
    //Initiate Slider
    this.addClass(this.slides[this.startID], "active");
    for (slide of this.slides) {
      this.addClass(slide, "mySlides");
      var title = slide.getElementsByTagName('p')[0];
      title.classList = "Title";
      this.addClass(slide, "fade");
    }
    if (this.SlideshowAutoplay) {this.autoplay()}
    if (this.thumbnails) {this.CreateThumbs()}
    this.initiated = true;
  };
//Function to create the thumbnails
  this.CreateThumbs = function(){
    //Create the thumbnail container DIV
      var ThumbnailContainer = document.createElement("div");
      console.log(ThumbnailContainer);
      ThumbnailContainer.classList = "ThumbnailsContainer";
    //Loop through the slides and grab the "data-thumb" for each and remove after as no longer needed
      for (var y = 0; y < this.slides.length; y++) {
        var thumbnailSrc = this.slides[y].getAttribute("data-thumb");
        thumbnailSrc = thumbnailSrc ? thumbnailSrc : this.defaultThumbnail;
        this.slides[y].removeAttribute("data-thumb") ;
    //For each thumbnail create a new thumbnail item
        var thumbnailItem = document.createElement("div");
        thumbnailItem.classList = "thumbnailItem";
    //Create the thumbnail image and setting the attributes
        var thumbimg = document.createElement("img");
          thumbimg.setAttribute("src",thumbnailSrc);
          thumbimg.classList = "Responsive-img thumbnail";
    // Attach the image to the Thumbnail Item
        thumbnailItem.appendChild(thumbimg);
    // Add the thumbnail item to the container item.
        ThumbnailContainer.appendChild(thumbnailItem);
      }
      //append the Thumnails to the Slider
      this.slider.appendChild(ThumbnailContainer);
  };

  this.autoplay = function(){
      var i = this.startID;
      var slider = setInterval(function() {
        if (!this.isPaused){
            if (i === (this.SlideCount - 1)) {
              if (!this.loopSlides) {
                clearInterval(slider);
                return;
              }
              this.removeClass(this.slides[i], "active");
              i = -1;
            }else{
              this.removeClass(this.slides[i], "active");
            }
            i++;
            this.addClass(this.slides[i], "active");
        }
      }.bind(this), this.SlideshowSpeed);
  }
  this.hasClass = function(el, className) {
    if (el.classList)
      return el.classList.contains(className)
    else
      return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
  };
  this.addClass = function(el, className) {
    if (el.classList)
      el.classList.add(className)
    else if (!this.hasClass(el, className))
      el.className += " " + className
  };
  this.removeClass = function(el, className) {
    if (el.classList)
      el.classList.remove(className)
    else if (this.hasClass(el, className)) {
      var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
      el.className=el.className.replace(reg, ' ')
    }
  };
}
//
//
// /* Class the members of each slideshow group with different CSS classes */
// function showSlides(sliderID, options = {}) {
//   if (!sliderID) {
//     throw new Error("Cant Start Slider as no SliderID given");
//   }
//   var Slider = document.getElementById(sliderID);
//   if (!Slider) {
//     throw new Error("SliderJS - " + "No such slider with an ID of '" + sliderID + "' found.");
//   }
//   var slides = Slider.getElementsByTagName('li');
//   var SlideCount = slides.length ? slides.length : 0 ;
//   var SlideshowSpeed = options.speed ? options.speed : 7000;
//   var SlideshowAutoplay = options.autoplay ? options.autoplay : true;
//   var HoverPause = options.hoverStop ? options.hoverStop : true;
//   var thumbnails = options.thumbnails ? options.thumbnails : true;
//   var loopSlides = options.loop ? options.loop : true;
//   var startID = options.startAt ? options.startAt : 0;
//   var isPaused = false;
//
//   var init = function(){
//     //Initiate Slider
//     addClass(slides[startID], "active");
//     for (slide of slides) {
//       addClass(slide, "mySlides");
//       var title = slide.getElementsByTagName('p')[0];
//       title.classList = "Title";
//       addClass(slide, "fade");
//     }
//   }
//
//   if (SlideshowAutoplay) {
//     var i = startID;
//     var slider = setInterval(function () {
//       if (!isPaused){
//           if (i === (SlideCount - 1)) {
//             if (!loopSlides) {
//               clearInterval(slider);
//               return;
//             }
//             removeClass(slides[i], "active");
//             i = -1;
//           }else{
//             removeClass(slides[i], "active");
//           }
//           i++;
//           addClass(slides[i], "active");
//       }
//     }, SlideshowSpeed);
//   }
//
//   if (thumbnails.show) {
//     var thumbnails = [];
//   //Create the thumbnail container DIV
//     var ThumbnailContainer = document.createElement("div");
//     ThumbnailContainer.classList = "ThumbnailsContainer";
//   //Loop through the slides and grab the "data-thumb" for each and remove after as no longer needed
//     for (var y = 0; y < slides.length; y++) {
//       var thumbnailSrc = slides[y].getAttribute("data-thumb");
//       slides[y].removeAttribute("data-thumb") ;
//       if (thumbnailSrc) {
//         thumbnails[y] = thumbnailSrc;
//       }
//       else {
//           thumbnails[y] = null;
//       }
//   //For each thumbnail create a new thumbnail item
//       var thumbnailItem = document.createElement("div");
//       thumbnailItem.classList = "thumbnailItem";
//   //Create the thumbnail image and setting the attributes
//       var thumbimg = document.createElement("img");
//         thumbimg.setAttribute("src",thumbnailSrc);
//         thumbimg.classList = "Responsive-img thumbnail";
//   // Attach the image to the Thumbnail Item
//       thumbnailItem.appendChild(thumbimg);
//   // Add the thumbnail item to the container item.
//       ThumbnailContainer.appendChild(thumbnailItem);
//     }
//     Slider.appendChild(ThumbnailContainer);
//   }
// init();
// }
//
//
// // Extra functions
//   function hasClass(el, className) {
//     if (el.classList)
//       return el.classList.contains(className)
//     else
//       return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
//   }
//
//   function addClass(el, className) {
//     if (el.classList)
//       el.classList.add(className)
//     else if (!hasClass(el, className)) el.className += " " + className
//   }
//
//   function removeClass(el, className) {
//     if (el.classList)
//       el.classList.remove(className)
//     else if (hasClass(el, className)) {
//       var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
//       el.className=el.className.replace(reg, ' ')
//     }
//   }

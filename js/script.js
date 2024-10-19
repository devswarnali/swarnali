// Sticky Nav
    
$(window).scroll(function(){
    var scroll = $(window).scrollTop();     
    if (scroll > 100) { 
        $(".header").addClass("fixed"); 
    } 
    else {
        $(".header").removeClass("fixed"); 
    }
})




// one page scroll section
    
    jQuery(function($){
        var topMenuHeight = $(".header").outerHeight();
        $(".navbar-collapse").menuScroll(topMenuHeight);
      });
      
      // COPY THE FOLLOWING FUNCTION INTO ANY SCRIPTS
      jQuery.fn.extend({
          menuScroll: function(offset) {
          // Declare all global variables
            var topMenu = this;
            var topOffset = offset ? offset : 0;
            var menuItems = $(topMenu).find('a[href*="#"]');
            var lastId;
        
          // Save all menu items into scrollItems array
              var scrollItems = $(menuItems).map(function() {
                  var item = $($(this).attr("href"));
                  if (item.length) {
                      return item;
                  }
              });
      
          // When the menu item is clicked, get the #id from the href value, then scroll to the #id element
              $(topMenu).on("click", 'a[href*="#"]', function(e){
                  var href = $(this).attr("href");
                  
                  var offsetTop = href === "#" ? 0 : $(href).offset().top-topOffset;
      
                  $('html, body').stop().animate({ 
                      scrollTop: offsetTop
                  }, 300);
                  e.preventDefault();
      
              });
          
          // When page is scrolled
              $(window).scroll(function(){
                  var nm = $("html").scrollTop();
                  var nw = $("body").scrollTop();
                  var fromTop = (nm > nw ? nm : nw)+topOffset + 10;
      
            
            // When the page pass one #id section, return all passed sections to scrollItems and save them into new array current
                  var current = $(scrollItems).map(function(){
                      if ($(this).offset().top <= fromTop && $(this).offset().top + (this).height() > fromTop)
                      return this;
                  });
            
            // Get the most recent passed section from current array
                  current = current[current.length-1];
                  var id = current && current.length ? current[0].id : "";
                  if (lastId !== id) {
                      lastId = id;
                      // Set/remove active class
                      $(menuItems)
                      .parent().removeClass("nav-item active")
                      .end().filter("[href='#"+id+"']").parent().addClass("nav-item active");
                  }      
      
              });
          }
      });
    

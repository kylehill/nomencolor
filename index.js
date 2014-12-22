(function(window){
  
  Nomencolor.load(colorList)
  
  var translateWrapper = function(colorText) {
    var translated = Nomencolor.compare(colorText)
    
    $("#swatches").empty()
    
    _.each(translated.nearest, function(color) {
      $("#swatches").append($("<div data-hex='" + (color.hex || color.color.hex) + "'></div>")
                    .addClass("swatch")
                    .css("background-color", color.hex || color.color.hex))
    })
    
    var closest = _.first(translated.nearest).color || _.first(translated.nearest)
    
    $("#name").text(closest.name)
    $("#hex").text(closest.hex)
    $("#rgb").text(["rgb(", closest.rgb.r, ", ", closest.rgb.g, ", ", closest.rgb.b, ")"].join(""))
    $("#hsl").text(["hsl(", closest.hsl.h, ", ", closest.hsl.s, "%, ", closest.hsl.l, "%)"].join(""))
    
    $("#feature-swatch").css("background-color", closest.hex)
    
    $(".swatch").on("click", function(evt){
      translateWrapper($(evt.target).attr("data-hex"))
    })
  }
  
  translateWrapper("orangered")
  
  window.translateWrapper = translateWrapper
  
})(window);
(function(window){
  
  Nomencolor.load(colorList)
  
  var randomHex = function() {
    return "#" + Math.floor(Math.random() * 16).toString(16)
      + Math.floor(Math.random() * 16).toString(16)
      + Math.floor(Math.random() * 16).toString(16)
  }
  
  window.translateWrapper = function(colorText) {
    var translated = Nomencolor.compare(colorText)
    
    $("#swatches").empty()
    
    _.each(translated.nearest, function(color, i) {
      $("#swatches").append($("<div></div>")
        .addClass("swatch")
        .attr("data-hex", color.color.hex)
        .attr("data-index", i)
        .css("background-color", color.color.hex))
    })
    
    var closest = _.first(translated.nearest).color

    updateMain(closest)
    
    $(".swatch").on("click", function(evt){
      translateWrapper($(evt.target).attr("data-hex"))
    })
    
    $(".swatch").on("mouseover", function(evt){
      var index = $(evt.target).attr("data-index")
      updateMain(translated.nearest[index].color)
    })
    
    $(".swatch").on("mouseout", function(evt){
      updateMain(translated.nearest[0].color)
    })
  }
  
  window.updateMain = function(color) {
    $("#name").val(color.name)
    $("#hex").text(color.hex)
    $("#rgb").text(["rgb(", color.rgb.r, ", ", color.rgb.g, ", ", color.rgb.b, ")"].join(""))
    $("#hsl").text(["hsl(", color.hsl.h, ", ", color.hsl.s, "%, ", color.hsl.l, "%)"].join(""))
    
    $("#feature-swatch").css("background-color", color.hex)
    
    $(".name").on("blur", function(evt){
      $("#name").val(color.name)
    })
  }
  
  $(".name").on("change", function(evt){
    translateWrapper($(this).val())
  })
  
  $(".name").on("focus", function(evt){
    $("#name").val("")
  })
  
  
  
  translateWrapper(randomHex())
  
})(window);
(function(window){
  
  var computeColor = function(colorText) {
    var container = document.getElementById("colorCompute")
    var div = document.createElement("div")
    container.appendChild(div)
    
    div.style.color = colorText
    var color = window.getComputedStyle(div).color
    
    container.removeChild(div)
    return color
  }
  
  var convertToHsl = function(r1, g1, b1) {
    var r = r1/255, g = g1/255, b = b1/255
    
    var min = Math.min(r,g,b)
    var max = Math.max(r,g,b)
    
    var l = (min + max) / 2
    
    var s = 0
    if (min < max) {
      s = (max - min) / (max + min)
      if (l > .5) {
        s = (max - min) / (2 - max - min)
      }
    }
    
    var h = 0
    if (min < max) {
      if (r === max) {
        h = (g - b)/(max - min)
      }
      if (g === max) {
        h = 2 + (b - r)/(max - min)
      }
      if (b === max) {
        h = 4 + (r - g)/(max - min)
      }
      
    }
    
    h = h * 60
    
    if (h < 0) {
      h += 360
    }
    
    return {
      h: h,
      s: s,
      l: l
    }
  }
  
  var nomencolor = function(colorText){
    
    // Convert input from x11/rgb/hex/hsl to rgb/rgba
    var computedRgbString = computeColor(colorText)
    
    // Convert rgb(a) string to numbers
    var computedRgbValues = computedRgbString.split("(")[1].split(")")[0].split(",").map(function(i){ return i * 1 })
    
    // Convert rgb to hsl
    var computedHslValues = convertToHsl(computedRgbValues[0], computedRgbValues[1], computedRgbValues[2])
    
    var output = {
      input: colorText,
      rgb: {
        r: computedRgbValues[0],
        g: computedRgbValues[1],
        b: computedRgbValues[2]
      },
      hsl: computedHslValues
    }
    
    return output
    
  }
  
  window.Nomencolor = nomencolor
  
})(window);
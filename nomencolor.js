(function(window){
  
  function computeColor(colorText) {
    var container = document.getElementById("colorCompute")
    var div = document.createElement("div")
    container.appendChild(div)
    
    div.style.color = colorText
    var color = window.getComputedStyle(div).color
    
    container.removeChild(div)
    return color
  }
  
  function convertToHsl(r1, g1, b1) {
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
      h: Math.round(h),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    }
  }
  
  function convertToHex(r1, g1, b1) {
    var r = r1.toString(16), g = g1.toString(16), b = b1.toString(16)
    
    if (r.length === 1) {
      r = ("0" + r)
    }
    if (g.length === 1) {
      g = ("0" + g)
    }
    if (b.length === 1) {
      b = ("0" + b)
    }
    
    return "#" + r + g + b
  }
  
  function translate(colorText, name) {
    
    // Convert input from x11/rgb/hex/hsl to rgb/rgba
    var rgbString = computeColor(colorText)
    
    // Convert rgb(a) string to numbers
    var rgb = rgbString.split("(")[1].split(")")[0].split(",").map(function(i){ return i * 1 })
    
    var output = {
      rgb: {
        r: rgb[0],
        g: rgb[1],
        b: rgb[2]
      },
      hsl: convertToHsl(rgb[0], rgb[1], rgb[2]),
      hex: convertToHex(rgb[0], rgb[1], rgb[2])
    }
    
    if (name) {
      output.name = name
    }
    
    return output
    
  }
  
  var colorMemory = []
  var colorNames = {}
  
  function load(colorList) {
    colorList.forEach(function(color){
      var translated = translate("#" + color[0], color[1])
      colorMemory.push(translated)
      colorNames[translated.name.toLowerCase()] = translated
    })
  }
  
  function compare (colorText) {
    var t = colorNames[colorText.toLowerCase()] || translate(colorText)
    
    var comparisons = colorMemory.map(function(color) {
      var rgbDelta = Math.pow(t.rgb.r - color.rgb.r, 2) + Math.pow(t.rgb.g - color.rgb.g, 2) + Math.pow(t.rgb.b - color.rgb.b, 2)
      var hDelta = Math.min(Math.abs(t.hsl.h - color.hsl.h), Math.abs(t.hsl.h - (color.hsl.h + 360)))
      
      var hslDelta = Math.pow(hDelta, 2) + Math.pow(t.hsl.s - color.hsl.s, 2) + Math.pow(t.hsl.l - color.hsl.l, 2)
      
      return {
        color: color,
        delta: (rgbDelta * 200) + (hslDelta * 10)
      }
    })
    
    comparisons.sort(function(a, b) {
      return a.delta - b.delta
    })
    
    return {
      input: t,
      nearest: comparisons.slice(0, 20)
    }
  }
  
  window.Nomencolor = {
    colors: colorMemory,
    load: load,
    translate: translate,
    compare: compare
  }
  
})(window);
function initialSettingAboutDrag () {
  var elements = document.getElementsByClassName("draggable")

  var x = 0
  var y = 0

  for(var i = 0; i < elements.length; i++) {
    elements[i].addEventListener("mousedown", onStart, false)
    elements[i].addEventListener("touchstart", onStart, false)
  }
}

function onStart(e) {
  this.classList.add("dragging")

  console.log(e)
  if(e.type === "mousedown") {
    var event = e
  }
  else {
    var event = e.changedTouches[0]
  }

  x = event.pageX - this.offsetLeft
  y = event.pageY - this.offsetTop

  document.body.addEventListener("mousemove", onMove, false)
  document.body.addEventListener("touchmove", onMove, false)
}

function onMove(e) {
  var drag = document.getElementsByClassName("dragging")[0]

  if(e.type === "mousemove") {
    var event = e
  } else {
    var event = e.changedTouches[0]
  }

  e.preventDefault()



  drag.style.top = event.pageY - y + "px"
  drag.style.left = event.pageX - x + "px"

  drag.addEventListener("mouseup", onLeave, false)
  drag.addEventListener("touchend", onLeave, false)
  document.body.addEventListener("mouseleave", onLeave, false)
  document.body.addEventListener("touchleave", onLeave, false)
}

function onLeave(e) {
  var drag = document.getElementsByClassName("dragging")[0]

  document.body.removeEventListener("mousemove", onMove, false)
  document.body.removeEventListener("touchmove", onMove, false)
  document.body.removeEventListener("mouseleave", onLeave, false)
  document.body.removeEventListener("touchleave", onLeave, false)
  drag.removeEventListener("mouseup", onStart, false)
  drag.removeEventListener("touchend", onStart, false)

  drag.classList.remove("dragging")
}

function isInParent(target) {
  let parent = target.parentNode

  console.log(target.left)
  console.log(target.right)
}

window.onload = () => {
  initialSettingAboutDrag()
}

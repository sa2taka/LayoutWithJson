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

  if (e.type === "mousedown") {
    var event = e
  }
  else {
    var event = e.changedTouches[0]
  }

  x = event.pageX - this.offsetLeft
  y = event.pageY - this.offsetTop

  document.body.addEventListener("mousemove", onMove, false)
  document.body.addEventListener("touchmove", onMove, false)
  this.addEventListener("mouseup", onLeave, false)
  this.addEventListener("touchend", onLeave, false)
  document.body.addEventListener("mouseleave", onLeave, false)
  document.body.addEventListener("touchleave", onLeave, false)
}

function onMove(e) {
  let drag = document.getElementsByClassName("dragging")[0]

  if(e.type === "mousemove") {
    var event = e
  } else {
    var event = e.changedTouches[0]
  }

  e.preventDefault()

  if (isNextInParent(drag, event, x, y)) {
    drag.style.top = event.pageY - y + "px"
    drag.style.left = event.pageX - x + "px"
  }

  if (isNextInBottom100px(drag, event, x, y)) {
    console.log(document.body.clientHeight + 500 + "px")
    drag.parentNode.style.height = drag.parentNode.clientHeight + 500 + "px"
  }
}

function onLeave(e) {
  let drag = document.getElementsByClassName("dragging")[0]

  document.body.removeEventListener("mousemove", onMove, false)
  document.body.removeEventListener("touchmove", onMove, false)
  document.body.removeEventListener("mouseleave", onLeave, false)
  document.body.removeEventListener("touchleave", onLeave, false)
  drag.removeEventListener("mouseup", onStart, false)
  drag.removeEventListener("touchend", onStart, false)

  drag.classList.remove("dragging")
}

function isNextInParent(target, event, x, y) {
  let nextX = event.pageX - x
  if (nextX  < 0) {
    return false
  }

  if (nextX  >= target.parentNode.clientWidth) {
    return false
  }

  return true
}

function isNextInBottom100px(target, event, x, y) {
  let nextY = event.pageY - y

  return nextY >= target.parentNode.clientHeight - 200
}

window.onload = () => {
  initialSettingAboutDrag()
}

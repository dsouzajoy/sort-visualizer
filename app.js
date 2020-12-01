var canvas = document.getElementById('canvas')
resizeCanvasToDisplaySize()

//Global Variables
var i = 0
var j = 0
var temp
var ctx = canvas.getContext('2d')
var rectColor
var minIndex
var iterations = 0
var stepSpeed = 1

// Constants
const SPACE_BETWEEN_RECTS = 3
const CANVAS_PADDING = 10
const RECT_WIDTH = canvas.width > 1100 ? 5 : 3
const ARRAY_SIZE = Math.floor(canvas.width / (RECT_WIDTH + SPACE_BETWEEN_RECTS)) - 3 // minus 3 to get a little padding on the right
// const ARRAY_SIZE = 20
const BUBBLE_SORT = 'BUBBLE_SORT'
const SELECTION_SORT = 'SELECTION_SORT'

const sortingAlgos = {
  BUBBLE_SORT: bubbleSort,
  SELECTION_SORT: selectionSort,
}

let chosenAlgo = document.getElementById('sorting-dropdown').value || 'BUBBLE_SORT'
let algo = sortingAlgos[chosenAlgo]
let mainList = getRandomArray(ARRAY_SIZE)
let iterator = algo(mainList)

function init() {
ctx.clearRect(0, 0, canvas.width, canvas.height)
  let dropdownContent = ''
  Object.keys(sortingAlgos).forEach((algo) => {
    dropdownContent += `<option value='${algo}'>${toTitleCase(algo.split('_').join(' '))}</option>`
  })
  document.getElementById('sorting-dropdown').innerHTML = dropdownContent
  let rectOffset = CANVAS_PADDING
  mainList.forEach((rectHeight) => {
    drawRect(rectOffset, 5, RECT_WIDTH, rectHeight)
    rectOffset = rectOffset + RECT_WIDTH + SPACE_BETWEEN_RECTS
  })
}

function refreshArray() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    mainList = getRandomArray(ARRAY_SIZE)
    iterator = algo(mainList)
    init()
}

function startProcess() {
  audioContext.resume()
  runAnimation()
}

function runAnimation() {
  document.getElementById('iteration-indicator').innerHTML = iterations
  let rectOffset = CANVAS_PADDING
  let rectangles
  for (let step = 0; step < stepSpeed; step++) {
    rectangles = iterator.next().value
  }

  if (rectangles) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    rectangles.forEach((rectHeight, index) => {
      rectColor = getColor(index)
      drawRect(rectOffset, 5, RECT_WIDTH, rectHeight, rectColor)
      rectOffset = rectOffset + RECT_WIDTH + SPACE_BETWEEN_RECTS
    })
    requestAnimationFrame(runAnimation)
  } else {
    console.log('Done')
    mainList.forEach((rectHeight) => {
      drawRect(rectOffset, 5, RECT_WIDTH, rectHeight)
      rectOffset = rectOffset + RECT_WIDTH + SPACE_BETWEEN_RECTS
    })
  }
}

init()

function getColor(index) {
  switch (chosenAlgo) {
    case BUBBLE_SORT: {
      return index === j ? '#F06449' : '#5BC3EB'
    }

    case SELECTION_SORT: {
      return index === minIndex || index === j ? '#F06449' : '#5BC3EB'
    }

    default: {
      return '#5BC3EB'
    }
  }
}

//event listeners
function handleAlgorithmSelection() {
  console.log('$')
  chosenAlgo = document.getElementById('sorting-dropdown').value || 'BUBBLE_SORT'
  algo = sortingAlgos[chosenAlgo]
  iterator = algo(mainList)
}

var canvas = document.getElementById('canvas')
resizeCanvasToDisplaySize()

//Global Variables
var i = 0
var j = 0
var temp
var ctx = canvas.getContext('2d')
var rectColor
var minIndex
var iterations
var stepSpeed = 1
var isComplete = false
var states = []

// Constants
const SPACE_BETWEEN_RECTS = 1
const CANVAS_PADDING = 10
let RECT_WIDTH = canvas.width > 1100 ? 7 : 3
let ARRAY_SIZE = Math.floor(canvas.width / (RECT_WIDTH + SPACE_BETWEEN_RECTS)) - 6 // minus 3 to get a little padding on the right
// const ARRAY_SIZE = 20
const BUBBLE_SORT = 'BUBBLE_SORT'
const SELECTION_SORT = 'SELECTION_SORT'
const QUICK_SORT = 'QUICK_SORT'
const MERGE_SORT = 'MERGE_SORT'

const sortingAlgos = {
  BUBBLE_SORT: bubbleSort,
  SELECTION_SORT: selectionSort,
  QUICK_SORT: quickSort,
  MERGE_SORT: mergeSort,
}

let chosenAlgo = document.getElementById('sorting-dropdown').value || 'BUBBLE_SORT'
let algo = sortingAlgos[chosenAlgo]
let mainList
// let iterator = algo(mainList, 0, mainList.length - 1)

function init() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  mainList = getRandomArray(ARRAY_SIZE)
  iterations = 0
  document.getElementById('iteration-indicator').innerHTML = iterations
  let dropdownContent = ''
  Object.keys(sortingAlgos).forEach((algo) => {
    dropdownContent += `<option value='${algo}'>${toTitleCase(algo.split('_').join(' '))}</option>`
  })
  document.getElementById('sorting-dropdown').innerHTML = dropdownContent
  document.getElementById('sorting-dropdown').value = chosenAlgo
  let rectOffset = CANVAS_PADDING
  mainList.forEach((rectHeight) => {
    drawRect(rectOffset, 5, RECT_WIDTH, rectHeight)
    rectOffset = rectOffset + RECT_WIDTH + SPACE_BETWEEN_RECTS
  })
}

function refreshArray() {
  if (isSorted(mainList)) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    iterations = 0
    mainList = getRandomArray(ARRAY_SIZE)
    init()
  }
}

function startProcess() {
  iterations = 0
  document.getElementById('iteration-indicator').innerHTML = iterations
  audioContext.resume()
  if (!isSorted(mainList)) {
    algo(mainList, 0, mainList.length - 1)
    runAnimation()
  } else {
    let choice = confirm('List is already sorted. Would you like to continue by refreshing?')
    if (choice) {
      refreshArray()
      startProcess()
    }
  }
}

function runAnimation() {
  document.getElementById('iteration-indicator').innerHTML = iterations
  let rectOffset = CANVAS_PADDING
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  mainList.forEach((rectHeight, index) => {
    drawRect(rectOffset, 5, RECT_WIDTH, rectHeight, getColor(index))
    rectOffset = rectOffset + RECT_WIDTH + SPACE_BETWEEN_RECTS
  })

  if (!isSorted(mainList)) {
    requestAnimationFrame(runAnimation)
  } else {
    console.log('done')
    rectOffset = CANVAS_PADDING
    ctx.clearRect(0, 0, canvas.width, canvas.height)
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
      return index === j ? '#F06449' : index === minIndex ? '#39FF14' : '#5BC3EB'
    }

    case QUICK_SORT:
    case MERGE_SORT: {
      return states[index] === 0 ? '#F06449' : states[index] === 1 ? '#39FF14' : '#5BC3EB'
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
}

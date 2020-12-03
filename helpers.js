// Shape drawing functions
function drawRect(x, y, width, height, color) {
  let c = document.getElementById('canvas')
  let ctx = c.getContext('2d')
  ctx.fillStyle = color || '#5BC3EB'
  ctx.fillRect(x, y, width, height)
}

function drawText(text, fontSize = 12, x = 0, y = 0) {
  let c = document.getElementById('canvas')
  let ctx = c.getContext('2d')
  ctx.lineWidth = 8
  ctx.font = '${fontSize}rem Arial'
  ctx.strokeStyle = '#2D1E2F'
  // ctx.fillStyle = '#EDE6E3';
  ctx.textAlign = 'center'
  ctx.miterLimit = 500
  // ctx.strokeText(text, x, y);
  ctx.fillText(text, x, y)
}

//Sorting Functions
async function bubbleSort(arr) {
  let isSwapped
  for (i = 0; i < arr.length; i++) {
    isSwapped = false
    for (j = 0; j < arr.length - i - 1; j++) {
      await sleep(0)
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1)
        isSwapped = true
      }
      if (j % 2 === 0) {
        playTone(arr[j] / 2)
      }
      iterations += 1
    }
    if (!isSwapped) {
      break
    }
  }
  return true
}

async function selectionSort(arr) {
  minIndex = 0 //index of the minimum element
  for (i = 0; i < arr.length; i++) {
    minIndex = i
    for (j = i + 1; j < arr.length; j++) {
      await sleep(0)
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
      if (j % 2 === 0) {
        playTone(arr[j] / 2)
      }
      iterations += 1
    }
    if (minIndex != i) {
      swap(arr, i, minIndex)
      playTone(arr[minIndex] / 5)
    }
  }
}

async function partition(arr, start, end) {
  for (let a = start; a <= end; a++) {
    states[a] = 1
  }
  let pivotValue = arr[end]
  let pivotIndex = start
  states[pivotIndex] = 0
  for (let i = start; i < end; i++) {
    if (arr[i] < pivotValue) {
      playTone(arr[i] / 3)
      await sleep(45)
      swap(arr, i, pivotIndex)
      states[pivotIndex] = -1
      pivotIndex++
      states[pivotIndex] = 0
    }
  }
  swap(arr, pivotIndex, end)
  for (let a = start; a <= end; a++) {
    states[a] = -1
  }

  return pivotIndex
}

async function quickSort(arr, start, end) {
  if (start >= end) {
    return
  }
  let index = await partition(arr, start, end)

  states[index] = -1

  quickSort(arr, start, index - 1)
  quickSort(arr, index + 1, end)
  iterations += 1
}

 function merge(left, right) {
  let resultArr = [],
    leftIndex = 0,
    rightIndex = 0
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      resultArr.push(left[leftIndex])
      leftIndex++
    } else {
      resultArr.push(right[rightIndex])
      rightIndex++
    }
  }
  return resultArr.concat(left.slice(leftIndex)).concat(right.slice(rightIndex))
}

 function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr
  }
  const half = Math.floor(arr.length / 2)
  const left = arr.slice(0, half)
  const right = arr.slice(half)

  return merge(mergeSort(left), mergeSort(right))
}

function mergeSortVisual(arr) {
  mainList = mergeSort(arr)
}

// Other Functions
function getRandomArray(size) {
  let randomArray = []
  for (let i = 0; i < size; i++) {
    randomArray.push(getRandomInt(100, document.getElementsByTagName('body')[0].clientHeight - 150))
  }
  return randomArray
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

function swap(arr, a, b) {
  let temp = arr[a]
  arr[a] = arr[b]
  arr[b] = temp
}

function resizeCanvasToDisplaySize() {
  // look up the size the canvas is being displayed
  const width = canvas.offsetWidth
  const height = canvas.offsetHeight

  // If it's resolution does not match change it
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width
    canvas.height = height
    return true
  }

  return false
}

function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map((x) => x[0].toUpperCase() + x.slice(1))
    .join(' ')
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// I know we need some better logic..but this works for now
function isSorted(arr) {
  for (let idx = 0; idx < arr.length - 1; idx++) {
    if (arr[idx] > arr[idx + 1]) {
      return false
    }
  }
  return true
}

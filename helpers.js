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
    ctx.lineWidth  = 8;
    ctx.font = '${fontSize}rem Arial';
    ctx.strokeStyle = '#2D1E2F';
    // ctx.fillStyle = '#EDE6E3';
    ctx.textAlign = 'center';
    ctx.miterLimit = 500;
    // ctx.strokeText(text, x, y);
    ctx.fillText(text, x, y);
}

//Sorting Functions
function* bubbleSort(arr) {
  for (i = 0; i < arr.length; i++) {
    for (j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1)
      }
      playTone(noteTable[Math.floor(arr[j] % noteTable.length)])
      iterations += 1
      yield arr
    }
  }
}

function* selectionSort(arr) {
  minIndex = 0 //index of the minimum element
  for (i = 0; i < arr.length; i++) {
    minIndex = i
    for (j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
      playTone(noteTable[Math.floor(arr[j] % noteTable.length)])
      iterations += 1
      yield arr
    }
    if (minIndex != i) {
      swap(arr, i, minIndex)
    }
  }
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
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
 
    // If it's resolution does not match change it
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      return true;
    }
 
    return false;
 }

 function toTitleCase(str) {
    return str.toLowerCase().split(' ').map(x=>x[0].toUpperCase()+x.slice(1)).join(' ');
  }
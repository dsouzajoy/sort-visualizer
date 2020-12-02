var audioContext = new (window.AudioContext || window.webkitAudioContext)()
sineTerms = new Float32Array([0, 0, 1, 0, 1])
cosineTerms = new Float32Array(sineTerms.length)
customWaveform = audioContext.createPeriodicWave(cosineTerms, sineTerms)

function playTone(freq) {
  let osc = audioContext.createOscillator()
  osc.connect(audioContext.destination)
  osc.setPeriodicWave(customWaveform)
  osc.frequency.value = freq
  osc.start()
  setTimeout(() => {
    osc.stop()
  }, 50)
}

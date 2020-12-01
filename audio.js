var audioContext = new (window.AudioContext || window.webkitAudioContext)()
sineTerms = new Float32Array([0, 0, 1, 0, 1])
cosineTerms = new Float32Array(sineTerms.length)
customWaveform = audioContext.createPeriodicWave(cosineTerms, sineTerms)

var noteTable = []
// noteTable[0] = 2093.004522404789077;
// noteTable[1]  = 2217.461047814976769;
// noteTable[2] = 2349.318143339260482;
// noteTable[3]  = 2489.015869776647285;
// noteTable[4]  = 2637.020455302959437;
// noteTable[5]  = 2793.825851464031075;
// noteTable[6]  = 2959.955381693075191;
// noteTable[7]  = 3135.963487853994352;
// noteTable[8]  = 3322.437580639561108;
// noteTable[9]  = 3520.000000000000000;
// noteTable[10]  = 3729.310092144719331;
// noteTable[11]  = 3951.066410048992894;

noteTable[0] = 523.251;
noteTable[1] = 554.365;
noteTable[2] = 587.33;
noteTable[3] = 622.254;
noteTable[4] = 659.255;
noteTable[5] = 698.456;
noteTable[6] = 739.989;
noteTable[7]= 783.991;
noteTable[8] = 830.609;
noteTable[9] = 880;
noteTable[10] = 932.328;
noteTable[11] = 987.767;

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

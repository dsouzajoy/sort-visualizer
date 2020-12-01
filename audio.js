var audioContext = new (window.AudioContext || window.webkitAudioContext)()
sineTerms = new Float32Array([0, 0, 1, 0, 1])
cosineTerms = new Float32Array(sineTerms.length)
customWaveform = audioContext.createPeriodicWave(cosineTerms, sineTerms)

var noteTable = []
noteTable[0] = 65.406;
noteTable[1]  = 2217.461047814976769;
noteTable[2] = 	69.296;
noteTable[3]  = 73.416;
noteTable[4]  = 77.782;
noteTable[5]  = 82.407;
noteTable[6]  = 87.307;
noteTable[7]  = 92.499;
noteTable[8]  = 	97.999;
noteTable[9]  = 103.826;
noteTable[10]  = 110;
noteTable[11]  = 116.541;

noteTable[12] = 523.251;
noteTable[13] = 554.365;
noteTable[14] = 587.33;
noteTable[15] = 622.254;
noteTable[16] = 659.255;
noteTable[17] = 698.456;
noteTable[18] = 739.989;
noteTable[19]= 783.991;
noteTable[20] = 830.609;
noteTable[21] = 880;
noteTable[22] = 932.328;
noteTable[23] = 987.767;

// noteTable[24] = 2093.004522404789077;
// noteTable[25]  = 2217.461047814976769;
// noteTable[26] = 2349.318143339260482;
// noteTable[27]  = 2489.015869776647285;
// noteTable[28]  = 2637.020455302959437;
// noteTable[29]  = 2793.825851464031075;
// noteTable[30]  = 2959.955381693075191;
// noteTable[31]  = 3135.963487853994352;
// noteTable[32]  = 3322.437580639561108;
// noteTable[33]  = 3520.000000000000000;
// noteTable[34]  = 3729.310092144719331;
// noteTable[35]  = 3951.066410048992894;


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

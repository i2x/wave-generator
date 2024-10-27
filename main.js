const fs = require('fs');
const wav = require('node-wav');
const math = require('mathjs');

// Parameters
const duration = 5; // duration of the sweep in seconds
const sampleRate = 44100; // samples per second
const startFreq = 20; // start frequency in Hz
const endFreq = 20000; // end frequency in Hz
const numSamples = duration * sampleRate;

// Generate time values
const t = Array.from({ length: numSamples }, (_, i) => i / sampleRate);

// Function for logarithmic sweep
const sweep = t.map(time => {
    const freq = startFreq * Math.pow(endFreq / startFreq, time / duration);
    return Math.sin(2 * Math.PI * freq * time);
});

// Convert to 16-bit PCM format (range: -32768 to 32767)
const sweepPcm = sweep.map(val => Math.max(-1, Math.min(1, val)) * 32767);
const buffer = new Float32Array(sweepPcm);

// Write the data to a WAV file
const wavBuffer = wav.encode([buffer], { sampleRate: sampleRate, float: false, bitDepth: 16 });
fs.writeFileSync('sweep.wav', wavBuffer);

console.log('Sweep sound generated and saved as sweep.wav');

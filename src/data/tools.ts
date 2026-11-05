import { OnlineTool } from './types';

export const ONLINE_TOOLS: OnlineTool[] = [
  {
    id: 'tool-dead-pixel',
    name: 'Dead Pixel Test',
    url: 'https://displaytech.org/en/tests/dead.pixel.htm',
    category: 'display',
    purpose: 'Cycle full-screen colors (black, white, red, green, blue) to locate stuck pixels, subpixel defects, backlight bleeding, and uneven panels.',
    usage: 'Press F11 for full-screen mode in the browser. Cycle through all solid colors while looking closely across all quadrants and corners of the display.'
  },
  {
    id: 'tool-crystaldiskinfo',
    name: 'CrystalDiskInfo (Drive Health & SMART)',
    url: 'https://crystalmark.info/en/software/crystaldiskinfo/',
    category: 'storage',
    purpose: 'Industry-standard utility to inspect SSD/NVMe health percentage, Total Host Writes (TBW), power-on hours, temperature, and reallocated bad sectors.',
    usage: 'Download the portable .zip version onto a USB drive before visiting the shop. Run it directly without installation to verify disk health status.'
  },
  {
    id: 'tool-keyboard-trackpad',
    name: 'Keyboard & Trackpad Test',
    url: 'https://en.key-test.ru/',
    category: 'keyboard-touchpad',
    purpose: 'Interactive visual keyboard that lights up every key press, verifying F1–F12, modifiers, Spacebar, Enter, and multi-key rollover.',
    usage: 'Press every physical key on the laptop one by one. Check if any key fails to register, requires excessive force, or registers twice (chattering).'
  },
  {
    id: 'tool-webcam',
    name: 'Webcam Test',
    url: 'https://webcamtests.com/',
    category: 'connectivity',
    purpose: 'Tests camera sensor resolution, optical clarity, color accuracy, autofocus, and actual video frame rate in real-time.',
    usage: 'Allow camera permissions in browser. Verify picture is crisp, not blurry or foggy, and physical privacy shutter slides smoothly.'
  },
  {
    id: 'tool-mic',
    name: 'Microphone Test',
    url: 'https://mictests.com/',
    category: 'connectivity',
    purpose: 'Measures live microphone frequency response, audio waveform, background noise cancellation, and stereo/dual-mic pickup.',
    usage: 'Speak at a normal conversational volume from 1-2 feet away. Ensure the audio waveform moves cleanly and playback is free of electrical buzzing.'
  },
  {
    id: 'tool-speaker',
    name: 'Speaker & Audio Frequency Test',
    url: 'https://laptopanalyzer.com/test/audio/',
    category: 'connectivity',
    purpose: 'Plays left/right stereo channel sweeps and high/low frequencies to check for blown speaker cones, rattling, distortion, or dead channels.',
    usage: 'Turn volume up to 80-90% and test both left and right speakers independently. Listen carefully for metallic buzzing or torn cone distortion.'
  },
  {
    id: 'tool-usb-checker',
    name: 'USB Port Checker',
    url: 'https://pctester.online/usb-port-checker/',
    category: 'connectivity',
    purpose: 'Helps track and test connection reliability, data transfer readiness, and plug detection on each individual USB-A and USB-C port.',
    usage: 'Insert a flash drive or USB mouse into every port on both sides of the laptop. Verify instant recognition and stable connection when wiggled gently.'
  }
];

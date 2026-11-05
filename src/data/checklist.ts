import { ChecklistItem } from './types';

export const CHECKLIST_ITEMS: ChecklistItem[] = [
  // 1. Processor (CPU)
  {
    id: 'chk-cpu-model',
    categoryId: 'processor',
    title: 'Exact CPU model & generation verified',
    severity: 'high',
    guideSlug: 'processor',
    hint: 'Check in Task Manager > Performance > CPU. Ensure 8th Gen+ for Win 11.'
  },
  {
    id: 'chk-cpu-cores',
    categoryId: 'processor',
    title: 'Physical cores & logical threads match specs',
    severity: 'medium',
    guideSlug: 'processor',
    hint: 'Query via PowerShell Get-CimInstance Win32_Processor.'
  },
  {
    id: 'chk-cpu-idle',
    categoryId: 'processor',
    title: 'Idle CPU usage stays below 5–10%',
    severity: 'medium',
    guideSlug: 'processor',
    hint: 'Close apps. If pinned at 50%+, check for runaway background processes.'
  },
  {
    id: 'chk-cpu-temp',
    categoryId: 'processor',
    title: 'Fan spins smoothly without loud rattling or screech',
    severity: 'high',
    guideSlug: 'processor',
    hint: 'Listen closely to the exhaust vent when CPU is under load.'
  },
  {
    id: 'chk-cpu-throttling',
    categoryId: 'processor',
    title: 'No severe thermal throttling under 10m load',
    severity: 'high',
    guideSlug: 'processor',
    hint: 'Clock speed should not plunge to 0.79 GHz during video playback.'
  },
  {
    id: 'chk-cpu-restarts',
    categoryId: 'processor',
    title: 'No spontaneous reboots or blue screens (BSOD)',
    severity: 'critical',
    guideSlug: 'processor',
    hint: 'Unexpected restarts under load indicate failing silicon or VRMs.'
  },
  {
    id: 'chk-cpu-warm-reboot',
    categoryId: 'processor',
    title: 'Laptop boots cleanly on warm restart after load',
    severity: 'high',
    guideSlug: 'processor',
    hint: 'Restart the PC after heating it up to verify warm boot reliability.'
  },

  // 2. RAM (Memory)
  {
    id: 'chk-ram-capacity',
    categoryId: 'ram',
    title: 'Total RAM capacity meets requirements (8 GB+)',
    severity: 'high',
    guideSlug: 'ram',
    hint: 'Check Task Manager > Performance > Memory. 8 GB min, 16 GB ideal.'
  },
  {
    id: 'chk-ram-generation',
    categoryId: 'ram',
    title: 'DDR generation & operating frequency verified',
    severity: 'low',
    guideSlug: 'ram',
    hint: 'Verify DDR4/DDR5 speed (e.g. 2400/2666/3200 MHz).'
  },
  {
    id: 'chk-ram-slots',
    categoryId: 'ram',
    title: 'Available upgrade slots or channel configuration checked',
    severity: 'medium',
    guideSlug: 'ram',
    hint: 'Look for "Slots used: 1 of 2" if you plan to upgrade.'
  },
  {
    id: 'chk-ram-soldered',
    categoryId: 'ram',
    title: 'Confirmed RAM is not permanently locked at <= 8 GB soldered',
    severity: 'medium',
    guideSlug: 'ram',
    hint: 'Soldered 4 GB or 8 GB with 0 empty slots cannot be upgraded later.'
  },
  {
    id: 'chk-ram-usable',
    categoryId: 'ram',
    title: 'All installed memory is usable by Windows',
    severity: 'high',
    guideSlug: 'ram',
    hint: 'Ensure system does not say e.g. "8 GB installed, 3.9 GB usable".'
  },
  {
    id: 'chk-ram-diagnostic',
    categoryId: 'ram',
    title: 'No memory address faults or dump errors detected',
    severity: 'medium',
    guideSlug: 'ram',
    hint: 'Use mdsched.exe if blue screens or application crashes occur.'
  },

  // 3. Storage (SSD/HDD)
  {
    id: 'chk-storage-type',
    categoryId: 'storage',
    title: 'Primary boot drive is confirmed SSD (not HDD)',
    severity: 'high',
    guideSlug: 'storage',
    hint: 'Check Task Manager > Performance > Disk 0. Must display SSD.'
  },
  {
    id: 'chk-storage-capacity',
    categoryId: 'storage',
    title: 'Actual storage capacity verified (256 GB+)',
    severity: 'medium',
    guideSlug: 'storage',
    hint: 'Ensure C: drive partition matches advertised disk capacity.'
  },
  {
    id: 'chk-storage-smart',
    categoryId: 'storage',
    title: 'CrystalDiskInfo SMART health is Good (> 80%)',
    severity: 'high',
    guideSlug: 'storage',
    hint: 'Run CrystalDiskInfo from USB. Beware of Caution or Bad warnings.'
  },
  {
    id: 'chk-storage-hours',
    categoryId: 'storage',
    title: 'Power-on hours checked (< 15,000 hrs on consumer SSD)',
    severity: 'medium',
    guideSlug: 'storage',
    hint: 'Very high power-on hours indicate 24/7 commercial server usage.'
  },
  {
    id: 'chk-storage-writes',
    categoryId: 'storage',
    title: 'Total Host Writes (TBW) within safe endurance limits',
    severity: 'medium',
    guideSlug: 'storage',
    hint: 'Check CrystalDiskInfo for Total Host Writes in Gigabytes/Terabytes.'
  },
  {
    id: 'chk-storage-sectors',
    categoryId: 'storage',
    title: 'Zero reallocated bad sectors or read error warnings',
    severity: 'high',
    guideSlug: 'storage',
    hint: 'Any reallocated sector in a drive indicates flash degradation.'
  },
  {
    id: 'chk-storage-noise',
    categoryId: 'storage',
    title: 'No mechanical clicking or grinding sounds',
    severity: 'high',
    guideSlug: 'storage',
    hint: 'SSDs are completely silent. Clicking indicates dying mechanical HDD.'
  },
  {
    id: 'chk-storage-idle',
    categoryId: 'storage',
    title: 'Disk activity settles to 0–2% at idle in Task Manager',
    severity: 'medium',
    guideSlug: 'storage',
    hint: 'Constant 100% disk usage indicates faulty drive controller or bad sectors.'
  },

  // 4. Battery & Power
  {
    id: 'chk-bat-report',
    categoryId: 'battery',
    title: 'Windows battery report generated (powercfg /batteryreport)',
    severity: 'medium',
    guideSlug: 'battery',
    hint: 'Run powercfg /batteryreport in Command Prompt to inspect real metrics.'
  },
  {
    id: 'chk-bat-capacity',
    categoryId: 'battery',
    title: 'Design vs full charge capacity compared (> 65% health)',
    severity: 'medium',
    guideSlug: 'battery',
    hint: 'Full Charge Capacity / Design Capacity gives current health percentage.'
  },
  {
    id: 'chk-bat-swelling',
    categoryId: 'battery',
    title: 'No battery swelling (trackpad flush, bottom chassis flat)',
    severity: 'critical',
    guideSlug: 'battery',
    hint: 'A swollen battery is a fire hazard. Never purchase a swollen unit!'
  },
  {
    id: 'chk-bat-unplugged',
    categoryId: 'battery',
    title: 'Laptop runs reliably on battery power alone when unplugged',
    severity: 'high',
    guideSlug: 'battery',
    hint: 'Must not instantly shut down or reboot when AC adapter is removed.'
  },
  {
    id: 'chk-bat-drain',
    categoryId: 'battery',
    title: 'No sudden percentage drops during 15 minutes of use',
    severity: 'medium',
    guideSlug: 'battery',
    hint: 'Drops from 80% to 20% in seconds indicate a dead internal battery cell.'
  },
  {
    id: 'chk-bat-charging',
    categoryId: 'battery',
    title: 'Laptop charges steadily when plugged in',
    severity: 'high',
    guideSlug: 'battery',
    hint: 'Battery percentage should increase predictably and charging LED stay solid.'
  },
  {
    id: 'chk-bat-port-fit',
    categoryId: 'battery',
    title: 'Charging port connection is tight and doesn\'t drop when wiggled',
    severity: 'high',
    guideSlug: 'battery',
    hint: 'Loose barrel sockets or wobbly USB-C power ports cause sparking.'
  },
  {
    id: 'chk-bat-charger-oem',
    categoryId: 'battery',
    title: 'Power adapter is genuine OEM matching required wattage',
    severity: 'medium',
    guideSlug: 'battery',
    hint: 'Check wattage (e.g. 65W) on charger label vs bottom laptop label.'
  },

  // 5. Display Panel
  {
    id: 'chk-disp-resolution',
    categoryId: 'display',
    title: 'Native resolution verified in Settings (1920x1080 FHD+)',
    severity: 'medium',
    guideSlug: 'display',
    hint: 'Avoid 1366x768 low-res panels if budget allows 1080p.'
  },
  {
    id: 'chk-disp-dead-pixels',
    categoryId: 'display',
    title: 'No dead or permanently stuck subpixels found',
    severity: 'medium',
    guideSlug: 'display',
    hint: 'Cycle full-screen red, green, blue, white, black colors.'
  },
  {
    id: 'chk-disp-pressure',
    categoryId: 'display',
    title: 'No white pressure spots or keyboard abrasion marks on screen',
    severity: 'medium',
    guideSlug: 'display',
    hint: 'Inspect bright uniform white background for light clouds.'
  },
  {
    id: 'chk-disp-lines',
    categoryId: 'display',
    title: 'No horizontal or vertical colored lines on display',
    severity: 'high',
    guideSlug: 'display',
    hint: 'Colored lines signal damaged display ribbon cable or failing panel.'
  },
  {
    id: 'chk-disp-bleed',
    categoryId: 'display',
    title: 'Backlight bleed is acceptable on solid black screen',
    severity: 'low',
    guideSlug: 'display',
    hint: 'Test on black background in a dimly lit corner of the shop.'
  },
  {
    id: 'chk-disp-flicker',
    categoryId: 'display',
    title: 'No visible backlight flicker or PWM strobing at 50% brightness',
    severity: 'medium',
    guideSlug: 'display',
    hint: 'Point your smartphone camera at the screen to detect severe flicker.'
  },
  {
    id: 'chk-disp-hinges',
    categoryId: 'display',
    title: 'Hinges hold screen firmly at multiple angles without wobble',
    severity: 'high',
    guideSlug: 'display',
    hint: 'Screen should not fall backwards or forwards when laptop is moved.'
  },
  {
    id: 'chk-disp-bezel',
    categoryId: 'display',
    title: 'Display bezel clips together tightly without gaps or glue',
    severity: 'medium',
    guideSlug: 'display',
    hint: 'Check around hinge brackets for bulging plastic or repair glue.'
  },

  // 6. Keyboard & Touchpad
  {
    id: 'chk-kbd-all-keys',
    categoryId: 'keyboard-touchpad',
    title: 'Every key registered on visual tester (en.key-test.ru)',
    severity: 'medium',
    guideSlug: 'keyboard-touchpad',
    hint: 'Press every letter, number, and punctuation key systematically.'
  },
  {
    id: 'chk-kbd-fn-keys',
    categoryId: 'keyboard-touchpad',
    title: 'F1–F12 function keys and Esc/Delete tested',
    severity: 'medium',
    guideSlug: 'keyboard-touchpad',
    hint: 'Verify audio volume, brightness, and mute secondary functions.'
  },
  {
    id: 'chk-kbd-modifiers',
    categoryId: 'keyboard-touchpad',
    title: 'Both Left/Right Shift, Ctrl, Alt, and Win keys working',
    severity: 'medium',
    guideSlug: 'keyboard-touchpad',
    hint: 'Check modifier combinations like Ctrl+C, Ctrl+V, Alt+Tab.'
  },
  {
    id: 'chk-kbd-spacebar',
    categoryId: 'keyboard-touchpad',
    title: 'Spacebar triggers on left edge, center, and right edge',
    severity: 'low',
    guideSlug: 'keyboard-touchpad',
    hint: 'Damaged stabilizer bars cause spacebar to fail when tapped off-center.'
  },
  {
    id: 'chk-kbd-backlight',
    categoryId: 'keyboard-touchpad',
    title: 'Keyboard backlighting operational (if equipped)',
    severity: 'low',
    guideSlug: 'keyboard-touchpad',
    hint: 'Toggle backlight key combination (e.g. Fn + Space or Fn + F5).'
  },
  {
    id: 'chk-pad-clicks',
    categoryId: 'keyboard-touchpad',
    title: 'Touchpad physical clicks (left & right) feel crisp',
    severity: 'medium',
    guideSlug: 'keyboard-touchpad',
    hint: 'Stiff or non-clickable trackpads usually mean a bulging battery below.'
  },
  {
    id: 'chk-pad-gestures',
    categoryId: 'keyboard-touchpad',
    title: 'Two-finger scrolling and multi-touch gestures glide smoothly',
    severity: 'low',
    guideSlug: 'keyboard-touchpad',
    hint: 'Scroll down a web page using two fingers. Check tracking precision.'
  },
  {
    id: 'chk-pad-drift',
    categoryId: 'keyboard-touchpad',
    title: 'No cursor jitter, phantom taps, or jumping pointer',
    severity: 'medium',
    guideSlug: 'keyboard-touchpad',
    hint: 'Ensure cursor does not move on its own when hands rest on palmrest.'
  },

  // 7. Connectivity & Audio
  {
    id: 'chk-conn-wifi',
    categoryId: 'connectivity',
    title: 'Wi-Fi connects to network and detects 5 GHz bands',
    severity: 'high',
    guideSlug: 'connectivity',
    hint: 'Connect to phone hotspot. Confirm speed and signal range.'
  },
  {
    id: 'chk-conn-bluetooth',
    categoryId: 'connectivity',
    title: 'Bluetooth pairs successfully with phone or headphones',
    severity: 'medium',
    guideSlug: 'connectivity',
    hint: 'Open Bluetooth settings. Verify nearby devices appear and connect.'
  },
  {
    id: 'chk-conn-usb-all',
    categoryId: 'connectivity',
    title: 'Every individual USB-A & USB-C port tested with a flash drive',
    severity: 'high',
    guideSlug: 'connectivity',
    hint: 'Insert USB drive in each port. Wiggle gently to ensure no dropouts.'
  },
  {
    id: 'chk-conn-display-out',
    categoryId: 'connectivity',
    title: 'HDMI or Type-C video output tested (if monitor available)',
    severity: 'low',
    guideSlug: 'connectivity',
    hint: 'Plug into external screen to confirm display transmitter functions.'
  },
  {
    id: 'chk-conn-speakers',
    categoryId: 'connectivity',
    title: 'Speakers play stereo sweep clearly with zero buzzing at 80%',
    severity: 'medium',
    guideSlug: 'connectivity',
    hint: 'Listen for torn cone rattle or silent left/right channel.'
  },
  {
    id: 'chk-conn-jack',
    categoryId: 'connectivity',
    title: '3.5mm headphone jack produces clean stereo audio',
    severity: 'low',
    guideSlug: 'connectivity',
    hint: 'Plug in earphones. Spin plug gently to test for audio crackling.'
  },
  {
    id: 'chk-conn-webcam',
    categoryId: 'connectivity',
    title: 'Webcam image is clear and privacy shutter operates smoothly',
    severity: 'medium',
    guideSlug: 'connectivity',
    hint: 'Test on webcamtests.com. Verify lens is clean and video is smooth.'
  },
  {
    id: 'chk-conn-mic',
    categoryId: 'connectivity',
    title: 'Microphone records voice without loud electrical hum or static',
    severity: 'medium',
    guideSlug: 'connectivity',
    hint: 'Record a sample voice note or test on mictests.com.'
  },

  // 8. BIOS & Security (Most Important!)
  {
    id: 'chk-sec-bios-pwd',
    categoryId: 'bios-security',
    title: 'BIOS setup opens cleanly WITHOUT any password prompt',
    severity: 'critical',
    guideSlug: 'bios-security',
    hint: 'CRITICAL: Tap BIOS key on cold boot. If locked with admin password, WALK AWAY!'
  },
  {
    id: 'chk-sec-bios-nav',
    categoryId: 'bios-security',
    title: 'Can freely navigate BIOS menus, Security, and Boot settings',
    severity: 'critical',
    guideSlug: 'bios-security',
    hint: 'Verify user is not in a restricted "guest / viewer" BIOS mode.'
  },
  {
    id: 'chk-sec-computrace',
    categoryId: 'bios-security',
    title: 'Absolute / Computrace persistence is Disabled or Inactive',
    severity: 'critical',
    guideSlug: 'bios-security',
    hint: 'If Computrace is "Active", corporate MDM can lock the PC at any time.'
  },
  {
    id: 'chk-sec-secureboot',
    categoryId: 'bios-security',
    title: 'Secure Boot and UEFI mode are configurable',
    severity: 'high',
    guideSlug: 'bios-security',
    hint: 'Verify in msinfo32 that BIOS Mode is UEFI and Secure Boot is enabled.'
  },
  {
    id: 'chk-sec-autopilot',
    categoryId: 'bios-security',
    title: 'Confirmed no Microsoft Autopilot or Azure AD corporate join',
    severity: 'critical',
    guideSlug: 'bios-security',
    hint: 'Run dsregcmd /status. AzureAdJoined must be NO.'
  },
  {
    id: 'chk-sec-activation',
    categoryId: 'bios-security',
    title: 'Windows license is permanently activated (slmgr /xpr)',
    severity: 'high',
    guideSlug: 'bios-security',
    hint: 'Run slmgr /xpr. Must say permanently activated, not temporary volume KMS.'
  },
  {
    id: 'chk-sec-serial-match',
    categoryId: 'bios-security',
    title: 'Motherboard serial in BIOS matches bottom chassis sticker',
    severity: 'high',
    guideSlug: 'bios-security',
    hint: 'Check Get-CimInstance Win32_BIOS vs bottom sticker.'
  },
  {
    id: 'chk-sec-ownership',
    categoryId: 'bios-security',
    title: 'Seller provides verifiable ownership & written shop bill',
    severity: 'critical',
    guideSlug: 'bios-security',
    hint: 'Never purchase hardware with dubious origin or without printed invoice.'
  },

  // 9. Physical Condition
  {
    id: 'chk-phys-chassis',
    categoryId: 'physical-condition',
    title: 'Corners and casing free of impact drops, cracks, or warping',
    severity: 'medium',
    guideSlug: 'physical-condition',
    hint: 'Check corners for heavy dents indicating drops on concrete.'
  },
  {
    id: 'chk-phys-screws',
    categoryId: 'physical-condition',
    title: 'All bottom panel screws present, intact, and non-stripped',
    severity: 'medium',
    guideSlug: 'physical-condition',
    hint: 'Missing or stripped screws indicate careless previous teardown.'
  },
  {
    id: 'chk-phys-liquid',
    categoryId: 'physical-condition',
    title: 'No signs of liquid spill, sticky residue, or green copper rust',
    severity: 'critical',
    guideSlug: 'physical-condition',
    hint: 'Shine flashlight into keyboard gaps and ports to spot corrosion.'
  },
  {
    id: 'chk-phys-burnt-odor',
    categoryId: 'physical-condition',
    title: 'Exhaust fan air has no burnt electronics or flux odor',
    severity: 'critical',
    guideSlug: 'physical-condition',
    hint: 'A sweet pungent flux smell indicates recent hot-air board reflow repair.'
  },
  {
    id: 'chk-phys-feet',
    categoryId: 'physical-condition',
    title: 'Rubber base feet intact on bottom cover',
    severity: 'low',
    guideSlug: 'physical-condition',
    hint: 'Rubber strips keep laptop elevated so cooling vents can pull fresh air.'
  },
  {
    id: 'chk-phys-charger-cable',
    categoryId: 'physical-condition',
    title: 'Charger cable insulation intact with no exposed wires or fraying',
    severity: 'high',
    guideSlug: 'physical-condition',
    hint: 'Frayed power cables present short-circuit and fire risks.'
  },
  {
    id: 'chk-phys-restart-twice',
    categoryId: 'physical-condition',
    title: 'Restarted laptop at least twice (cold and warm) before payment',
    severity: 'high',
    guideSlug: 'physical-condition',
    hint: 'Golden rule: Always reboot after heavy inspection to reveal cold/warm faults.'
  }
];

import { Guide } from './types';

export const GUIDES: Guide[] = [
  {
    slug: 'processor',
    categoryId: 'processor',
    title: 'Processor (CPU) Inspection',
    subtitle: 'Verify exact model, physical cores, thermal throttling, and sustained load stability.',
    iconName: 'Cpu',
    whatToCheck: [
      'Exact processor brand, model name, and generation (e.g., Core i5-8250U vs older 7th Gen i5-7200U).',
      'Number of physical cores and logical threads (Task Manager or PowerShell).',
      'Baseline idle CPU utilization (should stay under 5–10% when no apps are running).',
      'CPU temperatures and thermal behavior under load (does the fan ramp up smoothly without rattling?).',
      'Thermal throttling under 10–15 minutes of continuous workload (e.g., 4K video playback or benchmark).',
      'Absence of spontaneous thermal shutdowns, kernel freezes, or unexpected restarts.'
    ],
    steps: [
      {
        title: 'Open Task Manager (Ctrl + Shift + Esc)',
        instruction: 'Click on the "Performance" tab and select "CPU". Read the full processor model in the top right (e.g. Intel Core i5-8350U @ 1.70GHz). Check Cores and Logical processors.'
      },
      {
        title: 'Observe Idle Behavior',
        instruction: 'Close all open browser tabs and apps. Watch CPU utilization for 60 seconds. It should settle below 5–10%. If pinned at 50–100% on idle, investigate Task Manager processes or potential malware/crypto-miners.'
      },
      {
        title: 'Run a 10-Minute Stress Test',
        instruction: 'Open YouTube in high resolution (1440p or 4K 60fps) or a portable benchmark. Keep it running while testing other components. Listen for smooth fan ramp-up and watch for sudden stutters or crashes.'
      },
      {
        title: 'Check for Restarts on Warm Boot',
        instruction: 'After running the stress test for 10 minutes, restart the laptop. Confirm it boots cleanly without blue screens or thermal warning beeps.'
      }
    ],
    commands: [
      {
        label: 'PowerShell CPU Query (Modern Windows 10/11)',
        code: 'Get-CimInstance Win32_Processor | Select Name,NumberOfCores,NumberOfLogicalProcessors,MaxClockSpeed',
        type: 'PowerShell',
        explanation: 'Retrieves CPU model name, physical cores, threads, and maximum clock speed. Does not depend on deprecated WMIC.'
      },
      {
        label: 'Legacy CMD Query (WMIC)',
        code: 'wmic cpu get name,numberofcores,numberoflogicalprocessors,maxclockspeed',
        type: 'CMD',
        explanation: 'Standard query for Windows 10 systems. Note that WMIC is deprecated in newer Windows 11 builds.'
      }
    ],
    redFlags: [
      'Seller claims "Core i7" but Task Manager reveals an ancient 2nd or 3rd Gen dual-core i7 (e.g. i7-3520M) with low modern performance.',
      'CPU clock frequency drops drastically (e.g. throttles down to 0.79 GHz) under load due to dried thermal paste or failed fan.',
      'Fan does not spin at all or emits loud grinding, buzzing, or bearing screech.',
      'Laptop reboots unexpectedly or throws BSOD (e.g., WHEA_UNCORRECTABLE_ERROR) during video playback.'
    ],
    proTips: [
      'Note: 2.0 GHz is only a historical baseline reference, not a strict minimum requirement. Modern mobile CPUs run at lower base clocks (1.6–1.9 GHz) while boosting past 3.6–4.2 GHz. Generation, core architecture, and sustained thermal cooling matter far more than advertised base clock.',
      'For Windows 11 official support, Intel requires 8th Generation (e.g. i5-8250U) or newer, and AMD requires Ryzen 2000 series (Zen+) or newer.'
    ]
  },
  {
    slug: 'ram',
    categoryId: 'ram',
    title: 'RAM (Memory) Inspection',
    subtitle: 'Check total memory capacity, frequency, channel configuration, and upgrade potential.',
    iconName: 'Layers',
    whatToCheck: [
      'Total recognized memory capacity (minimum 8 GB for basic tasks, 16 GB recommended).',
      'DDR generation (DDR3 vs DDR4 vs DDR5) and operating frequency (e.g., 2400 MHz, 2666 MHz, 3200 MHz).',
      'Slots used vs slots available (e.g., "Slots used: 1 of 2" means an empty slot exists for dual-channel upgrade).',
      'Soldered onboard memory vs upgradeable SO-DIMM slots.',
      'Absence of memory address faults or blue-screen memory dump errors.'
    ],
    steps: [
      {
        title: 'Inspect Memory in Task Manager',
        instruction: 'Press Ctrl + Shift + Esc -> "Performance" tab -> "Memory". Check: Speed (MHz), Slots used (e.g. "1 of 2"), Form factor (SODIMM), and Committed memory.'
      },
      {
        title: 'Check Physical Upgradeability',
        instruction: 'If the laptop has only 4 GB or 8 GB, verify whether RAM can be upgraded. If memory is soldered (LPDDR4x/onboard) with 0 open slots, you will be permanently stuck with that capacity.'
      },
      {
        title: 'Launch Windows Memory Diagnostic (Optional Check)',
        instruction: 'Press Win + R, type "mdsched.exe", and press Enter. If you suspect memory corruption, schedule the scan on restart.'
      }
    ],
    commands: [
      {
        label: 'Launch Windows Memory Diagnostic',
        code: 'mdsched.exe',
        type: 'Run Shortcut',
        explanation: 'Launches the native hardware memory testing utility. Requires restarting the PC and takes 10–25 minutes.'
      },
      {
        label: 'PowerShell Detailed Memory Module Query',
        code: 'Get-CimInstance Win32_PhysicalMemory | Select BankLabel,Capacity,Speed,Manufacturer,PartNumber',
        type: 'PowerShell',
        explanation: 'Lists each individual RAM stick, capacity in bytes, speed in MHz, and part numbers to verify matched pairs.'
      }
    ],
    redFlags: [
      'Total installed RAM is 4 GB or less on a modern Windows 10/11 system.',
      'RAM is completely soldered to the motherboard (0 empty slots) and restricted to 8 GB or less.',
      'Mismatched speeds causing system clock down to lowest common denominator or unstable timings.',
      'Windows shows significantly less usable RAM than installed (e.g., "8 GB installed, 3.9 GB usable" with 32-bit OS or failing channel).'
    ],
    proTips: [
      'Dual-channel memory (two 8 GB sticks) significantly improves integrated GPU graphics performance (Intel UHD/Iris Xe or AMD Radeon) by 25–40% compared to a single stick in single-channel.',
      'Portable utilities like CPU-Z can be run from a USB drive without installation to view SPD profiles and manufacturer timings.'
    ]
  },
  {
    slug: 'storage',
    categoryId: 'storage',
    title: 'Storage (SSD & HDD) Health',
    subtitle: 'Verify drive type, SMART health percentage, power-on hours, write endurance, and speeds.',
    iconName: 'HardDrive',
    whatToCheck: [
      'Drive type: Is the primary drive an SSD (Solid State Drive) or an outdated mechanical HDD (Hard Disk Drive)?',
      'Actual usable storage capacity (e.g., 256 GB, 512 GB) and partition health.',
      'SMART health percentage and status (Good, Caution, or Bad).',
      'Total Power-on Hours and Total Host Writes (TBW).',
      'Reallocated sectors, read error rates, and drive temperature.',
      'Mechanical clicking, grinding, or head-parking noises if an HDD is present.'
    ],
    steps: [
      {
        title: 'Verify Drive Type in Task Manager',
        instruction: 'Open Task Manager (Ctrl + Shift + Esc) -> Performance -> Disk 0. Check the "Type" label at the bottom: it MUST state "SSD". If it says "HDD", the laptop will feel sluggish even with a good CPU.'
      },
      {
        title: 'Run CrystalDiskInfo from USB Drive',
        instruction: 'Launch CrystalDiskInfo portable. Read the health box in the top left: it should show "Good 90–100%". Check "Power On Hours" and "Total Host Writes".'
      },
      {
        title: 'Check Drive Status via Command Prompt',
        instruction: 'Run the WMIC disk query or chkdsk scan to confirm the storage controller is operating normally.'
      }
    ],
    commands: [
      {
        label: 'Query Disk Model & Firmware Status (CMD)',
        code: 'wmic diskdrive get model,size,status',
        type: 'CMD',
        explanation: 'Quick check of attached drives and overall firmware status. Important: "Status: OK" only means the drive has not exceeded critical failure thresholds yet.'
      },
      {
        label: 'Scan File System Integrity (CMD Admin)',
        code: 'chkdsk C: /scan',
        type: 'CMD',
        explanation: 'Performs an online NTFS file system scan without dismounting or rebooting.'
      }
    ],
    tool: {
      name: 'CrystalDiskInfo (Portable)',
      url: 'https://crystalmark.info/en/software/crystaldiskinfo/',
      description: 'The golden standard tool for reading SSD NVMe SMART telemetry, wear level percentage, and power-on hours.'
    },
    redFlags: [
      'Laptop only has an old 5400 RPM mechanical HDD as the primary boot drive.',
      'CrystalDiskInfo shows "Caution" (yellow) or "Bad" (red) with reallocated bad sectors or flash blocks.',
      'SSD health percentage is below 70%, or power-on hours exceed 20,000 hours (indicates enterprise server or crypto-plotting abuse).',
      'Disk usage in Task Manager is constantly pinned at 100% even when no applications are open.'
    ],
    proTips: [
      'A basic command line status ("OK") CANNOT prove a drive is healthy. Disk controllers only report "BAD" when the drive is on the brink of catastrophic failure. Always inspect actual SMART health % using CrystalDiskInfo.',
      'If the laptop has an NVMe M.2 slot, upgrading from a 256 GB SSD to a 1 TB SSD is usually easy and cost-effective if all other components pass.'
    ]
  },
  {
    slug: 'battery',
    categoryId: 'battery',
    title: 'Battery & Power Inspection',
    subtitle: 'Generate Windows battery report, compare design vs full capacity, test charger and check for swelling.',
    iconName: 'BatteryCharging',
    whatToCheck: [
      'Comparison between "Design Capacity" and "Full Charge Capacity" in mWh.',
      'Current battery health percentage = (Full Charge Capacity / Design Capacity) * 100.',
      'Battery cycle count and recent charge/drain history.',
      'Laptop stability when running solely on battery power without the AC adapter.',
      'Battery charging rate and absence of sudden percentage drops (e.g. plunging from 70% to 15%).',
      'Physical inspection for battery swelling (bulging trackpad, warped bottom casing, uneven chassis feet).'
    ],
    steps: [
      {
        title: 'Generate the Windows Battery Report',
        instruction: 'Open Command Prompt or PowerShell, type "powercfg /batteryreport" and press Enter. It will output an HTML file to your user directory (e.g. C:\\Users\\[Name]\\battery-report.html).'
      },
      {
        title: 'Open and Analyze the HTML Report',
        instruction: 'Press Win + R, type the generated file path or open it directly in Edge. Scroll to "Installed batteries". Compare DESIGN CAPACITY vs FULL CHARGE CAPACITY. Example: 42,000 mWh design vs 35,000 mWh full = 83% health.'
      },
      {
        title: 'Test Running on Battery Alone',
        instruction: 'Unplug the power brick. Ensure the screen stays on, brightness adjusts smoothly, and the laptop does not power off abruptly.'
      },
      {
        title: 'Inspect Charging Port and Swelling',
        instruction: 'Plug the charger back in. Wiggle the plug gently at the charging socket. Ensure charging indicator light stays solid and doesn\'t blink. Look closely at the trackpad and keyboard: swelling pushes the trackpad upward!'
      }
    ],
    commands: [
      {
        label: 'Generate Battery Report (CMD or PowerShell)',
        code: 'powercfg /batteryreport',
        type: 'CMD',
        explanation: 'Generates an exhaustive battery health report including cycle count, design capacity, full charge capacity, and drain history.'
      },
      {
        label: 'Open Generated Battery Report',
        code: 'start battery-report.html',
        type: 'CMD',
        explanation: 'Opens the newly generated battery report directly in your default web browser.'
      }
    ],
    redFlags: [
      'Battery Swelling: The trackpad is raised, clicks are stiff, or bottom panel bulges. Swelling is a FIRE AND SAFETY HAZARD. Do not buy, do not charge!',
      'Laptop powers off immediately when the power cable is disconnected (completely dead battery cells).',
      'Full Charge Capacity is less than 50% of Design Capacity.',
      'Battery charge level drops erratically (e.g. drops 30% in 2 minutes) indicating unbalanced cell voltages.',
      'Charging socket is loose, sparking, or only charges when held at a specific strained angle.'
    ],
    proTips: [
      'Battery replacement for common enterprise business laptops (ThinkPad T480/T490, Dell Latitude 5490/7490, HP EliteBook 840 G5) is widely available and affordable, but factor a ₹2,500–₹4,000 replacement cost into your purchase price if health is low.',
      'Always test the laptop under high screen brightness on battery for at least 15 minutes to verify real discharge stability.'
    ]
  },
  {
    slug: 'display',
    categoryId: 'display',
    title: 'Display Panel & Hinges',
    subtitle: 'Check resolution, dead pixels, backlight bleed, color uniformity, and hinge mechanism.',
    iconName: 'Monitor',
    whatToCheck: [
      'Display resolution (verify Full HD 1920x1080 vs inferior 1366x768 resolution).',
      'Panel technology: IPS wide viewing angle vs washed-out TN panel.',
      'Dead pixels (black dots on white background) and stuck subpixels (bright red/green/blue dots on dark background).',
      'White pressure spots, water stains, or light diffusions caused by keyboard pressure or impact.',
      'Backlight bleeding along the bezels in a dim area or on a solid dark screen.',
      'Screen flickering at different brightness levels (PWM flicker).',
      'Hinge firmness: does the lid stay firmly at 45°, 90°, and 135° without wobbling or falling?'
    ],
    steps: [
      {
        title: 'Check Resolution in Windows Display Settings',
        instruction: 'Right click desktop -> "Display settings" -> "Display resolution". Confirm recommended resolution is 1920 x 1080 or higher.'
      },
      {
        title: 'Run Full-Screen Dead Pixel Test',
        instruction: 'Open the Dead Pixel test link. Press F11 for full screen. Cycle through Red, Green, Blue, White, and Black screens. Scan carefully across all 4 quadrants.'
      },
      {
        title: 'Test Brightness Range (0% to 100%)',
        instruction: 'Use brightness keys or Windows action center slider. Verify backlight steps up and down smoothly without buzzing or high-frequency flicker.'
      },
      {
        title: 'Test Hinge Resistance',
        instruction: 'Open and close the display lid smoothly several times. Listen for clicking or crunching plastic. Tilt the laptop gently: the screen should not flop backwards or forwards.'
      }
    ],
    commands: [
      {
        label: 'Open DirectX Diagnostics (GPU & Display)',
        code: 'dxdiag',
        type: 'Run Shortcut',
        explanation: 'Inspects connected display panel refresh rate (60Hz/120Hz/144Hz), GPU driver version, and color depth.'
      }
    ],
    tool: {
      name: 'Dead Pixel & Backlight Test',
      url: 'https://displaytech.org/en/tests/dead.pixel.htm',
      description: 'Interactive browser tool that switches full-screen primary colors to reveal dead pixels, pressure marks, and panel bleed.'
    },
    redFlags: [
      'Persistent vertical or horizontal colored lines across the screen (signals failing display ribbon cable or damaged panel COF chip).',
      'Large white pressure spots (bright clouds) visible on light backgrounds.',
      'Excessive screen flicker that strains the eyes even at 80%+ brightness.',
      'Hinges are loose, binding, cracking the plastic bezel, or separation is visible near the hinge mounts.'
    ],
    proTips: [
      'Avoid 1366 x 768 resolution laptops in 2024 and beyond unless budget is severely constrained. A 1080p IPS screen provides significantly sharper text, less eye strain, and much better resale value.',
      'Shine a phone flashlight across the screen while off to detect hairline cracks or scratches in the anti-glare coating.'
    ]
  },
  {
    slug: 'keyboard-touchpad',
    categoryId: 'keyboard-touchpad',
    title: 'Keyboard & Touchpad Inspection',
    subtitle: 'Verify every physical key stroke, modifier combinations, backlighting, clicks, and multi-touch gestures.',
    iconName: 'Keyboard',
    whatToCheck: [
      'Every key registers cleanly without requiring excessive finger pressure.',
      'Function keys (F1–F12), Esc, Delete, Home/End, and Page Up/Down.',
      'Modifier keys: Left & Right Shift, Left & Right Ctrl, Alt, Windows key.',
      'Spacebar actuation across the left edge, center, and right edge.',
      'Keyboard backlighting levels (off, low, high) if equipped.',
      'Touchpad physical click feel (left click, right click, center tap).',
      'Two-finger smooth scrolling and multi-finger Windows precision gestures.'
    ],
    steps: [
      {
        title: 'Open Online Keyboard Tester',
        instruction: 'Navigate to en.key-test.ru or press the tool button below. Every key you press will highlight green on the visual keyboard diagram.'
      },
      {
        title: 'Press Every Key Sequentially',
        instruction: 'Start from Esc, go across the number row, QWERTY row, ASDF row, ZXCV row, Spacebar, Arrows, and Numpad (if present). Test Caps Lock and Num Lock LED lights.'
      },
      {
        title: 'Test Trackpad Tracking & Gestures',
        instruction: 'Move your finger slowly across all corners. Check for smooth cursor glide. Try two-finger scrolling up and down a webpage. Try three-finger swipe up to show task view.'
      },
      {
        title: 'Check Physical Trackpad Flushness',
        instruction: 'Look at the trackpad from the side. It should sit flush with the palm rest. If the trackpad is raised or cannot be clicked physically, the battery underneath is swelling.'
      }
    ],
    commands: [],
    tool: {
      name: 'Keyboard & Trackpad Tester',
      url: 'https://en.key-test.ru/',
      description: 'Web utility that visualizes each keystroke, detecting dead keys, double clicks (key chattering), and sticky switches.'
    },
    redFlags: [
      'One or more non-functional keys (e.g. Enter, Spacebar, or Backspace dead). On modern slim laptops, replacing a keyboard usually requires replacing the entire glued palm-rest assembly!',
      'Sticky or gummy keys caused by spilled coffee, soda, or liquid residue.',
      'Trackpad cursor jumps erratically, freezes, or drifts on its own.',
      'Trackpad is physically raised or cannot be clicked (primary indicator of swollen battery pack).'
    ],
    proTips: [
      'On many ultrabooks (Dell XPS, HP Envy, Lenovo Yoga), the keyboard is heat-staked with plastic rivets to the top case. A broken key often costs ₹3,500–₹6,000 to replace because the entire top assembly must be swapped.',
      'Test key backlight in a shaded area or by cupping your hand over the keys.'
    ]
  },
  {
    slug: 'connectivity',
    categoryId: 'connectivity',
    title: 'Connectivity, Ports & Audio',
    subtitle: 'Test Wi-Fi dual band, Bluetooth pairing, USB ports, HDMI output, speakers, microphone, and webcam.',
    iconName: 'Wifi',
    whatToCheck: [
      'Wi-Fi detection of both 2.4 GHz and 5 GHz networks with good signal strength.',
      'Bluetooth discovery and pairing with your smartphone or wireless earbuds.',
      'All physical USB-A and USB-C ports (data transmission and snug connection).',
      'HDMI or USB-C display output if the shop has an external monitor or TV.',
      '3.5mm audio jack for headphone output and mic input.',
      'Built-in stereo speakers: left and right channel balance, volume level, and no rattling at 90% volume.',
      'Webcam video clarity and physical privacy shutter operation.',
      'Built-in microphone voice clarity and absence of static buzzing.'
    ],
    steps: [
      {
        title: 'Test Wi-Fi & Hotspot',
        instruction: 'Turn on your phone\'s Wi-Fi hotspot. Connect the laptop to it. Open a webpage, run a quick speed test, then disconnect and reconnect to verify reliable link.'
      },
      {
        title: 'Test Every USB Port with a Flash Drive',
        instruction: 'Insert your USB flash drive into Port 1. Confirm File Explorer opens it instantly. Wiggle the drive gently left/right/up/down. The drive must NOT disconnect. Repeat for every USB port on the laptop!'
      },
      {
        title: 'Test Speakers and Audio Sweep',
        instruction: 'Open the Speaker Test link. Turn laptop volume to 80–90%. Listen to the stereo sweep. Check for buzzing, tinny distortion, or blown cone vibration.'
      },
      {
        title: 'Test Webcam and Microphone',
        instruction: 'Open webcamtests.com and mictests.com. Verify camera sensor is clean, image is focused, and microphone records clear voice without electric hum.'
      }
    ],
    commands: [
      {
        label: 'List Network Adapters and Wi-Fi Details',
        code: 'netsh wlan show interfaces',
        type: 'CMD',
        explanation: 'Displays current Wi-Fi connection channel, radio type (802.11ac/ax Wi-Fi 5/6), receive rate, and signal quality.'
      }
    ],
    tool: {
      name: 'Webcam Test Tool',
      url: 'https://webcamtests.com/',
      description: 'Checks real sensor resolution, frame rate, optical sharpness, and camera privacy shutter.'
    },
    redFlags: [
      'One or more dead USB ports (often blown by shorted 5V power rails on the motherboard).',
      'Charging or USB-C port is loose and only maintains connection when propped at an awkward angle.',
      'Wi-Fi card constantly disconnects, cannot see 5 GHz networks, or requires an ugly external USB Wi-Fi dongle.',
      'Speakers buzz, crackle, or one channel is completely silent.',
      'Webcam shows black screen, severe purple tint, or foggy lens from internal moisture.'
    ],
    proTips: [
      'Bring a cheap USB flash drive and a pair of wired 3.5mm earphones with you to the laptop shop so you can test all audio and data ports independently.',
      'A broken USB-C charging port on laptops that charge exclusively via USB-C is a fatal failure point requiring complex SMD microsoldering.'
    ]
  },
  {
    slug: 'bios-security',
    categoryId: 'bios-security',
    title: 'BIOS & Security (Most Important!)',
    subtitle: 'Verify BIOS administrator password, Computrace / Absolute locks, Secure Boot, Autopilot, and genuine Windows activation.',
    iconName: 'ShieldAlert',
    whatToCheck: [
      'BIOS / UEFI setup opens cleanly WITHOUT prompting for an Administrator or Supervisor password.',
      'You can freely navigate all BIOS menus (Main, Advanced, Security, Boot options).',
      'Boot order can be modified and USB boot is allowed.',
      'Secure Boot is configurable and UEFI mode is active.',
      'Absolute / Computrace persistence module status (must be Disabled or Inactive, NOT Active/Enabled).',
      'No corporate enrollment, Azure AD join, Microsoft Intune, or Autopilot lock.',
      'Windows digital license is genuine and permanent (not a temporary 180-day volume KMS hack).'
    ],
    steps: [
      {
        title: 'Check BIOS Key for Laptop Brand',
        instruction: 'Common Keys: Dell (F2 or F12), HP (Esc then F10), Lenovo ThinkPad (F1 or Enter), Lenovo IdeaPad (F2 or Novo button), Acer (F2 or Del), ASUS (F2 or Del), MSI (Delete).'
      },
      {
        title: 'Completely Shut Down and Enter BIOS',
        instruction: 'Do a full shutdown (hold Shift while clicking Shut Down in Windows). Turn on laptop and immediately tap the BIOS key repeatedly. If a password prompt appears asking for "Supervisor Password" or "Admin Password", STOP. Ask the seller to unlock it. If they cannot, WALK AWAY!'
      },
      {
        title: 'Inspect Security and Computrace Tabs',
        instruction: 'Inside BIOS, find the Security tab. Look for "Absolute Persistence" or "Computrace". If it says "Activated" or "Enabled", the laptop may be company property that can be bricked remotely.'
      },
      {
        title: 'Run Workplace / MDM Enrolment Check',
        instruction: 'In Windows, open Command Prompt and run "dsregcmd /status". Check "AzureAdJoined : NO" and "EnterpriseJoined : NO".'
      },
      {
        title: 'Verify Permanent Windows Activation',
        instruction: 'Press Win + R, type "slmgr /xpr", and press Enter. A popup must state: "The machine is permanently activated". If it says volume activation expires on [date], it is a pirated KMS emulator.'
      }
    ],
    commands: [
      {
        label: 'Check Azure AD / Workplace Enrolment (CMD)',
        code: 'dsregcmd /status',
        type: 'CMD',
        explanation: 'Displays corporate directory join status. "AzureAdJoined : YES" indicates enterprise management / cloud ownership.'
      },
      {
        label: 'Check Windows Permanent Activation (Run / CMD)',
        code: 'slmgr /xpr',
        type: 'Run Shortcut',
        explanation: 'Displays license expiration dialog. Legitimate OEM licenses report "The machine is permanently activated".'
      },
      {
        label: 'Launch System Information (Run)',
        code: 'msinfo32',
        type: 'Run Shortcut',
        explanation: 'Verifies BIOS Mode (UEFI), Secure Boot State (On), and motherboard hardware configuration.'
      },
      {
        label: 'Query BIOS Serial Number (PowerShell)',
        code: 'Get-CimInstance Win32_BIOS | Select SerialNumber,SMBIOSBIOSVersion,Manufacturer',
        type: 'PowerShell',
        explanation: 'Displays firmware-burned serial number to compare against physical chassis sticker.'
      }
    ],
    redFlags: [
      'BIOS Password Prompt: A lock icon or password box blocks access to BIOS settings. Reinstalling Windows DOES NOT REMOVE a BIOS password!',
      'Computrace / Absolute Persistence module is "Active" or "Enabled" in BIOS.',
      'Windows Setup shows a company logo during installation or asks for a corporate work email (Microsoft Autopilot enrolled device).',
      'Seller refuses to let you enter the BIOS or claims "customers are not allowed into technical settings". WALK AWAY IMMEDIATELY!',
      'Motherboard serial number returns empty, "Default string", or doesn\'t match the chassis serial sticker.'
    ],
    proTips: [
      'CRITICAL: Never attempt or advise bypassing organizational security. Corporate enrollment and BIOS supervisor locks are legal and cryptographic barriers designed to protect corporate assets. If a device has an unresolved lock, request official company release documentation or walk away immediately.',
      'A fresh Windows install from a USB flash drive only wipes the storage drive; it does not touch the BIOS chip or Microsoft Autopilot cloud hardware hash database.'
    ]
  },
  {
    slug: 'physical-condition',
    categoryId: 'physical-condition',
    title: 'Physical Condition & Inspection',
    subtitle: 'Inspect chassis integrity, hinge stress, missing screws, liquid residue, and charger legitimacy.',
    iconName: 'Wrench',
    whatToCheck: [
      'Chassis corners for impact dents, cracks, or signs of hard drops onto concrete.',
      'Hinge covers and screen frame seams for separation or glue repair.',
      'Bottom panel screws: all present, none stripped, none non-matching or missing.',
      'Liquid damage signs: white, green, or sticky residue in keyboard or vents.',
      'Signs of motherboard heat repair (flux residue, burnt electronic smell at exhaust).',
      'Rubber feet on the bottom panel (missing feet cause air intake choking).',
      'AC power adapter: original OEM brand, correct wattage, authentic weight, undamaged cable.'
    ],
    steps: [
      {
        title: 'Inspect Corners and Frame Seams',
        instruction: 'Run your fingers along all edges and seams of the laptop. Check if the top palm rest and bottom cover clip together tightly or have gaps.'
      },
      {
        title: 'Turn Over and Inspect Bottom Screws',
        instruction: 'Count the screws on the bottom plate. Are any screws missing? Are screw heads stripped or chewed up? Stripped screws indicate amateur opening.'
      },
      {
        title: 'Smell Exhaust Vents and Check for Moisture',
        instruction: 'Sniff the exhaust vent while the fan is running warm. A sweet burnt plastic or burnt resin odor suggests recent motherboard soldering or heating.'
      },
      {
        title: 'Verify Power Adapter Wattage and Brand',
        instruction: 'Check the sticker on the power brick. Example: Dell 65W (19.5V, 3.34A) or Lenovo 65W USB-C. Compare with the laptop bottom sticker input rating. Reject ultra-cheap unbranded replacement chargers!'
      }
    ],
    commands: [],
    redFlags: [
      'Hinges creak loudly or separate the plastic casing when the lid is opened.',
      'Multiple bottom screws are missing or replaced with mismatched silver/black woodscrews.',
      'Sweet burnt smell coming from the cooling vents under load.',
      'Evidence of liquid contact: sticky key actions, rusty port screws, or white mineral deposits inside vent grilles.',
      'Cheap lightweight counterfeit charger that gets scalding hot within 10 minutes (danger of frying the motherboard).'
    ],
    proTips: [
      'Cheap counterfeit third-party chargers produce massive electrical ripple noise that can cause trackpad phantom clicks and damage internal charging MOSFETs. Always demand the original OEM power supply or budget ₹1,500–₹2,500 for a genuine OEM replacement.',
      'Check if the rubber feet on the bottom cover are intact. Without them, the laptop sits flat against the table and chokes the cooling fan intake.'
    ]
  },
  {
    slug: 'buying-guide',
    title: 'Buying Guide & Target Specs',
    subtitle: 'Realistic budget targets (e.g. ₹19,900 benchmark), deal-breakers, negotiation leverage, and shop safety rules.',
    iconName: 'BookOpen',
    whatToCheck: [
      'Meeting minimum modern specifications for Windows 10/11 performance.',
      'Negotiating based on identified defects (battery degradation, minor scuffs).',
      'Insisting on testing the laptop thoroughly before handing over payment.',
      'Restarting the laptop at least twice before final handover.',
      'Obtaining a written shop bill with device serial number and warranty terms.'
    ],
    steps: [
      {
        title: 'Review Example Target Specifications (₹19,900 Benchmark)',
        instruction: 'Presented as a realistic reference target, not a universal rule: Intel Core i5 8th Gen (or AMD Ryzen 2000/3000 series+), 8 GB DDR4 RAM (upgradeable to 16 GB), 256 GB SSD with >85% health, 1080p Full HD display, working Wi-Fi & Bluetooth, unlocked BIOS, genuine Windows license.'
      },
      {
        title: 'Restart the Machine At Least Twice',
        instruction: 'Never buy a laptop after just looking at the desktop once! Restart it once on battery power and once on AC power. Warm restarts expose failing motherboard capacitors, memory instability, and thermal reboot loops.'
      },
      {
        title: 'Use Defects as Negotiation Leverage',
        instruction: 'If the battery health is 60%, calculate that a replacement battery costs ₹2,500–₹3,500. Politely ask the seller to either install a fresh battery or deduct that exact amount from the price.'
      },
      {
        title: 'Demand a Written Bill with Serial Number',
        instruction: 'Never accept verbal warranties ("Brother, 1 month guarantee, don\'t worry"). Get a physical or digital tax invoice/bill clearly printing the laptop brand, exact model, serial number, and exact return/replacement period.'
      }
    ],
    commands: [],
    redFlags: [
      'Seller rushes you or says "Other customers are waiting, you can test it at home". NEVER pay before completing your inspection!',
      'Seller refuses to let you restart the laptop or enter the BIOS.',
      'No receipt, invoice, or printed shop bill provided.',
      'Price is suspiciously low (50% below market) on a high-end recent model (usually stolen, liquid damaged, or MDM locked).'
    ],
    proTips: [
      'Top second-hand business workhorses with great durability, readily available parts, and easy repairability: Lenovo ThinkPad T480 / T490 / L390, Dell Latitude 5490 / 7490 / 5400, HP EliteBook 840 G5 / G6.',
      'Avoid 7th Generation or older Intel dual-core laptops (e.g. i5-7200U, i5-6200U) unless priced under ₹12,000–₹14,000, as they are not officially compatible with Windows 11 and offer half the multi-core performance of 8th Gen quad-cores.'
    ]
  }
];

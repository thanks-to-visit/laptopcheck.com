import { FAQItem } from './types';

export const FAQS: FAQItem[] = [
  {
    id: 'faq-red-flags',
    category: 'Inspection Advice',
    question: 'What are the biggest red flags when buying a second-hand laptop?',
    shortAnswer: 'The top 5 deal-breaking red flags are BIOS administrator password locks, corporate MDM/Autopilot enrollment, physical battery swelling, failing SSD health, and signs of motherboard heat/liquid repairs.',
    detailedAnswer: 'If a laptop has an unknown BIOS supervisor password or active Computrace module, it cannot be safely updated and may be stolen corporate property. Battery swelling is a fire hazard that requires immediate refusal. Failing SSD SMART sectors mean impending data loss, and sweet chemical flux smells near the fan exhaust indicate temporary motherboard soldering repairs that will fail soon.',
    linkHref: '/directory',
    linkText: 'View Component Directory'
  },
  {
    id: 'faq-battery-health',
    category: 'Battery & Power',
    question: 'How do I check laptop battery health using Command Prompt?',
    shortAnswer: 'Open Command Prompt or PowerShell, run "powercfg /batteryreport", and open the generated battery-report.html file to compare Design Capacity against Full Charge Capacity.',
    detailedAnswer: 'Divide Full Charge Capacity by Design Capacity and multiply by 100 to get the real battery health percentage. For example, 36,000 mWh full charge on a 45,000 mWh design capacity equals 80% battery health. If health is below 60% or drops suddenly from 80% to 20% in minutes, negotiate a price discount for a replacement pack.',
    command: 'powercfg /batteryreport',
    linkHref: '/guides/battery',
    linkText: 'Battery Inspection Guide'
  },
  {
    id: 'faq-corporate-mdm-autopilot',
    category: 'BIOS & Security',
    question: 'How do I check if a used laptop has a corporate MDM or Microsoft Autopilot lock?',
    shortAnswer: 'Open Command Prompt and run "dsregcmd /status". Check that "AzureAdJoined" and "EnterpriseJoined" both show "NO".',
    detailedAnswer: 'If AzureAdJoined or EnterpriseJoined shows YES, or if Windows setup prompts for a company email or displays a corporate logo, the device is tied to an enterprise cloud management tenant (Intune/Autopilot). A clean Windows reinstall DOES NOT remove cloud hardware hashes. Never buy an enrolled device without official company release paperwork.',
    command: 'dsregcmd /status',
    linkHref: '/guides/bios-security',
    linkText: 'BIOS & Security Guide'
  },
  {
    id: 'faq-bios-password-keys',
    category: 'BIOS & Security',
    question: 'How do I check for a BIOS password on Dell, HP, ThinkPad, and Acer laptops?',
    shortAnswer: 'Perform a complete shutdown, power on the machine, and immediately tap the BIOS key repeatedly (Dell: F2, HP: Esc then F10, ThinkPad: F1, Lenovo IdeaPad/Acer/ASUS: F2).',
    detailedAnswer: 'The BIOS setup must open freely without asking for an Administrator or Supervisor password. Once inside, verify you can change the boot order, configure Secure Boot, and check that Computrace/Absolute Persistence is "Disabled" or "Inactive". If the seller cannot supply the password, walk away immediately.',
    linkHref: '/guides/bios-security',
    linkText: 'Check BIOS Hotkey Table'
  },
  {
    id: 'faq-windows-activation',
    category: 'Software & License',
    question: 'How do I check if Windows 10 or 11 is permanently activated or running a cracked license?',
    shortAnswer: 'Press Win + R, type "slmgr /xpr", and press Enter. A legitimate consumer license will state: "The machine is permanently activated".',
    detailedAnswer: 'If the dialog displays a volume activation expiration date (typically 180 days), the laptop is running on a temporary KMS pirated emulator rather than a genuine digital OEM license. Genuine laptops have their Windows product keys permanently embedded in the motherboard firmware (ACPI MSDM table).',
    command: 'slmgr /xpr',
    linkHref: '/tools',
    linkText: 'Copy Verification Commands'
  },
  {
    id: 'faq-ssd-vs-hdd-health',
    category: 'Storage',
    question: 'How can I verify if a laptop has an SSD or slow HDD, and check its health?',
    shortAnswer: 'Press Ctrl + Shift + Esc to open Task Manager, click "Performance", then "Disk 0". Check that the "Type" label says "SSD", then run CrystalDiskInfo from a USB drive to verify SMART health percentage.',
    detailedAnswer: 'Avoid laptops with only 5400 RPM mechanical HDDs as primary boot drives because Windows 10/11 will run sluggishly. CrystalDiskInfo reads drive wear, Power-On Hours, and Reallocated Bad Sectors. A healthy refurbished SSD should show "Good" (ideally 80%+) and under 15,000 power-on hours.',
    command: 'wmic diskdrive get model,size,status',
    linkHref: '/guides/storage',
    linkText: 'Storage Diagnostic Guide'
  },
  {
    id: 'faq-target-specs-20000',
    category: 'Buying Guide',
    question: 'What specifications should I target for a refurbished laptop under ₹20,000 (~$240)?',
    shortAnswer: 'Target an Intel Core i5 8th Gen (or AMD Ryzen 2000/3000 series+), 8 GB DDR4 RAM (upgradeable to 16 GB), 256 GB SSD with >85% health, and a 1080p Full HD IPS display.',
    detailedAnswer: 'Avoid older 7th Gen or older dual-core processors (like i5-7200U) because they lack official Windows 11 support and have half the multi-core power. Excellent business models in this price bracket include Lenovo ThinkPad T480/T490, Dell Latitude 5490/7490, and HP EliteBook 840 G5.',
    linkHref: '/guides/buying-guide',
    linkText: 'Buying Guide Benchmark'
  },
  {
    id: 'faq-dead-pixels-screen',
    category: 'Display',
    question: 'How do I test for dead pixels, screen pressure spots, and backlight bleed in a shop?',
    shortAnswer: 'Use an online Dead Pixel Test in full screen (F11) to cycle through solid Red, Green, Blue, White, and Black backgrounds.',
    detailedAnswer: 'Stuck subpixels stand out as bright colored dots on dark screens, while dead pixels appear as black specks on white backgrounds. White cloudy patches indicate pressure marks from keyboard contact in a tight backpack, and excessive bezel glow on a solid black screen indicates backlight bleeding.',
    linkHref: '/tools',
    linkText: 'Open Dead Pixel Test Tool'
  },
  {
    id: 'faq-keyboard-touchpad',
    category: 'Input Devices',
    question: 'How do I test every keyboard key and the touchpad before paying?',
    shortAnswer: 'Open en.key-test.ru in the browser and tap every physical key (F1–F12, modifiers, Spacebar edges, Enter) to verify each key turns green.',
    detailedAnswer: 'Replacing a keyboard on modern ultrabooks often requires replacing the entire glued palmrest assembly (costing ₹3,500–₹6,000). Check spacebar actuation on left and right edges. For the trackpad, ensure it sits flush with the casing; a raised or non-clicking trackpad is a direct warning that the battery underneath is swelling.',
    linkHref: '/tools',
    linkText: 'Open Keyboard Tester'
  },
  {
    id: 'faq-restart-twice',
    category: 'Inspection Advice',
    question: 'Why should you restart a second-hand laptop at least twice before paying?',
    shortAnswer: 'Restarting once cold and once after 15 minutes of load exposes thermal shutdowns, intermittent motherboard faults, and warm-boot memory crashes.',
    detailedAnswer: 'Some damaged laptops with dried thermal paste or cracked BGA solder ball joints boot fine when completely cold, but crash, throw blue screens (BSOD), or refuse to turn on once internal heat pipes reach operating temperatures. Always keep YouTube or a benchmark running for 10–15 minutes, then perform a warm reboot.',
    linkHref: '/checklist',
    linkText: 'Open Inspection Checklist'
  }
];

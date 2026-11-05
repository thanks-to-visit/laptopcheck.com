import { CommandItem } from './types';

export const COMMANDS: CommandItem[] = [
  {
    id: 'cmd-battery-report',
    title: 'Generate Battery Health Report',
    command: 'powercfg /batteryreport',
    type: 'cmd',
    category: 'battery',
    purpose: 'Exports an HTML report of battery design capacity vs current full charge capacity and historical battery life drain.',
    notes: 'Outputs to C:\\Users\\[User]\\battery-report.html. Open it in Edge or Chrome to inspect Design Capacity vs Full Charge Capacity.',
    isEssential: true
  },
  {
    id: 'cmd-cpu-powershell',
    title: 'Verify Processor Specifications (PowerShell)',
    command: 'Get-CimInstance Win32_Processor | Select Name,NumberOfCores,NumberOfLogicalProcessors,MaxClockSpeed',
    type: 'powershell',
    category: 'processor',
    purpose: 'Queries CPU exact name, physical cores, logical threads, and baseline clock speed without relying on deprecated WMIC.',
    notes: 'Recommended for Windows 11 22H2+ where legacy wmic.exe may be disabled or uninstalled.',
    isEssential: true
  },
  {
    id: 'cmd-cpu-wmic',
    title: 'Verify Processor Specifications (CMD / WMIC)',
    command: 'wmic cpu get name,numberofcores,numberoflogicalprocessors,maxclockspeed',
    type: 'cmd',
    category: 'processor',
    purpose: 'Legacy Command Prompt query for CPU model, core count, thread count, and maximum clock speed.',
    notes: 'Works across Windows 10 and older builds. If WMIC is not recognized on Windows 11, use the PowerShell command above.',
    isEssential: false
  },
  {
    id: 'cmd-disk-status',
    title: 'Query Drive Models & Firmware Status',
    command: 'wmic diskdrive get model,size,status',
    type: 'cmd',
    category: 'storage',
    purpose: 'Quick check of all internal and external connected disks, storage capacity in bytes, and firmware reported status.',
    notes: 'Note: Returns "OK" unless a drive is actively failing SMART thresholds. You MUST still check CrystalDiskInfo for real health percentage!',
    isEssential: true
  },
  {
    id: 'cmd-chkdsk',
    title: 'Scan NTFS File System & Bad Sectors',
    command: 'chkdsk C: /scan',
    type: 'cmd',
    category: 'storage',
    purpose: 'Runs an online read-only scan of the primary system partition without forcing a restart or unmounting.',
    notes: 'Run inside an Administrator Command Prompt. Will flag corrupted clusters and partition metadata errors.',
    isEssential: false
  },
  {
    id: 'cmd-memory-diagnostic',
    title: 'Launch Windows Memory Diagnostic Tool',
    command: 'mdsched.exe',
    type: 'run',
    category: 'ram',
    purpose: 'Launches the native Windows hardware memory test on boot to detect failing RAM chips or address bit errors.',
    notes: 'Warning: Choosing "Restart now" will immediately reboot the laptop and take 10–25 minutes. Run at the end of inspection if RAM stability is suspect.',
    isEssential: true
  },
  {
    id: 'cmd-bios-serial',
    title: 'Check Motherboard & Hardware Serial Number',
    command: 'Get-CimInstance Win32_BIOS | Select SerialNumber,SMBIOSBIOSVersion,Manufacturer',
    type: 'powershell',
    category: 'bios-security',
    purpose: 'Retrieves the hardware-burned serial number to compare with the chassis sticker or bottom plate engraving.',
    notes: 'If Serial Number returns "Default string", "To be filled by O.E.M.", or is blank, the motherboard may have been replaced or flashed with a hacked BIOS.',
    isEssential: true
  },
  {
    id: 'cmd-dsregcmd',
    title: 'Check Corporate MDM / Entra / Autopilot Lock',
    command: 'dsregcmd /status',
    type: 'cmd',
    category: 'bios-security',
    purpose: 'Inspects whether the laptop is enrolled in Azure AD, corporate MDM, Microsoft Intune, or device workplace management.',
    notes: 'Look for "AzureAdJoined : YES" or "EnterpriseJoined : YES". If joined to an unknown company domain, the laptop is managed property and could be locked remotely.',
    isEssential: true
  },
  {
    id: 'cmd-slmgr-xpr',
    title: 'Check Windows License Expiration (OEM vs KMS Crack)',
    command: 'slmgr /xpr',
    type: 'run',
    category: 'bios-security',
    purpose: 'Opens a dialog stating if Windows is permanently activated with a genuine digital license or running on a temporary 180-day volume crack.',
    notes: 'A genuine consumer laptop should say: "The machine is permanently activated". If it mentions volume activation expiring on a future date, it is using a pirated KMS emulator.',
    isEssential: true
  },
  {
    id: 'cmd-msinfo32',
    title: 'Launch System Information Console',
    command: 'msinfo32',
    type: 'run',
    category: 'bios-security',
    purpose: 'Opens full hardware summary: BIOS Mode (UEFI/Legacy), Secure Boot State, Motherboard Model, RAM, and virtualization.',
    notes: 'Verify "Secure Boot State" is "On" or supported, and "BIOS Mode" is "UEFI".',
    isEssential: true
  },
  {
    id: 'cmd-dxdiag',
    title: 'DirectX Diagnostics (GPU & Audio)',
    command: 'dxdiag',
    type: 'run',
    category: 'display',
    purpose: 'Inspects integrated and discrete GPUs, VRAM capacity, driver dates, display refresh rates, and audio devices.',
    notes: 'Check the "Display" and "Render" tabs to verify if a dedicated GPU (e.g. NVIDIA/AMD) is properly recognized and driver is signed.',
    isEssential: false
  },
  {
    id: 'cmd-task-manager',
    title: 'Open Task Manager Performance View',
    command: 'taskmgr',
    type: 'shortcut',
    category: 'processor',
    purpose: 'Quick shortcut or press Ctrl + Shift + Esc directly.',
    notes: 'Check Performance tab for CPU idle usage (should be under 5-10% at idle), Disk 0 type (SSD vs HDD), and Memory slots used.',
    isEssential: false
  }
];

/* ===========================================================
   CASE DATA — edit this array to add/update projects
   =========================================================== */
const caseLog = [
  {
    id: "CASE-005",
    name: "AgentTesla JS Dropper",
    tagline: "REMnux · Hybrid Analysis · VirusTotal",
    severity: "resolved",
    severityLabel: "resolved",
    status: "documented",
    summary:
      "Static and dynamic analysis of a malicious JavaScript dropper (Quotation.js) delivering the AgentTesla infostealer. The sample used 65,573 lines of junk obfuscation, WMI silent execution, Startup folder persistence, and a disguised PNG payload from a compromised Peruvian server. Threat Score: 100/100. VirusTotal: 31/60 engines.",
    chain: [
      "Acquired sample from MalwareBazaar, transferred to isolated REMnux VM via Python HTTP server on a host-only network — no internet exposure during analysis",
      "Ran file and exiftool — confirmed Unicode UTF-8 JS file, 1.57 MB, 65,573 lines, Windows CRLF newlines — file size vs zip size (8.4 KB) immediately flagged heavy obfuscation",
      "Identified junk obfuscation technique: thousands of empty switch(1)/case 1 blocks accumulating empty strings in a windling variable — pure noise designed to exhaust sandbox timeouts (T1497)",
      "Grepped through obfuscation to find ActiveX objects (Scripting.FileSystemObject, WScript.Shell), Startup folder self-copy persistence (T1547.001), and a Base64-encoded C2 URL embedded in the triumvir variable",
      "Decoded the C2 URL: https://magsa.com.pe/sorma/MSI PRO.png — payload disguised as a PNG image to bypass proxy content inspection (T1036)",
      "Traced WMI execution chain: PowerShell script assembled in the binotonous variable → stored in $env:interossicular environment variable → WMI spawns hidden PowerShell with ShowWindow = 0 (T1047 + T1564.003)",
      "Submitted to Hybrid Analysis (Falcon Sandbox) — Threat Score 100/100, classified Trojan.Cryxos.JS, 222 MITRE ATT&CK indicators mapped; network analysis revealed caspol.exe (LOLBin) contacting ip-api.com for victim geolocation (T1016)",
      "VirusTotal confirmed 31/60 detections across CAPE Sandbox, Yomi Hunter, and Zenbox — dynamic analysis uncovered a second payload URL (img_162829.png) not found during static analysis"
    ],
    outcome:
      "full attack chain mapped: JS dropper → WMI silent PowerShell → AgentTesla payload · 31/60 VT · 100/100 threat score · C2 extracted statically",
    tags: ["REMnux", "ExifTool", "Hybrid Analysis", "VirusTotal", "MalwareBazaar", "VirtualBox", "MITRE ATT&CK"],
    links: [
      { label: "View on GitHub", href: "https://github.com/Robertnile/case-005-agenttesla-js-dropper" }
    ]
  },
  {
    id: "CASE-004",
    name: "Tunneling in Plain Sight",
    tagline: "dnscat2 · Meterpreter · Zeek · Splunk",
    severity: "resolved",
    severityLabel: "resolved",
    status: "documented",
    summary:
      "A two-part C2 detection lab built across 4 VMs — DNS tunneling (dnscat2) and HTTPS C2 (Meterpreter) — both caught using behavioral detections in Splunk via Zeek logs. No signatures. OS-agnostic. Same methodology, two different protocols.",
    chain: [
      "Deployed dnscat2 server on Kali and client on victim VM, establishing an encrypted C2 session over UDP port 53 — achieved interactive root shell entirely through DNS with no direct TCP/UDP connection",
      "Discovered and fixed a critical Zeek TSV field parsing issue in props.conf (FIELD_HEADER_REGEX) that caused all Splunk field names to misalign — documented as a required fix for any Zeek/Splunk deployment",
      "Built three behavioral DNS detections: unusual record types (666 events, T1071.004), encoded query length (240-char payloads, T1572), and high-volume query rate (3,978 queries at 0.627s avg, T1048.003)",
      "Extended the lab to HTTPS C2 using Meterpreter reverse HTTPS — generated payload with msfvenom, established session over port 4443, achieved root shell via encrypted channel",
      "Added zeek:ssl sourcetype to Splunk pipeline and built three HTTPS detections: self-signed certificate (183 events, T1573.002), repeated connections to same internal destination (215 events, T1071.001), and beaconing interval (1,244 connections at 2.03s avg)",
      "Documented detection limits: CV-based beaconing fails for interactive C2 shells; valid certs on port 443 defeat cert-based detection — beaconing interval survives both"
    ],
    outcome:
      "root shell confirmed over DNS and HTTPS · 6 behavioral detections across 2 protocols — encryption hides the payload, not the behavior",
    tags: ["dnscat2", "Metasploit", "Meterpreter", "Zeek", "Splunk", "SPL", "VirtualBox"],
    links: [
      { label: "DNS Tunneling README", href: "https://github.com/Robertnile/Tunneling-in-Plain-Sight-Detecting-DNS-C2-with-Zeek-and-Splunk/blob/main/README.md" },
      { label: "HTTPS C2 README", href: "https://github.com/Robertnile/Tunneling-in-Plain-Sight-Detecting-DNS-C2-with-Zeek-and-Splunk/blob/main/README-HTTPS-C2.md" }
    ]
  },
  {
    id: "CASE-003",
    name: "Phishing Simulation Lab",
    tagline: "GoPhish · MailHog · Zeek · Splunk",
    severity: "resolved",
    severityLabel: "resolved",
    status: "documented",
    summary:
      "A complete phishing attack chain across 4 VMs (Kali, Ubuntu Server, Windows 11, Splunk) — playing both attacker and defender to replicate a real SOC workflow end to end.",
    chain: [
      "Configured GoPhish (attacker) and MailHog (mail catcher) to run a social-engineered IT support phishing campaign with a credential-harvesting landing page",
      "Captured cleartext credentials in Wireshark POST requests and identified the X-Server: gophish IOC",
      "Forwarded Zeek HTTP logs and Postfix mail logs to Splunk via Universal Forwarder",
      "Wrote SPL detection queries and built a Phishing Attack Analysis dashboard, mapped to MITRE ATT&CK (T1566.002, T1056.003, T1071.001)",
      "Performed email header forensics comparing SPF/DKIM/DMARC failures between the phishing email and a legitimate one"
    ],
    outcome:
      "captured X-Server: gophish IOC, mapped to T1566.002 / T1056.003 / T1071.001 — full chain detected, not just simulated",
    tags: ["GoPhish", "MailHog", "Zeek", "Wireshark", "Splunk", "VirtualBox"],
    links: [
      { label: "View on GitHub", href: "https://github.com/Robertnile/phishing-simulation-lab" }
    ]
  },
  {
    id: "CASE-002",
    name: "Velociraptor DFIR Lab",
    tagline: "Velociraptor · VQL · Linux & Windows",
    severity: "resolved",
    severityLabel: "resolved",
    status: "documented",
    summary:
      "A digital forensics and incident response lab covering 11 attack techniques across Linux and Windows endpoints, including a custom-written VQL artifact.",
    chain: [
      "Deployed Velociraptor across Windows 11 and Ubuntu 24.04 endpoints",
      "Simulated 11 real-world attack techniques: credential dumping, lateral movement, persistence, C2 communication, and more",
      "Authored a custom VQL artifact — Custom.Linux.Systemd.SuspiciousPersistence — going beyond default built-in queries",
      "Debugged VQL-specific syntax quirks (aggregate functions, GROUP BY behavior, strip() vs trim())",
      "Produced a full remediation table with countermeasures per technique, plus a lessons-learned write-up"
    ],
    outcome:
      "11/11 techniques hunted and remediated — strongest documentation of the three flagship labs",
    tags: ["Velociraptor", "VQL", "Linux", "Windows", "Threat Hunting"],
    links: [
      { label: "View on GitHub", href: "https://github.com/Robertnile/velociraptor-threat-hunting-lab" }
    ]
  },
  {
    id: "CASE-001",
    name: "Splunk / Metasploitable3 Lab",
    tagline: "Splunk · Zeek · MITRE ATT&CK · IR Playbooks",
    severity: "resolved",
    severityLabel: "resolved",
    status: "documented",
    summary:
      "A foundational SOC lab pairing Metasploitable3 attack scenarios with Splunk detection, Zeek network monitoring, and four written incident response playbooks.",
    chain: [
      "Stood up a 3-VM SIEM environment: Splunk, Kali attacker, Metasploitable3 victim",
      "Ingested auth.log/syslog in real time; deployed Zeek for network-layer visibility",
      "Simulated Nmap recon (T1046), SSH brute force (T1110.001), reverse shell C2 (T1571), and privilege escalation (T1136.001)",
      "Wrote SPL detection queries and real-time Splunk alerts for all four scenarios",
      "Authored four IR playbooks (PB-001–004) following the PICERL framework, plus a full REPORT.md"
    ],
    outcome:
      "4/4 attack scenarios detected with real-time Splunk alerts — established the PICERL workflow used in every lab since",
    tags: ["Splunk", "Metasploitable3", "Zeek", "MITRE ATT&CK", "IR Playbooks"],
    links: [
      { label: "View on GitHub", href: "https://github.com/Robertnile/splunk-metasploitable-lab" }
    ]
  }
];

/* ===========================================================
   RENDER TICKET QUEUE
   =========================================================== */
function severityClass(sev) {
  if (sev === "high") return "severity-high";
  if (sev === "medium") return "severity-medium";
  return "severity-resolved";
}

function renderTickets() {
  const queue = document.getElementById("ticket-queue");
  const html = caseLog.map((c, i) => `
    <details class="ticket" ${i === 0 ? "" : ""}>
      <summary class="ticket-summary">
        <span class="ticket-id">${c.id}</span>
        <span class="ticket-name">
          ${c.name}
          <span class="ticket-tagline">${c.tagline}</span>
        </span>
        <span class="severity ${severityClass(c.severity)}">${c.severityLabel}</span>
        <span class="ticket-status">${c.status}</span>
        <span class="chevron"></span>
      </summary>
      <div class="ticket-body">
        <div class="ticket-body-inner">
          <div class="case-main">
            <div class="case-field">
              <h4>Summary</h4>
              <p>${c.summary}</p>
            </div>
            <div class="case-field">
              <h4>Attack chain / build steps</h4>
              <ul>
                ${c.chain.map(step => `<li>${step}</li>`).join("")}
              </ul>
            </div>
            <div class="case-field">
              <h4>Outcome</h4>
              <div class="outcome-line"><span class="prompt">$ →</span><span>${c.outcome}</span></div>
            </div>
          </div>
          <div class="case-side">
            <h4 style="font-family: var(--font-mono); font-size: 11.5px; color: var(--accent); text-transform: uppercase; letter-spacing: 0.06em; margin: 0 0 10px;">Tools</h4>
            <div class="tag-pill-list">
              ${c.tags.map(t => `<span class="tag-pill">${t}</span>`).join("")}
            </div>
            ${c.links.length ? `
              <h4 style="font-family: var(--font-mono); font-size: 11.5px; color: var(--accent); text-transform: uppercase; letter-spacing: 0.06em; margin: 0 0 10px;">Links</h4>
              <div class="case-links">
                ${c.links.map(l => `<a href="${l.href}" target="_blank" rel="noopener">→ ${l.label}</a>`).join("")}
              </div>
            ` : ""}
          </div>
        </div>
      </div>
    </details>
  `).join("");
  queue.innerHTML = html;
}

/* ===========================================================
   HERO TERMINAL FEED — typed log lines
   =========================================================== */
const feedLines = [
  { text: "[09:14:02] alert queue: 0 unresolved", cls: "" },
  { text: "[09:14:03] case CASE-001 :: status=resolved", cls: "line-muted" },
  { text: "[09:14:03] case CASE-002 :: status=resolved", cls: "line-muted" },
  { text: "[09:14:04] case CASE-003 :: status=resolved", cls: "line-muted" },
  { text: "[09:14:05] case CASE-004 :: status=resolved", cls: "line-muted" },
  { text: "[09:14:06] case CASE-005 :: status=resolved", cls: "line-muted" },
  { text: "[09:14:07] detection coverage: SSH brute force, recon,", cls: "line-muted" },
  { text: "           C2/reverse shell, privesc, phishing,", cls: "line-muted" },
  { text: "           DFIR (11 techniques), HTTPS C2,", cls: "line-muted" },
  { text: "           malware analysis (JS dropper)", cls: "line-muted" },
  { text: "[09:14:08] open_to_work = true", cls: "" },
  { text: "[09:14:09] location = Nigeria (remote)", cls: "" },
  { text: "[09:14:10] _", cls: "" }
];

function typeFeed() {
  const el = document.getElementById("terminal-feed");
  if (!el) return;
  let lineIdx = 0;
  let charIdx = 0;

  function typeChar() {
    if (lineIdx >= feedLines.length) return;
    const line = feedLines[lineIdx];
    if (charIdx === 0) {
      const span = document.createElement("div");
      if (line.cls) span.className = line.cls;
      span.dataset.full = line.text;
      el.appendChild(span);
    }
    const currentSpan = el.lastChild;
    charIdx++;
    currentSpan.textContent = line.text.slice(0, charIdx);

    if (charIdx < line.text.length) {
      setTimeout(typeChar, 14);
    } else {
      lineIdx++;
      charIdx = 0;
      setTimeout(typeChar, 220);
    }
  }
  typeChar();
}

/* ===========================================================
   INIT
   =========================================================== */
document.addEventListener("DOMContentLoaded", () => {
  renderTickets();

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const el = document.getElementById("terminal-feed");
    if (el) el.textContent = feedLines.map(l => l.text).join("\n");
  } else {
    typeFeed();
  }
});

/* ===========================================================
   CASE DATA — edit this array to add/update projects
   =========================================================== */
const caseLog = [
  {
    id: "CASE-004",
    name: "DNS Tunneling Detection Lab",
    tagline: "Splunk · dnscat2 · in progress",
    severity: "medium",
    severityLabel: "in build",
    status: "phase 1/5",
    summary:
      "A five-phase home lab built to simulate and detect DNS tunneling-based C2 traffic — from attack simulation through to a documented Splunk dashboard.",
    chain: [
      "Provision Ubuntu Server 22.04 LTS client VM in VirtualBox",
      "Simulate C2 traffic over DNS using dnscat2",
      "Write SPL detection queries for tunneling indicators (query entropy, volume, TXT record anomalies)",
      "Build a Splunk dashboard with alerting",
      "Document the full build on GitHub"
    ],
    outcome:
      "In progress — lab environment currently being provisioned. Full writeup will ship to GitHub on completion.",
    tags: ["Splunk", "SPL", "dnscat2", "VirtualBox", "Ubuntu Server"],
    links: []
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
      "Full attack chain executed and detected end-to-end, including real IOC identification and protocol-level email forensics — not just log correlation.",
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
      "Assessed as the strongest of the three flagship projects on documentation quality. The remediation table and write-up reflect SOC analyst methodology, not just tool usage.",
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
      "First flagship project — established the detection engineering and PICERL-based documentation workflow used in every lab since.",
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
              <p>${c.outcome}</p>
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
  { text: "[09:14:05] case CASE-004 :: status=in_progress", cls: "line-warn" },
  { text: "[09:14:06] detection coverage: SSH brute force, recon,", cls: "line-muted" },
  { text: "           C2/reverse shell, privesc, phishing,", cls: "line-muted" },
  { text: "           DFIR (11 techniques)", cls: "line-muted" },
  { text: "[09:14:07] open_to_work = true", cls: "" },
  { text: "[09:14:08] location = Nigeria (remote)", cls: "" },
  { text: "[09:14:09] _", cls: "" }
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

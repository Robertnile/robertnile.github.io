/* ===========================================================
   CASE DATA — edit this array to add/update projects
   =========================================================== */
const caseLog = [
  {
    id: "CASE-004",
    name: "Tunneling in Plain Sight",
    tagline: "dnscat2 · Zeek · Splunk",
    severity: "resolved",
    severityLabel: "resolved",
    status: "documented",
    summary:
      "A full DNS tunneling attack simulated across 4 VMs — establishing an encrypted C2 channel over DNS, achieving a root shell on the victim, and catching the entire attack chain with three independent behavioral detections in Splunk.",
    chain: [
      "Deployed dnscat2 server on Kali and client on victim VM (192.168.122.13), establishing an encrypted C2 session over UDP port 53 using TXT, MX, and CNAME record types",
      "Achieved interactive root shell on victim machine entirely through DNS — no direct TCP/UDP connection ever existed",
      "Discovered and fixed a critical Zeek TSV field parsing issue in props.conf (FIELD_HEADER_REGEX) that caused all Splunk field names to misalign — documented as a required fix for any Zeek/Splunk deployment",
      "Built Detection 1: unusual DNS record types (TXT/MX/CNAME) — 666 events, all from a single source IP, mapped to T1071.004",
      "Built Detection 2: encoded query length — 22 queries at 240 characters, fixed-size chunks confirming automated payload encoding, mapped to T1572",
      "Built Detection 3: high-volume query rate — 3,978 queries at 0.627s average interval, tuned for interactive C2 shells rather than periodic beaconing, mapped to T1048.003"
    ],
    outcome:
      "root shell over DNS confirmed · T1071.004 / T1572 / T1048.003 detected behaviorally — OS-agnostic, no signatures required",
    tags: ["dnscat2", "Zeek", "Splunk", "SPL", "VirtualBox"],
    links: [
      { label: "View on GitHub", href: "https://github.com/Robertnile/Tunneling-in-Plain-Sight-Detecting-DNS-C2-with-Zeek-and-Splunk" }
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

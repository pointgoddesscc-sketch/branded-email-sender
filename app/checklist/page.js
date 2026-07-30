import Link from 'next/link';

export const metadata = {
  title: 'Weekly Deliverability Checklist | Email Suite',
};

export default function ChecklistPage() {
  return (
    <main style={{ maxWidth: 800, margin: '40px auto', padding: '0 20px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <h1 style={{ fontSize: 28, margin: '0 0 8px' }}>Weekly Email Deliverability Checklist</h1>
        <p style={{ color: '#6b7280' }}>Combine Google Postmaster Tools + DMARC Aggregate Reports</p>
      </div>

      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 40, flexWrap: 'wrap' }}>
        <Link href="/" style={navStyle(false)}>Send Email</Link>
        <Link href="/checklist" style={navStyle(true)}>Weekly Checklist</Link>
        <Link href="/guide" style={navStyle(false)}>Setup Guides</Link>
      </div>

      <div style={{ background: '#fff', borderRadius: 16, padding: 32, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        <h2 style={{ marginTop: 0 }}>Every Monday (or after major campaigns)</h2>

        <ol style={{ lineHeight: 1.8, paddingLeft: 20 }}>
          <li>
            <strong>Open Google Postmaster Tools</strong><br />
            <a href="https://postmaster.google.com" target="_blank" rel="noopener">postmaster.google.com</a><br />
            Check: Domain Reputation, IP Reputation, Spam Rate, Authentication rates
          </li>
          <li style={{ marginTop: 16 }}>
            <strong>Download latest DMARC Aggregate Reports</strong><br />
            From the mailbox you set in <code>rua=mailto:...</code>
          </li>
          <li style={{ marginTop: 16 }}>
            <strong>Run the analysis script</strong><br />
            <code>python analyze_dmarc.py ./reports/ --slack --send</code><br />
            Review failing IPs and suspicious sources
          </li>
          <li style={{ marginTop: 16 }}>
            <strong>Compare the two views</strong><br />
            Postmaster Tools = Google’s reputation view<br />
            DMARC Reports = Exact IP-level failures
          </li>
          <li style={{ marginTop: 16 }}>
            <strong>Take action</strong><br />
            • Add legitimate new IPs to SPF + whitelist<br />
            • Fix or remove failing third-party services<br />
            • Investigate any unknown high-volume IPs
          </li>
          <li style={{ marginTop: 16 }}>
            <strong>Update DMARC policy if ready</strong><br />
            Move from <code>p=none</code> → <code>p=quarantine</code> → <code>p=reject</code> only when failures are near zero
          </li>
        </ol>

        <h3 style={{ marginTop: 40 }}>Healthy Targets</h3>
        <ul>
          <li>Spam Rate in Postmaster Tools: <strong>&lt; 0.10%</strong></li>
          <li>Authentication success (SPF + DKIM): <strong>&gt; 98%</strong></li>
          <li>Domain Reputation: <strong>High</strong></li>
          <li>Suspicious / unknown IPs: <strong>near zero volume</strong></li>
        </ul>

        <h3 style={{ marginTop: 40 }}>Red Flags – Act Immediately</h3>
        <ul style={{ color: '#b91c1c' }}>
          <li>Spam rate above 0.3%</li>
          <li>Domain or IP reputation drops to Low / Bad</li>
          <li>Sudden spike in DMARC failures from unknown IPs</li>
          <li>Authentication rate falls below 90%</li>
        </ul>
      </div>
    </main>
  );
}

const navStyle = (active) => ({
  padding: '10px 18px',
  borderRadius: 8,
  textDecoration: 'none',
  fontWeight: 600,
  fontSize: 14,
  background: active ? '#2563eb' : '#f1f5f9',
  color: active ? '#fff' : '#334155',
});

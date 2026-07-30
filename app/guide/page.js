import Link from 'next/link';

export const metadata = {
  title: 'Setup Guides | Email Deliverability Suite',
};

export default function GuidePage() {
  return (
    <main style={{ maxWidth: 860, margin: '40px auto', padding: '0 20px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <h1 style={{ fontSize: 28, margin: '0 0 8px' }}>Setup Guides</h1>
        <p style={{ color: '#6b7280' }}>Google Postmaster Tools • DMARC • SPF • DKIM</p>
      </div>

      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 40, flexWrap: 'wrap' }}>
        <Link href="/" style={navStyle(false)}>Send Email</Link>
        <Link href="/checklist" style={navStyle(false)}>Weekly Checklist</Link>
        <Link href="/guide" style={navStyle(true)}>Setup Guides</Link>
      </div>

      {/* Postmaster Tools */}
      <section style={cardStyle}>
        <h2 style={{ marginTop: 0 }}>1. Google Postmaster Tools – DNS Verification</h2>
        <p>To verify your domain in <a href="https://postmaster.google.com" target="_blank" rel="noopener">postmaster.google.com</a>, add this TXT record:</p>

        <div style={codeBlock}>
          <strong>Type:</strong> TXT<br />
          <strong>Name / Host:</strong> <code>@</code> or leave blank (root domain)<br />
          <strong>Value:</strong> <code>google-site-verification=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</code><br />
          <strong>TTL:</strong> 3600
        </div>

        <p style={{ marginTop: 16 }}>Google will show you the exact <code>google-site-verification=...</code> string when you click “Add Domain”. Copy it exactly.</p>

        <h3>Common Patterns in Postmaster Tools</h3>
        <ul>
          <li><strong>High Reputation + low spam rate</strong> → Healthy. Keep monitoring.</li>
          <li><strong>Medium / Low Reputation</strong> → Check spam rate and authentication. Fix failing sources quickly.</li>
          <li><strong>Spam rate climbing above 0.1%</strong> → Review content, list quality, and recent campaigns.</li>
          <li><strong>Authentication drops</strong> → Immediately run DMARC Aggregate Report analysis to find the failing IPs.</li>
          <li><strong>Delivery Errors: Rate Limited</strong> → You are sending too fast. Slow down or warm up the IP/domain.</li>
        </ul>
      </section>

      {/* DMARC */}
      <section style={{ ...cardStyle, marginTop: 32 }}>
        <h2 style={{ marginTop: 0 }}>2. DMARC Record (Recommended Starting Point)</h2>
        <div style={codeBlock}>
          Type: TXT<br />
          Name: <code>_dmarc</code><br />
          Value: <code>v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com; ruf=mailto:dmarc@yourdomain.com; fo=1; adkim=r; aspf=r</code>
        </div>
        <p>Start with <code>p=none</code> for monitoring. Move to <code>quarantine</code> then <code>reject</code> only when authentication is consistently &gt; 98%.</p>
      </section>

      {/* SPF */}
      <section style={{ ...cardStyle, marginTop: 32 }}>
        <h2 style={{ marginTop: 0 }}>3. SPF Record Examples</h2>
        <p><strong>Google Workspace only:</strong></p>
        <div style={codeBlock}>v=spf1 include:_spf.google.com ~all</div>

        <p><strong>Google + SendGrid:</strong></p>
        <div style={codeBlock}>v=spf1 include:_spf.google.com include:sendgrid.net ~all</div>

        <p><strong>Google + Amazon SES:</strong></p>
        <div style={codeBlock}>v=spf1 include:_spf.google.com include:amazonses.com ~all</div>
      </section>

      {/* DKIM */}
      <section style={{ ...cardStyle, marginTop: 32 }}>
        <h2 style={{ marginTop: 0 }}>4. DKIM for Google Workspace</h2>
        <ol>
          <li>Go to Google Admin Console → Apps → Google Workspace → Gmail → Authenticate email</li>
          <li>Generate new record (prefix usually <code>google</code>)</li>
          <li>Publish the TXT record Google gives you</li>
          <li>Click “Start authentication”</li>
        </ol>
      </section>

      <section style={{ ...cardStyle, marginTop: 32 }}>
        <h2 style={{ marginTop: 0 }}>5. Complete Weekly Workflow</h2>
        <p>Use the <Link href="/checklist">Weekly Checklist</Link> page together with:</p>
        <ul>
          <li>Google Postmaster Tools</li>
          <li>The Python analyzer scripts (<code>analyze_dmarc.py</code>)</li>
          <li>Slack notifications + branded email reports</li>
        </ul>
      </section>
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

const cardStyle = {
  background: '#fff',
  borderRadius: 16,
  padding: 32,
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
};

const codeBlock = {
  background: '#f8fafc',
  border: '1px solid #e2e8f0',
  borderRadius: 8,
  padding: '14px 18px',
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  fontSize: 14,
  lineHeight: 1.6,
  overflowX: 'auto',
};

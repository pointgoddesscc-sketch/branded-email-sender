/**
 * Demo frontend – send a branded test email
 * Perfect for marketing teams and website developers
 */
'use client';

import { useState } from 'react';

export default function HomePage() {
  const [form, setForm] = useState({
    to: '',
    subject: 'Welcome to our platform',
    title: 'Welcome aboard!',
    message: '<p>Hi there,</p><p>Thank you for joining us. We are excited to help grow your business with smart marketing and modern web solutions.</p>',
    buttonText: 'Get Started',
    buttonUrl: 'https://yourwebsite.com',
  });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('✅ Email sent successfully! Check the inbox.');
      } else {
        setStatus('❌ Error: ' + (data.error || 'Failed to send'));
      }
    } catch (err) {
      setStatus('❌ Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ maxWidth: 640, margin: '40px auto', padding: '0 20px' }}>
      <div style={{ background: '#fff', borderRadius: 16, padding: 32, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        <h1 style={{ margin: '0 0 8px', fontSize: 28, color: '#111827' }}>Branded Email Sender</h1>
        <p style={{ margin: '0 0 28px', color: '#6b7280' }}>
          Send professional marketing & business emails via Gmail SMTP.
          Built for websites and automation.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <label style={{ fontWeight: 600, fontSize: 14 }}>
            To (recipient email)
            <input
              name="to"
              type="email"
              required
              value={form.to}
              onChange={handleChange}
              placeholder="customer@example.com"
              style={{ display: 'block', width: '100%', marginTop: 6, padding: '10px 12px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 15 }}
            />
          </label>

          <label style={{ fontWeight: 600, fontSize: 14 }}>
            Subject
            <input
              name="subject"
              value={form.subject}
              onChange={handleChange}
              style={{ display: 'block', width: '100%', marginTop: 6, padding: '10px 12px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 15 }}
            />
          </label>

          <label style={{ fontWeight: 600, fontSize: 14 }}>
            Title (inside email)
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              style={{ display: 'block', width: '100%', marginTop: 6, padding: '10px 12px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 15 }}
            />
          </label>

          <label style={{ fontWeight: 600, fontSize: 14 }}>
            Message (HTML allowed)
            <textarea
              name="message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              style={{ display: 'block', width: '100%', marginTop: 6, padding: '10px 12px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 15, resize: 'vertical' }}
            />
          </label>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <label style={{ fontWeight: 600, fontSize: 14 }}>
              Button text
              <input
                name="buttonText"
                value={form.buttonText}
                onChange={handleChange}
                style={{ display: 'block', width: '100%', marginTop: 6, padding: '10px 12px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 15 }}
              />
            </label>
            <label style={{ fontWeight: 600, fontSize: 14 }}>
              Button URL
              <input
                name="buttonUrl"
                value={form.buttonUrl}
                onChange={handleChange}
                style={{ display: 'block', width: '100%', marginTop: 6, padding: '10px 12px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 15 }}
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: 8,
              padding: '14px 24px',
              background: loading ? '#93c5fd' : '#2563eb',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              fontSize: 16,
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Sending…' : 'Send Branded Email'}
          </button>
        </form>

        {status && (
          <p style={{ marginTop: 20, padding: 12, borderRadius: 8, background: status.startsWith('✅') ? '#ecfdf5' : '#fef2f2', color: status.startsWith('✅') ? '#065f46' : '#991b1b' }}>
            {status}
          </p>
        )}
      </div>

      <p style={{ textAlign: 'center', marginTop: 24, color: '#9ca3af', fontSize: 13 }}>
        Powered by Next.js + Nodemailer • Ready for Vercel
      </p>
    </main>
  );
}

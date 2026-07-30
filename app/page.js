'use client';

import { useState } from 'react';
import Link from 'next/link';

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
    <main style={{ maxWidth: 900, margin: '40px auto', padding: '0 20px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <h1 style={{ fontSize: 32, margin: '0 0 8px', color: '#111827' }}>Email Deliverability Suite</h1>
        <p style={{ color: '#6b7280', margin: 0 }}>
          Branded email sending + DMARC + Google Postmaster Tools + Weekly analysis
        </p>
      </div>

      {/* Navigation */}
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 40, flexWrap: 'wrap' }}>
        <Link href="/" style={navStyle(true)}>Send Email</Link>
        <Link href="/checklist" style={navStyle(false)}>Weekly Checklist</Link>
        <Link href="/guide" style={navStyle(false)}>Setup Guides</Link>
      </div>

      {/* Email Form Card */}
      <div style={{ background: '#fff', borderRadius: 16, padding: 32, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        <h2 style={{ margin: '0 0 8px', fontSize: 22 }}>Send Branded Email</h2>
        <p style={{ margin: '0 0 24px', color: '#6b7280', fontSize: 15 }}>
          Uses your custom SMTP configuration (Gmail, SendGrid, SES, Mailgun, or self-hosted).
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <label style={labelStyle}>
            To (recipient email)
            <input name="to" type="email" required value={form.to} onChange={handleChange}
              placeholder="customer@example.com" style={inputStyle} />
          </label>

          <label style={labelStyle}>
            Subject
            <input name="subject" value={form.subject} onChange={handleChange} style={inputStyle} />
          </label>

          <label style={labelStyle}>
            Title (inside email)
            <input name="title" value={form.title} onChange={handleChange} style={inputStyle} />
          </label>

          <label style={labelStyle}>
            Message (HTML allowed)
            <textarea name="message" rows={5} value={form.message} onChange={handleChange} style={{ ...inputStyle, resize: 'vertical' }} />
          </label>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <label style={labelStyle}>
              Button text
              <input name="buttonText" value={form.buttonText} onChange={handleChange} style={inputStyle} />
            </label>
            <label style={labelStyle}>
              Button URL
              <input name="buttonUrl" value={form.buttonUrl} onChange={handleChange} style={inputStyle} />
            </label>
          </div>

          <button type="submit" disabled={loading} style={buttonStyle(loading)}>
            {loading ? 'Sending…' : 'Send Branded Email'}
          </button>
        </form>

        {status && (
          <p style={{
            marginTop: 20, padding: 12, borderRadius: 8,
            background: status.startsWith('✅') ? '#ecfdf5' : '#fef2f2',
            color: status.startsWith('✅') ? '#065f46' : '#991b1b'
          }}>
            {status}
          </p>
        )}
      </div>

      <p style={{ textAlign: 'center', marginTop: 32, color: '#9ca3af', fontSize: 13 }}>
        Custom SMTP • DMARC Ready • Google Postmaster Tools Compatible
      </p>
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

const labelStyle = { fontWeight: 600, fontSize: 14, color: '#374151' };
const inputStyle = {
  display: 'block', width: '100%', marginTop: 6, padding: '10px 12px',
  borderRadius: 8, border: '1px solid #d1d5db', fontSize: 15, boxSizing: 'border-box'
};
const buttonStyle = (loading) => ({
  marginTop: 8, padding: '14px 24px',
  background: loading ? '#93c5fd' : '#2563eb',
  color: '#fff', border: 'none', borderRadius: 8,
  fontSize: 16, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer'
});

/**
 * Root layout for the branded email sender demo
 */
export const metadata = {
  title: 'Branded Email Sender | Business & Marketing',
  description: 'Professional Gmail SMTP email service with branded HTML templates for websites and marketing automation.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', background: '#f8fafc' }}>
        {children}
      </body>
    </html>
  );
}

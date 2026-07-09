import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-gradient-to-br from-blue-900 via-slate-800 to-slate-900 text-slate-300 font-sans">
      
      {/* Back Button */}
      <div className="w-full max-w-2xl pt-4">
        <Link href="/" className="text-emerald-400 hover:text-emerald-300 font-bold text-sm flex items-center gap-2">
          <span>←</span> Back to Game
        </Link>
      </div>

      {/* Policy Content */}
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl mt-4 mb-12">
        <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 tracking-tight mb-2">
          Privacy Policy
        </h1>
        <p className="mb-8 text-sm text-slate-500 font-medium">Last updated: July 2026</p>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Information We Collect</h2>
            <p className="leading-relaxed text-sm">
              We use Vercel Analytics and Firebase to understand how players interact with our game. This includes anonymized data such as page views, session duration, and general geographic information. We do not collect personally identifiable information (PII) without your explicit consent.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Google AdSense and Cookies</h2>
            <p className="leading-relaxed text-sm mb-3">
              We use Google AdSense to serve ads on this website. Third-party vendors, including Google, use cookies to serve ads based on your prior visits to our website or other websites.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-slate-400">
              <li>Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to this site and/or other sites on the Internet.</li>
              <li>You may opt out of personalized advertising by visiting <a href="https://myadcenter.google.com/" className="text-emerald-400 hover:underline font-medium" target="_blank" rel="noreferrer">Google's Ads Settings</a>.</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Contact Us</h2>
            <p className="leading-relaxed text-sm">
              If you have any questions about this Privacy Policy, please contact us at <a href="mailto:footballalbumtriviaquestion@outlook.com" className="text-emerald-400 hover:underline font-medium">footballalbumtriviaquestion@outlook.com</a>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
// src/components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--ss-border)] bg-white">
      <div className="ss-container py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-3">
            <div className="text-lg font-semibold">SocietySalvor</div>
            <p className="text-sm text-[var(--ss-slate-600)]">
              Doorstep scrap pickup in Hyderabad &amp; Secunderabad. Sell scrap for fair prices or donate
              to verified NGO partners with transparent weighing and tracked orders.
            </p>
            <div className="space-y-1 text-sm text-[var(--ss-slate-600)]">
              <div>
                <span className="font-medium text-[var(--ss-slate-900)]">Phone:</span> +91 94942 62557
              </div>
              <div>
                <span className="font-medium text-[var(--ss-slate-900)]">Email:</span> contact@societysalvor.com
              </div>
              <div>
                <span className="font-medium text-[var(--ss-slate-900)]">Service area:</span> Hyderabad, Secunderabad, Telangana
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-sm font-semibold text-[var(--ss-slate-900)]">Quick links</div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <Link className="text-[var(--ss-slate-600)] hover:text-[var(--ss-slate-900)]" href="/sell">Sell Scrap</Link>
              <Link className="text-[var(--ss-slate-600)] hover:text-[var(--ss-slate-900)]" href="/donate">Donate Scrap</Link>
              <Link className="text-[var(--ss-slate-600)] hover:text-[var(--ss-slate-900)]" href="/scrap-prices">Scrap Prices</Link>
              <Link className="text-[var(--ss-slate-600)] hover:text-[var(--ss-slate-900)]" href="/ngos">NGO Partners</Link>
              <Link className="text-[var(--ss-slate-600)] hover:text-[var(--ss-slate-900)]" href="/vehicle-scrap">Vehicle Scrap</Link>
              <Link className="text-[var(--ss-slate-600)] hover:text-[var(--ss-slate-900)]" href="/track">Track Order</Link>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-sm font-semibold text-[var(--ss-slate-900)]">Help</div>
            <p className="text-sm text-[var(--ss-slate-600)]">
              Need help scheduling pickup or tracking an order? Chat with our team on WhatsApp.
            </p>
            <Link
              className="ss-btn-secondary w-fit"
              href="https://wa.me/919494262557?text=Hi%2C%20I%20need%20help%20with%20scrap%20pickup."
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat on WhatsApp
            </Link>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-[var(--ss-border)] pt-6 text-xs text-[var(--ss-slate-500)] md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} SocietySalvor. All rights reserved.</div>
          <div className="flex gap-4">
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// src/components/public/PublicFooter.tsx
import Link from "next/link";

export default function PublicFooter() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-600">
          
          {/* Brand & mission */}
          <div>
            <div className="font-semibold text-gray-900 mb-3">
              SocietySalvor
            </div>
            <p className="leading-relaxed">
              Sell scrap for fair prices or donate it to verified NGOs.
              SocietySalvor handles doorstep pickup, transparent weighing,
              and responsible processing.
            </p>
          </div>

          {/* Public links */}
          <div>
            <div className="font-medium text-gray-900 mb-3">
              Explore
            </div>
            <ul className="space-y-2">
              <li>
                <Link href="/sell" className="hover:text-gray-900">
                  Sell Scrap
                </Link>
              </li>
              <li>
                <Link href="/donate" className="hover:text-gray-900">
                  Donate Scrap
                </Link>
              </li>
              <li>
                <Link href="/scrap-prices" className="hover:text-gray-900">
                  Scrap Prices
                </Link>
              </li>
              <li>
                <Link href="/ngos" className="hover:text-gray-900">
                  NGO Partners
                </Link>
              </li>
              <li>
                <Link href="/vehicle-scrap" className="hover:text-gray-900">
                  Vehicle Scrap
                </Link>
              </li>
              <li>
                <Link href="/track" className="hover:text-gray-900">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust & legal */}
          <div>
            <div className="font-medium text-gray-900 mb-3">
              Trust & Transparency
            </div>
            <ul className="space-y-2">
              <li>Transparent weighing</li>
              <li>Admin-controlled pricing</li>
              <li>Verified NGO partners</li>
              <li>No hidden charges</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-gray-200 text-xs text-gray-500 flex flex-col md:flex-row items-center justify-between gap-4">
          <span>
            © {new Date().getFullYear()} SocietySalvor. All rights reserved.
          </span>
          <span>
            Built for transparency, impact, and compliance.
          </span>
        </div>
      </div>
    </footer>
  );
}

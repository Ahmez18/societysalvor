// src/app/(public)/vehicle-scrap/page.tsx
export default function VehicleScrapPage() {
  return (
    <div className="pt-20">
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-semibold text-gray-900">
          Vehicle Scrapping as per Government Guidelines
        </h1>

        <p className="mt-6 text-gray-600 max-w-3xl leading-relaxed">
          The Government of India has introduced a structured Vehicle Scrappage Policy
          to phase out old, polluting, and unsafe vehicles.
          Scrapping your vehicle through an authorised process helps reduce emissions,
          improve road safety, and makes you eligible for certain benefits.
          SocietySalvor assists you in initiating this process responsibly.
        </p>
      </section>

      {/* POLICY EXPLANATION */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            What the Vehicle Scrappage Policy Means
          </h2>

          <ul className="mt-6 space-y-3 text-gray-600 max-w-3xl list-disc list-inside">
            <li>Commercial vehicles older than 15 years</li>
            <li>Private vehicles older than 20 years</li>
            <li>Vehicles failing mandatory fitness tests</li>
          </ul>

          <p className="mt-4 text-gray-600 max-w-3xl">
            Such vehicles are encouraged to be scrapped through authorised facilities
            to ensure proper deregistration and environmentally responsible disposal.
          </p>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-semibold text-gray-900">
          Benefits of Scrapping Your Old Vehicle
        </h2>

        <ul className="mt-6 space-y-3 text-gray-600 max-w-3xl list-disc list-inside">
          <li>Eligibility for a government-recognised scrappage certificate</li>
          <li>Potential concessions on registration charges for new vehicles</li>
          <li>Possible road tax rebates, subject to policy and manufacturer schemes</li>
          <li>Reduced re-registration and repeated fitness testing costs</li>
          <li>Environmentally responsible recycling of vehicle materials</li>
        </ul>
      </section>

      {/* TAX DISCLAIMER */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            Tax Rebates and Concessions – What to Know
          </h2>

          <p className="mt-6 text-gray-600 max-w-3xl leading-relaxed">
            Vehicle scrapping may make owners eligible for certain concessions,
            such as reductions in registration fees or road tax when purchasing
            a new vehicle, as per prevailing government notifications and
            state-level policies.
          </p>

          <p className="mt-4 text-sm text-gray-500 max-w-3xl">
            Benefits may vary based on vehicle category, state regulations,
            manufacturer offers, and policy updates.
            SocietySalvor does not provide tax advice.
          </p>
        </div>
      </section>

      {/* PROCESS */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-semibold text-gray-900">
          How the Process Works
        </h2>

        <ol className="mt-6 space-y-3 text-gray-600 max-w-3xl list-decimal list-inside">
          <li>Submit basic vehicle details</li>
          <li>Our team reviews eligibility and documentation</li>
          <li>Authorised scrapping process is coordinated</li>
          <li>Scrappage confirmation and guidance are provided</li>
        </ol>
      </section>

      {/* FORM */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            Submit a Vehicle Scrap Request
          </h2>

          <p className="mt-4 text-gray-600">
            Share basic vehicle details and our team will review and contact you.
          </p>

          <form className="mt-6 grid grid-cols-1 gap-4">
            <input placeholder="Full Name" className="input" />
            <input placeholder="Phone Number" className="input" />
            <input placeholder="Vehicle Registration Number" className="input" />
            <input placeholder="Vehicle Type (Car / Bike / Commercial)" className="input" />
            <button
              type="submit"
              className="mt-4 rounded-md bg-gray-900 text-white px-6 py-3 text-sm hover:bg-gray-800 transition"
            >
              Submit Request
            </button>
          </form>

          <p className="mt-4 text-xs text-gray-500">
            Vehicle valuation, pickup, and benefits are confirmed after review.
          </p>
        </div>
      </section>
    </div>
  );
}

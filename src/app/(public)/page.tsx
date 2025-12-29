import Link from "next/link";

export default function HomePage() {
  return (
    <div className="pt-20">
      {/* HERO */}
      <section className="relative max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="absolute inset-0 -z-10 bg-linear-to-b from-green-50 to-transparent" />

        <h1 className="text-4xl md:text-5xl font-semibold text-primary max-w-4xl mx-auto">
          Turn scrap into <span className="text-accent">value</span> or{" "}
          <span className="text-accent">impact</span>.
        </h1>

        <p className="mt-4 text-lg text-secondary max-w-2xl mx-auto">
          SocietySalvor helps households sell scrap at fair prices or donate it
          to verified NGOs. We manage pickup, weighing, and transparency end-to-end.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/sell"
            className="inline-flex justify-center bg-accent text-white px-8 py-3 rounded-md font-medium"
          >
            Sell Scrap
          </Link>
          <Link
            href="/donate"
            className="inline-flex justify-center bg-accent text-white px-8 py-3 rounded-md font-medium"
          >
            Donate Scrap
          </Link>
        </div>

        <div className="mt-4">
          <Link href="/track" className="text-sm text-muted hover:text-primary">
            Track an order →
          </Link>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-surface py-16">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs uppercase tracking-wide text-muted text-center">
            Process
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-primary text-center">
            How SocietySalvor Works
          </h2>
          <p className="mt-4 text-secondary text-center max-w-3xl mx-auto">
            Whether you sell or donate scrap, the process is simple and transparent.
            Value or impact is always calculated after actual weighing.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                title: "Book Pickup",
                desc: "Select scrap items and schedule a pickup at your convenience.",
              },
              {
                title: "We Collect",
                desc: "Our team collects scrap from your doorstep at the scheduled time.",
              },
              {
                title: "We Weigh",
                desc: "Scrap is weighed transparently using calibrated weighing methods.",
              },
              {
                title: "Value / Impact",
                desc: "You receive payout or donation impact confirmation after weighing.",
              },
            ].map((step, i) => (
              <div
                key={i}
                className="bg-white border border-border rounded-lg p-6 text-center"
              >
                <h3 className="font-medium text-primary">{step.title}</h3>
                <p className="mt-2 text-sm text-secondary">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NGO PARTNERS */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-xs uppercase tracking-wide text-muted">
            NGOs
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-primary">
            Our NGO Partners
          </h2>
          <p className="mt-4 text-secondary max-w-3xl mx-auto">
            SocietySalvor works only with verified NGOs. When you donate scrap,
            it is routed through authorised partners to ensure genuine social impact.
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="border border-border rounded-lg p-6 bg-white"
              >
                <p className="font-medium text-primary">Partner NGO</p>
                <p className="mt-2 text-sm text-muted">
                  Verified organisation receiving donations via SocietySalvor.
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Link href="/ngos" className="text-accent font-medium">
              View all NGO partners →
            </Link>
          </div>
        </div>
      </section>

      {/* VEHICLE SCRAP */}
      <section className="bg-surface py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-xs uppercase tracking-wide text-muted">
            Vehicle Scrap
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-primary">
            Scrap Your Vehicle Responsibly
          </h2>
          <p className="mt-4 text-secondary max-w-3xl mx-auto">
            Vehicle scrapping is governed by government guidelines. SocietySalvor
            helps you initiate compliant vehicle scrapping through authorised processes.
          </p>
          <Link href="/vehicle-scrap" className="mt-6 inline-block text-accent font-medium">
            Scrap My Vehicle →
          </Link>
        </div>
      </section>

      {/* ECHOCHAMP */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-xs uppercase tracking-wide text-muted">
            Schools
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-primary">
            EchoChamp for Schools
          </h2>
          <p className="mt-4 text-secondary max-w-3xl mx-auto">
            EchoChamp is a structured school eco-drive where students collect scrap,
            participate in sustainability programs, and receive verified certificates.
          </p>
          <div className="mt-6 flex justify-center gap-6">
            <Link href="/ecochamp/school" className="text-accent font-medium">
              For Schools →
            </Link>
            <Link href="/ecochamp/student" className="text-accent font-medium">
              For Students →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

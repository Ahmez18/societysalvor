// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "@/lib/auth";
import { PrismaNeon } from "@prisma/adapter-neon";

// 🔐 PASTE YOUR FULL NEON CONNECTION STRING HERE
const connectionString =
  "postgresql://neondb_owner:npg_zmSB8sEun5oY@ep-purple-wildflower-a14cybej-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

if (!connectionString || connectionString.includes("FULL_PASSWORD")) {
  console.error("❌ ERROR: Paste your full Neon DATABASE_URL in seed.ts");
  process.exit(1);
}

console.log("🔌 Connecting to Neon database...");

// ✅ PASS CONNECTION STRING DIRECTLY
const adapter = new PrismaNeon({ connectionString });

const prisma = new PrismaClient({ adapter });

async function main() {
  const adminEmail = "admin@societysalvor.com";
  const adminPassword = "admin123"; // change later

  const hashed = await hashPassword(adminPassword);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: hashed,
      name: "Admin",
      phone: "9999999999",
      role: "ADMIN",
    },
  });

  console.log("✅ Admin account ready");
  console.log(`Email: ${admin.email}`);
  console.log(`Password: ${adminPassword}`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

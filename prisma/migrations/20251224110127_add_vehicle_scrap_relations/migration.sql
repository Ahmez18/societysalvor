-- CreateEnum
CREATE TYPE "VehicleStatus" AS ENUM ('SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'ASSIGNED', 'COMPLETED', 'REJECTED');

-- CreateTable
CREATE TABLE "vehicle_scraps" (
    "id" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "condition" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "notes" TEXT,
    "status" "VehicleStatus" NOT NULL DEFAULT 'SUBMITTED',
    "repId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vehicle_scraps_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "vehicle_scraps_publicId_key" ON "vehicle_scraps"("publicId");

-- AddForeignKey
ALTER TABLE "vehicle_scraps" ADD CONSTRAINT "vehicle_scraps_repId_fkey" FOREIGN KEY ("repId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

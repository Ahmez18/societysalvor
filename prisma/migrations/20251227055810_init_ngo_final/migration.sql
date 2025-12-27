/*
  Warnings:

  - You are about to drop the column `active` on the `ngos` table. All the data in the column will be lost.
  - Added the required column `registrationNumber` to the `ngos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `ngos` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `ngos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address` on table `ngos` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "NGOType" AS ENUM ('TRUST', 'SOCIETY', 'FOUNDATION', 'OTHER');

-- CreateEnum
CREATE TYPE "NGOStatus" AS ENUM ('PENDING', 'APPROVED', 'SUSPENDED', 'ARCHIVED');

-- AlterTable
ALTER TABLE "ngos" DROP COLUMN "active",
ADD COLUMN     "registrationNumber" TEXT NOT NULL,
ADD COLUMN     "status" "NGOStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "type" "NGOType" NOT NULL,
ADD COLUMN     "website" TEXT,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "address" SET NOT NULL;

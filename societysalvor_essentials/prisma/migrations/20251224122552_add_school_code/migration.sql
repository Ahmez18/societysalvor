/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `schools` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `schools` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "schools" ADD COLUMN     "code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "schools_code_key" ON "schools"("code");

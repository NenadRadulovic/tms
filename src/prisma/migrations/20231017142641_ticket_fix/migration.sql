-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_assigned_admin_id_fkey";

-- AlterTable
ALTER TABLE "Ticket" ALTER COLUMN "assigned_admin_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_assigned_admin_id_fkey" FOREIGN KEY ("assigned_admin_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

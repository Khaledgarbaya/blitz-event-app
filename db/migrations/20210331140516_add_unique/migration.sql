/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[attendeeId,eventId]` on the table `Rsvp`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Rsvp.attendeeId_eventId_unique" ON "Rsvp"("attendeeId", "eventId");

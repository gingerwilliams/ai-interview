-- CreateTable
CREATE TABLE "Chat" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "chat" TEXT[],

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Story" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "synopsis" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "coverUrl" TEXT,
    "isPremium" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Story_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoryScript" (
    "id" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "storyId" TEXT NOT NULL,

    CONSTRAINT "StoryScript_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StoryScript_storyId_key" ON "StoryScript"("storyId");

-- AddForeignKey
ALTER TABLE "StoryScript" ADD CONSTRAINT "StoryScript_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

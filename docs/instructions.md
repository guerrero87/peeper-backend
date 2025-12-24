Act as a Senior Backend Developer. I need you to scaffold a backend for a mobile application called "GhostWriter". The app delivers chat-fiction stories where users can see "ghost text" (text typed and deleted by characters).

1. Tech Stack Requirements:

Framework: NestJS (Node.js) with TypeScript.

Database: PostgreSQL.

ORM: Prisma.

Architecture: Follow strictly NestJS standards (Modules, Controllers, Services, DTOs).

2. Database Schema (Prisma): I need two main models to optimize performance (separating metadata from heavy content):

Story: Contains lightweight metadata (id [UUID], title, synopsis, genre, coverUrl, isPremium, publishedAt).

StoryScript: Contains the heavy content. It must have a one-to-one relationship with Story. It has a field content of type Json (Postgres JSONB).

3. Data Types (The JSON Contract): The content field in StoryScript MUST strictly adhere to these TypeScript interfaces. Please include these interfaces in the project:

// story.interfaces.ts

export type ParticipantId = string;

export interface StoryManifest {
  meta: {
    storyId: string;
    lastModified: string;
    defaultPovId: ParticipantId;
  };
  assets: {
    participants: Record<ParticipantId, Participant>;
  };
  timeline: StoryEvent[];
}

export interface Participant {
  name: string;
  avatarUrl?: string;
  color?: string;
  isMainCharacter?: boolean;
}

export type EventType = 'text' | 'image' | 'audio' | 'system';

export interface StoryEvent {
  id: string;
  type: EventType;
  senderId: ParticipantId;
  payload: {
    text?: string;
    ghostText?: string; // The deleted text (subtext)
    mediaUrl?: string;
    durationSecs?: number;
  };
  timing: {
    preDelay: number;
    typingDuration: number;
    pauseAfter: number;
  };
}

4. API Endpoints: Create a StoriesModule with the following endpoints:

GET /stories/feed: Returns a paginated list of Story (metadata only, NO script content).

GET /stories/:id/manifest: Returns the full JSON content (StoryManifest) from the StoryScript table for a specific ID.

POST /stories/seed: A dev-only endpoint to populate the DB with one dummy story using the structure above, so I can test it immediately.

5. Output: Please provide:

The schema.prisma file.

The story.interface.ts file.

The stories.service.ts (including the seeding logic).

The stories.controller.ts.

Focus on clean, production-ready code.
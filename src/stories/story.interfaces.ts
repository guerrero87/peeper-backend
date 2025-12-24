
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

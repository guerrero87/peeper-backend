
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StoryManifest, ParticipantId } from './story.interfaces'; // Fixed import to include ParticipantId

@Injectable()
export class StoriesService {
    constructor(private prisma: PrismaService) { }

    async getFeed() {
        return this.prisma.story.findMany({
            orderBy: { publishedAt: 'desc' },
        });
    }

    async getManifest(storyId: string) {
        const script = await this.prisma.storyScript.findUnique({
            where: { storyId },
        });

        if (!script) {
            throw new NotFoundException(`Story content not found for story ID ${storyId}`);
        }

        // Prisma returns JsonValue, we cast it to our interface
        return script.content as unknown as StoryManifest;
    }

    async seed() {
        const participant1Id = "user_1";
        const participant2Id = "user_2";

        const dummyManifest: StoryManifest = {
            meta: {
                storyId: "temp-id-will-be-replaced",
                lastModified: new Date().toISOString(),
                defaultPovId: participant1Id,
            },
            assets: {
                participants: {
                    [participant1Id]: {
                        name: "Alice",
                        avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
                        color: "#FF5733",
                        isMainCharacter: true,
                    },
                    [participant2Id]: {
                        name: "Bob",
                        avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
                        color: "#33FF57",
                    }
                }
            },
            timeline: [
                {
                    id: "evt_1",
                    type: "text",
                    senderId: participant1Id,
                    payload: {
                        text: "Hey, are you there?",
                    },
                    timing: {
                        preDelay: 0,
                        typingDuration: 1000,
                        pauseAfter: 500
                    }
                },
                {
                    id: "evt_2",
                    type: "text",
                    senderId: participant1Id,
                    payload: {
                        text: "I have something to tell you...",
                        ghostText: "I found the body.",
                    },
                    timing: {
                        preDelay: 500,
                        typingDuration: 2000,
                        pauseAfter: 1000
                    }
                },
                {
                    id: "evt_3",
                    type: "text",
                    senderId: participant2Id,
                    payload: {
                        text: "Yeah, what's up?",
                    },
                    timing: {
                        preDelay: 1000,
                        typingDuration: 800,
                        pauseAfter: 0
                    }
                }
            ]
        };

        // Create story transactionally
        const story = await this.prisma.story.create({
            data: {
                title: "The Ghost in the Machine",
                synopsis: "A thrilling chat mystery.",
                genre: "Mystery",
                coverUrl: "https://placehold.co/600x400",
                isPremium: false,
                script: {
                    create: {
                        content: dummyManifest as any, // Cast to any for Prisma Json input if strict
                    }
                }
            },
            include: {
                script: true
            }
        });

        return story;
    }
}

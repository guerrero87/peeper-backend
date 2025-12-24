
import { Controller, Get, Post, Param } from '@nestjs/common';
import { StoriesService } from './stories.service';

@Controller('stories')
export class StoriesController {
    constructor(private readonly storiesService: StoriesService) { }

    @Get('feed')
    getFeed() {
        return this.storiesService.getFeed();
    }

    @Get(':id/manifest')
    getManifest(@Param('id') id: string) {
        return this.storiesService.getManifest(id);
    }

    @Post('seed')
    seed() {
        return this.storiesService.seed();
    }
}

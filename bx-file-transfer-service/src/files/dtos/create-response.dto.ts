import { ApiProperty } from "@nestjs/swagger";

export class CreateResponseDto {
    @ApiProperty({ type: String })
    objectName: string;
    
    @ApiProperty({ type: String })
    uploadTopic: string;
}
import { ApiProperty } from "@nestjs/swagger";
import { FileEntity } from "../entities/file.entity";

export class FindOneResponseDto {
    @ApiProperty({ type: String })
    objName: string;
    
    @ApiProperty({ type: String })
    downloadTopic: string;
    
    @ApiProperty({ type: Number })
    chunksCount: number;
    
    @ApiProperty({ type: String })
    originalName: string;
    
    @ApiProperty({ type: Number })
    originalFileSize: number;
    
    @ApiProperty({ type: String })
    contentType: string;
}
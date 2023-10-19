import { ApiProperty } from "@nestjs/swagger";

export class CreateRequestDto {
    @ApiProperty({ type: String })
    fileName: string;
    
    @ApiProperty({ type: String })
    size: string;
    
    @ApiProperty({ type: String })
    contentType: string;
}

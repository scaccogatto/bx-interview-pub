import { ApiProperty } from "@nestjs/swagger";

export class StorageStartStreamResponseDto {
    @ApiProperty({ type: Boolean })
    sent: boolean;
}
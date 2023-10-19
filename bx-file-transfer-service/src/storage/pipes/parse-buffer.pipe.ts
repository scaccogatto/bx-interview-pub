import { Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class ParseBufferPipe implements PipeTransform {
    transform(value: any): Buffer {
        return Buffer.from(value.data)
    }
}
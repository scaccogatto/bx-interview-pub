import { Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class EqualOrLessPipe implements PipeTransform<number> {
    constructor(
        private readonly maxValue: number
    ) {}

    transform(value: number): boolean {
        return value <= this.maxValue
    }
}
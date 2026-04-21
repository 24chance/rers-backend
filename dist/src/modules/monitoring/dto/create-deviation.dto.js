"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDeviationDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateDeviationDto {
    deviationDate;
    description;
    impact;
    correctiveAction;
}
exports.CreateDeviationDto = CreateDeviationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Date of the protocol deviation', example: '2026-03-10' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateDeviationDto.prototype, "deviationDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Description of the deviation from protocol' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(10),
    __metadata("design:type", String)
], CreateDeviationDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Impact on participants or study integrity' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDeviationDto.prototype, "impact", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Corrective actions taken' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDeviationDto.prototype, "correctiveAction", void 0);
//# sourceMappingURL=create-deviation.dto.js.map
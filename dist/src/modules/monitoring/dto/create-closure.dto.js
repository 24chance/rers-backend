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
exports.CreateClosureDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateClosureDto {
    closureDate;
    description;
    totalEnrolled;
    findings;
}
exports.CreateClosureDto = CreateClosureDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Date the study was closed', example: '2026-04-01' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateClosureDto.prototype, "closureDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Description of the study closure' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(10),
    __metadata("design:type", String)
], CreateClosureDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Total number of participants enrolled', minimum: 0 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateClosureDto.prototype, "totalEnrolled", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Summary of study findings' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateClosureDto.prototype, "findings", void 0);
//# sourceMappingURL=create-closure.dto.js.map
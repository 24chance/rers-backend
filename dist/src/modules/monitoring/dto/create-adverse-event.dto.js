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
exports.CreateAdverseEventDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const enums_1 = require("../../../common/enums");
class CreateAdverseEventDto {
    eventDate;
    description;
    severity;
    affectedParticipants;
    actionTaken;
}
exports.CreateAdverseEventDto = CreateAdverseEventDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Date the adverse event occurred', example: '2026-03-15' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateAdverseEventDto.prototype, "eventDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Description of the adverse event' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(10),
    __metadata("design:type", String)
], CreateAdverseEventDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: enums_1.SeverityLevel, description: 'Severity of the adverse event' }),
    (0, class_validator_1.IsEnum)(enums_1.SeverityLevel),
    __metadata("design:type", String)
], CreateAdverseEventDto.prototype, "severity", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Number of affected participants', minimum: 0 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateAdverseEventDto.prototype, "affectedParticipants", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Actions taken in response to the event' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAdverseEventDto.prototype, "actionTaken", void 0);
//# sourceMappingURL=create-adverse-event.dto.js.map
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
exports.UpdateApplicationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const enums_1 = require("../../../common/enums");
class UpdateApplicationDto {
    title;
    type;
    tenantId;
    destinationId;
    principalInvestigator;
    coInvestigators;
    studyDuration;
    studyStartDate;
    studyEndDate;
    population;
    sampleSize;
    methodology;
    fundingSource;
    budget;
    ethicsStatement;
    consentDescription;
    formData;
}
exports.UpdateApplicationDto = UpdateApplicationDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Updated Study Title' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateApplicationDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: enums_1.ApplicationType,
        description: 'Updated application type',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.ApplicationType),
    __metadata("design:type", String)
], UpdateApplicationDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Updated IRB tenant UUID' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UpdateApplicationDto.prototype, "tenantId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'UUID of the destination institution' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UpdateApplicationDto.prototype, "destinationId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Dr. Updated Investigator' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateApplicationDto.prototype, "principalInvestigator", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: ['Dr. Co-Investigator 1'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], UpdateApplicationDto.prototype, "coInvestigators", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '18 months' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateApplicationDto.prototype, "studyDuration", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2025-03-01' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateApplicationDto.prototype, "studyStartDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2026-09-30' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateApplicationDto.prototype, "studyEndDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Urban adults aged 18-60' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateApplicationDto.prototype, "population", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 200 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], UpdateApplicationDto.prototype, "sampleSize", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Cross-sectional survey' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateApplicationDto.prototype, "methodology", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'WHO Grant' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateApplicationDto.prototype, "fundingSource", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 75000 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], UpdateApplicationDto.prototype, "budget", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateApplicationDto.prototype, "ethicsStatement", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateApplicationDto.prototype, "consentDescription", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Arbitrary form data as JSON object' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], UpdateApplicationDto.prototype, "formData", void 0);
//# sourceMappingURL=update-application.dto.js.map
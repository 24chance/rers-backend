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
exports.CreateApplicationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const enums_1 = require("../../../common/enums");
class CreateApplicationDto {
    title;
    type;
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
exports.CreateApplicationDto = CreateApplicationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Efficacy of Malaria Vaccine in Children Under 5' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateApplicationDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: enums_1.ApplicationType, example: enums_1.ApplicationType.FULL_BOARD }),
    (0, class_validator_1.IsEnum)(enums_1.ApplicationType),
    __metadata("design:type", String)
], CreateApplicationDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'UUID of the destination institution' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateApplicationDto.prototype, "destinationId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Dr. Jane Doe' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateApplicationDto.prototype, "principalInvestigator", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: ['Dr. John Smith', 'Dr. Alice Mwangi'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateApplicationDto.prototype, "coInvestigators", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '12 months' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateApplicationDto.prototype, "studyDuration", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2025-01-01' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateApplicationDto.prototype, "studyStartDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2025-12-31' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateApplicationDto.prototype, "studyEndDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Children aged 0-5 in rural Kenya' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateApplicationDto.prototype, "population", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 500 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateApplicationDto.prototype, "sampleSize", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Randomized Controlled Trial' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateApplicationDto.prototype, "methodology", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'NIH Grant No. XYZ123' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateApplicationDto.prototype, "fundingSource", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 150000 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateApplicationDto.prototype, "budget", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'This research upholds the principles of beneficence...' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateApplicationDto.prototype, "ethicsStatement", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Participants will be informed of their right to withdraw...' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateApplicationDto.prototype, "consentDescription", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Arbitrary form data as JSON object' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateApplicationDto.prototype, "formData", void 0);
//# sourceMappingURL=create-application.dto.js.map
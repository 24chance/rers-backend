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
exports.CreateDecisionDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const enums_1 = require("../../../common/enums");
class CreateDecisionDto {
    type;
    rationale;
    conditions;
}
exports.CreateDecisionDto = CreateDecisionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: enums_1.DecisionType, description: 'Type of decision' }),
    (0, class_validator_1.IsEnum)(enums_1.DecisionType),
    __metadata("design:type", String)
], CreateDecisionDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Rationale for the decision', minLength: 10 }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(10),
    __metadata("design:type", String)
], CreateDecisionDto.prototype, "rationale", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Conditions attached (for CONDITIONALLY_APPROVED)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDecisionDto.prototype, "conditions", void 0);
//# sourceMappingURL=create-decision.dto.js.map
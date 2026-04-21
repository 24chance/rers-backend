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
exports.SubmitReviewDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const enums_1 = require("../../../common/enums");
class SubmitReviewDto {
    comments;
    recommendation;
    conditions;
}
exports.SubmitReviewDto = SubmitReviewDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Review comments', minLength: 10 }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(10),
    __metadata("design:type", String)
], SubmitReviewDto.prototype, "comments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: enums_1.ReviewRecommendation,
        description: 'Reviewer recommendation',
    }),
    (0, class_validator_1.IsEnum)(enums_1.ReviewRecommendation),
    __metadata("design:type", String)
], SubmitReviewDto.prototype, "recommendation", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Conditions attached to the recommendation',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SubmitReviewDto.prototype, "conditions", void 0);
//# sourceMappingURL=submit-review.dto.js.map
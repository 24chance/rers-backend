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
exports.ScreenApplicationDto = exports.ScreeningAction = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
var ScreeningAction;
(function (ScreeningAction) {
    ScreeningAction["PASS"] = "PASS";
    ScreeningAction["RAISE_QUERY"] = "RAISE_QUERY";
    ScreeningAction["REQUEST_PAYMENT"] = "REQUEST_PAYMENT";
})(ScreeningAction || (exports.ScreeningAction = ScreeningAction = {}));
class ScreenApplicationDto {
    action;
    reason;
}
exports.ScreenApplicationDto = ScreenApplicationDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: ScreeningAction,
        description: 'PASS → UNDER_REVIEW, RAISE_QUERY → QUERY_RAISED, REQUEST_PAYMENT → PAYMENT_PENDING',
    }),
    (0, class_validator_1.IsEnum)(ScreeningAction),
    __metadata("design:type", String)
], ScreenApplicationDto.prototype, "action", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Optional reason or notes for this screening decision' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ScreenApplicationDto.prototype, "reason", void 0);
//# sourceMappingURL=screen-application.dto.js.map
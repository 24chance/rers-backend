"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationDocumentsModule = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const database_module_1 = require("../../common/database/database.module");
const application_documents_controller_1 = require("./application-documents.controller");
const application_documents_service_1 = require("./application-documents.service");
let ApplicationDocumentsModule = class ApplicationDocumentsModule {
};
exports.ApplicationDocumentsModule = ApplicationDocumentsModule;
exports.ApplicationDocumentsModule = ApplicationDocumentsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
            platform_express_1.MulterModule.register({
                dest: './uploads',
            }),
        ],
        controllers: [application_documents_controller_1.ApplicationDocumentsController],
        providers: [application_documents_service_1.ApplicationDocumentsService],
        exports: [application_documents_service_1.ApplicationDocumentsService],
    })
], ApplicationDocumentsModule);
//# sourceMappingURL=application-documents.module.js.map
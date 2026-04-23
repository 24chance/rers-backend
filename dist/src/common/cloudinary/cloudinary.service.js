"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryService = void 0;
const common_1 = require("@nestjs/common");
const stream_1 = require("stream");
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
let CloudinaryService = class CloudinaryService {
    async upload(buffer, options = {}) {
        const result = await new Promise((resolve, reject) => {
            const upload = cloudinary_1.v2.uploader.upload_stream({
                folder: options.folder ?? 'rers/documents',
                public_id: options.publicId,
                resource_type: options.resourceType ?? 'auto',
                use_filename: true,
                unique_filename: true,
                context: options.originalName
                    ? { original_name: options.originalName }
                    : undefined,
            }, (error, result) => {
                if (error || !result) {
                    reject(new common_1.InternalServerErrorException(error?.message ?? 'Cloudinary upload failed'));
                }
                else {
                    resolve(result);
                }
            });
            stream_1.Readable.from(buffer).pipe(upload);
        });
        return { url: result.secure_url, publicId: result.public_id };
    }
    async delete(publicId, resourceType = 'raw') {
        await cloudinary_1.v2.uploader.destroy(publicId, { resource_type: resourceType });
    }
};
exports.CloudinaryService = CloudinaryService;
exports.CloudinaryService = CloudinaryService = __decorate([
    (0, common_1.Injectable)()
], CloudinaryService);
//# sourceMappingURL=cloudinary.service.js.map
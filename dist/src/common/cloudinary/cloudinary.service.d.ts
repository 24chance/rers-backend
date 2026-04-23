export declare class CloudinaryService {
    upload(buffer: Buffer, options?: {
        folder?: string;
        publicId?: string;
        resourceType?: 'image' | 'video' | 'raw' | 'auto';
        originalName?: string;
    }): Promise<{
        url: string;
        publicId: string;
    }>;
    delete(publicId: string, resourceType?: 'image' | 'video' | 'raw'): Promise<void>;
}

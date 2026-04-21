import { RegistryService } from './registry.service';
export declare class RegistryController {
    private readonly registryService;
    constructor(registryService: RegistryService);
    findAll(page?: string, pageSize?: string, type?: string, search?: string): Promise<{
        data: {
            id: any;
            referenceNumber: any;
            title: any;
            type: any;
            institution: any;
            approvedDate: any;
            expiresAt: any;
            certificateNumber: any;
        }[];
        meta: {
            total: number;
            page: number;
            pageSize: number;
            totalPages: number;
        };
    }>;
    verifyCertificate(token: string): Promise<{
        valid: boolean;
        certificate: {
            certificateNumber: any;
            issuedAt: any;
            expiresAt: any;
        };
        application: {
            referenceNumber: any;
            title: any;
            type: any;
            institution: any;
            principalInvestigator: string;
        };
        decision: {
            type: any;
            issuedAt: any;
        };
    }>;
    findOne(id: string): Promise<{
        id: any;
        referenceNumber: any;
        title: any;
        type: any;
        principalInvestigator: any;
        methodology: any;
        studyDuration: any;
        studyStartDate: any;
        studyEndDate: any;
        institution: any;
        approvedDate: any;
        expiresAt: any;
        certificateNumber: any;
        verificationToken: any;
    }>;
}

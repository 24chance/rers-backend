import { DatabaseService } from '../../common/database/database.service';
import { CertificatesService } from '../certificates/certificates.service';
export declare class RegistryService {
    private readonly database;
    private readonly certificatesService;
    constructor(database: DatabaseService, certificatesService: CertificatesService);
    findAll(filters?: {
        page?: string;
        pageSize?: string;
        type?: string;
        search?: string;
    }): Promise<{
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
}

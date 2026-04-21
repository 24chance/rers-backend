import { DatabaseService } from '../../common/database/database.service';
export declare class CertificatesService {
    private readonly database;
    constructor(database: DatabaseService);
    generate(applicationId: string, decisionId: string): Promise<any>;
    findByApplication(applicationId: string): Promise<any>;
    verify(token: string): Promise<{
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
    download(applicationId: string, userId: string): Promise<{
        certificateNumber: any;
        pdfPath: any;
        issuedAt: any;
        expiresAt: any;
        verificationToken: any;
    }>;
    private generateCertificateNumber;
}

import type { JwtPayload } from '../../common/decorators/current-user.decorator';
import { CertificatesService } from './certificates.service';
export declare class CertificatesController {
    private readonly certificatesService;
    constructor(certificatesService: CertificatesService);
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
    download(applicationId: string, user: JwtPayload): Promise<{
        certificateNumber: any;
        pdfPath: any;
        issuedAt: any;
        expiresAt: any;
        verificationToken: any;
    }>;
}

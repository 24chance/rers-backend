export declare class TenantAdminDto {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
}
export declare class CreateTenantDto {
    name: string;
    code: string;
    type: string;
    logoUrl?: string;
    address?: string;
    phone?: string;
    email?: string;
    isActive?: boolean;
    settings?: Record<string, unknown>;
    admin: TenantAdminDto;
}

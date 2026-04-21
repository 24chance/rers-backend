export declare enum ScreeningAction {
    PASS = "PASS",
    RAISE_QUERY = "RAISE_QUERY",
    REQUEST_PAYMENT = "REQUEST_PAYMENT"
}
export declare class ScreenApplicationDto {
    action: ScreeningAction;
    reason?: string;
}

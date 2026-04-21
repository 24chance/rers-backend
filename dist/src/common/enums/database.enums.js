"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeverityLevel = exports.MonitoringStatus = exports.NotificationType = exports.MonitoringType = exports.PaymentStatus = exports.DocumentType = exports.DecisionType = exports.ReviewRecommendation = exports.ApplicationType = exports.ApplicationStatus = void 0;
var ApplicationStatus;
(function (ApplicationStatus) {
    ApplicationStatus["DRAFT"] = "DRAFT";
    ApplicationStatus["SUBMITTED"] = "SUBMITTED";
    ApplicationStatus["SCREENING"] = "SCREENING";
    ApplicationStatus["PAYMENT_PENDING"] = "PAYMENT_PENDING";
    ApplicationStatus["PAYMENT_VERIFIED"] = "PAYMENT_VERIFIED";
    ApplicationStatus["UNDER_REVIEW"] = "UNDER_REVIEW";
    ApplicationStatus["QUERY_RAISED"] = "QUERY_RAISED";
    ApplicationStatus["RESPONSE_RECEIVED"] = "RESPONSE_RECEIVED";
    ApplicationStatus["DECISION_PENDING"] = "DECISION_PENDING";
    ApplicationStatus["APPROVED"] = "APPROVED";
    ApplicationStatus["CONDITIONALLY_APPROVED"] = "CONDITIONALLY_APPROVED";
    ApplicationStatus["REJECTED"] = "REJECTED";
    ApplicationStatus["AMENDMENT_PENDING"] = "AMENDMENT_PENDING";
    ApplicationStatus["MONITORING_ACTIVE"] = "MONITORING_ACTIVE";
    ApplicationStatus["CLOSED"] = "CLOSED";
})(ApplicationStatus || (exports.ApplicationStatus = ApplicationStatus = {}));
var ApplicationType;
(function (ApplicationType) {
    ApplicationType["FULL_BOARD"] = "FULL_BOARD";
    ApplicationType["EXPEDITED"] = "EXPEDITED";
    ApplicationType["EXEMPT"] = "EXEMPT";
})(ApplicationType || (exports.ApplicationType = ApplicationType = {}));
var ReviewRecommendation;
(function (ReviewRecommendation) {
    ReviewRecommendation["APPROVE"] = "APPROVE";
    ReviewRecommendation["APPROVE_WITH_CONDITIONS"] = "APPROVE_WITH_CONDITIONS";
    ReviewRecommendation["REJECT"] = "REJECT";
    ReviewRecommendation["DEFER"] = "DEFER";
    ReviewRecommendation["ABSTAIN"] = "ABSTAIN";
})(ReviewRecommendation || (exports.ReviewRecommendation = ReviewRecommendation = {}));
var DecisionType;
(function (DecisionType) {
    DecisionType["APPROVED"] = "APPROVED";
    DecisionType["CONDITIONALLY_APPROVED"] = "CONDITIONALLY_APPROVED";
    DecisionType["REJECTED"] = "REJECTED";
    DecisionType["DEFERRED"] = "DEFERRED";
})(DecisionType || (exports.DecisionType = DecisionType = {}));
var DocumentType;
(function (DocumentType) {
    DocumentType["PROTOCOL"] = "PROTOCOL";
    DocumentType["CONSENT_FORM"] = "CONSENT_FORM";
    DocumentType["QUESTIONNAIRE"] = "QUESTIONNAIRE";
    DocumentType["BUDGET"] = "BUDGET";
    DocumentType["CV"] = "CV";
    DocumentType["ETHICS_APPROVAL"] = "ETHICS_APPROVAL";
    DocumentType["SUPPORTING_DOCUMENT"] = "SUPPORTING_DOCUMENT";
    DocumentType["AMENDMENT_DOCUMENT"] = "AMENDMENT_DOCUMENT";
    DocumentType["RENEWAL_DOCUMENT"] = "RENEWAL_DOCUMENT";
    DocumentType["PROGRESS_REPORT_DOCUMENT"] = "PROGRESS_REPORT_DOCUMENT";
    DocumentType["AE_REPORT_DOCUMENT"] = "AE_REPORT_DOCUMENT";
    DocumentType["DEVIATION_DOCUMENT"] = "DEVIATION_DOCUMENT";
    DocumentType["CLOSURE_DOCUMENT"] = "CLOSURE_DOCUMENT";
    DocumentType["OTHER"] = "OTHER";
})(DocumentType || (exports.DocumentType = DocumentType = {}));
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["PENDING"] = "PENDING";
    PaymentStatus["VERIFIED"] = "VERIFIED";
    PaymentStatus["REJECTED"] = "REJECTED";
    PaymentStatus["REFUNDED"] = "REFUNDED";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
var MonitoringType;
(function (MonitoringType) {
    MonitoringType["AMENDMENT"] = "AMENDMENT";
    MonitoringType["RENEWAL"] = "RENEWAL";
    MonitoringType["PROGRESS_REPORT"] = "PROGRESS_REPORT";
    MonitoringType["ADVERSE_EVENT"] = "ADVERSE_EVENT";
    MonitoringType["PROTOCOL_DEVIATION"] = "PROTOCOL_DEVIATION";
    MonitoringType["CLOSURE_REPORT"] = "CLOSURE_REPORT";
})(MonitoringType || (exports.MonitoringType = MonitoringType = {}));
var NotificationType;
(function (NotificationType) {
    NotificationType["APPLICATION_SUBMITTED"] = "APPLICATION_SUBMITTED";
    NotificationType["QUERY_RAISED"] = "QUERY_RAISED";
    NotificationType["QUERY_RESPONSE"] = "QUERY_RESPONSE";
    NotificationType["PAYMENT_PENDING"] = "PAYMENT_PENDING";
    NotificationType["PAYMENT_VERIFIED"] = "PAYMENT_VERIFIED";
    NotificationType["REVIEWER_ASSIGNED"] = "REVIEWER_ASSIGNED";
    NotificationType["DECISION_ISSUED"] = "DECISION_ISSUED";
    NotificationType["CERTIFICATE_AVAILABLE"] = "CERTIFICATE_AVAILABLE";
    NotificationType["MONITORING_REMINDER"] = "MONITORING_REMINDER";
    NotificationType["GENERAL"] = "GENERAL";
})(NotificationType || (exports.NotificationType = NotificationType = {}));
var MonitoringStatus;
(function (MonitoringStatus) {
    MonitoringStatus["DRAFT"] = "DRAFT";
    MonitoringStatus["SUBMITTED"] = "SUBMITTED";
    MonitoringStatus["UNDER_REVIEW"] = "UNDER_REVIEW";
    MonitoringStatus["APPROVED"] = "APPROVED";
    MonitoringStatus["REJECTED"] = "REJECTED";
})(MonitoringStatus || (exports.MonitoringStatus = MonitoringStatus = {}));
var SeverityLevel;
(function (SeverityLevel) {
    SeverityLevel["MILD"] = "MILD";
    SeverityLevel["MODERATE"] = "MODERATE";
    SeverityLevel["SEVERE"] = "SEVERE";
    SeverityLevel["LIFE_THREATENING"] = "LIFE_THREATENING";
    SeverityLevel["FATAL"] = "FATAL";
})(SeverityLevel || (exports.SeverityLevel = SeverityLevel = {}));
//# sourceMappingURL=database.enums.js.map
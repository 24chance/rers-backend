import { WorkflowsService } from './workflows.service';
export declare class WorkflowsController {
    private readonly workflowsService;
    constructor(workflowsService: WorkflowsService);
    getTimeline(id: string): Promise<{
        application: any;
        timeline: any[];
    }>;
}

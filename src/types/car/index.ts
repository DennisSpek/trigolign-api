export interface CarType {
    id: string;
    model: string;
    registration: string;
    suspension: {
        id?: string;
        frontaxle: string;
        rearaxle: string;
        toe_unit: string;
        conversion_factor_front: number;
        conversion_factor_rear: number;
        wheel_alignment_id?: string;
        wheel_alignment_description?: string;
    };
    branch: string;
    user: string;
    manufacturer: string;
    custom: string;
    mid: string;
}
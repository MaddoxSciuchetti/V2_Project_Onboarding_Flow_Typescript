export interface FullNameField {
    full_name: string;
}

export interface AadhaarInfo {
    aadhaar_last_four: string;
}

export interface SchoolDetails {
    school_name: string; 
    udise_code: string; 
    academic_year_start: string;
    academic_year_end: string;
}

export interface AdressInfo {
    adress_line_ : string;
    adress_line_2?: string;
    village_city: string;
    brc: string;
    crc?: string;
    pin_code: string;
    
}

export type SchoolForm = FullNameField &
    AadhaarInfo & 
    SchoolDetails &
    AdressInfo;
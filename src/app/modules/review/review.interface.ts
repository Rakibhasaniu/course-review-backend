import { Types } from "mongoose";

export type TReview = { 
        id: Types.ObjectId;  
        rating: number;    
        review: string;  
}
import { Comment } from "src/types/interfaces";
import ResponseDto from "../response.dto";


export default interface GetCommentResonseDto extends ResponseDto {
  
  comments: Comment[];
}
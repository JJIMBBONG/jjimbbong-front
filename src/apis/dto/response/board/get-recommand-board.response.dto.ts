import { ResponseDto } from 'src/apis/dto/response';
import { RecommandBoard } from 'src/types/interfaces';

export default interface getRecommandBoardResponseDto extends ResponseDto {
    recommandBoards : RecommandBoard[];
}
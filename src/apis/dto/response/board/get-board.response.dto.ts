import { ResponseDto } from 'src/apis/dto/response';

// interface: get diary response body DTO //
export default interface GetBoardResponseDto extends ResponseDto {
    writeDate: string;
    title: string;
    content: string;
    writerId: string;
    writerNickname : string;
}
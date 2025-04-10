import { ResponseDto } from "./dto/response";
import axios, { AxiosError, AxiosResponse } from 'axios';
import GetBoardResponseDto from "./dto/response/board/get-board.response.dto";

// variable: URL 상수 //
const API_DOMAIN = process.env.REACT_APP_API_DOMAIN;

const AUTH_MODULE_URL = `${API_DOMAIN}/api/v1/auth`;

const ID_CHECK_URL = `${AUTH_MODULE_URL}/id-check`;
const SIGN_UP_URL = `${AUTH_MODULE_URL}/sign-up`;
const SIGN_IN_URL = `${AUTH_MODULE_URL}/sign-in`;

const BOARD_MODULE_URL = `${API_DOMAIN}/api/v1/board`;
const GET_FILLTERD_BOARD_URL = `${BOARD_MODULE_URL}`;
const POST_BOARD_URL = `${BOARD_MODULE_URL}`;


// function: Authorization Bearer 헤더 //
const bearerAuthorization = (accessToken: string) => ({ headers: { 'Authorization': `Bearer ${accessToken}` } })

// function: response 성공 처리 함수 //
const responseSuccessHandler = <T = ResponseDto>(response: AxiosResponse<T>) => {
    // response.data: Response Body
    const { data } = response;
    return data;
};

// function: response 실패 처리 함수 //
const responseErrorHandler = (error: AxiosError<ResponseDto>) => {
    if (!error.response) return null;
    const { data } = error.response;
    return data;
};

// function: get fillterd board API 요청 함수 //
export const getFillterdBoardRequest = async (areaCategoryCode?: number | null, detailCategory?: string) => {
    const responseBody = await axios.get(GET_FILLTERD_BOARD_URL, {
        params: { areaCategoryCode, detailCategory },
    })
        .then(responseSuccessHandler<GetBoardResponseDto>)
        .catch(responseErrorHandler)
    return responseBody;
};



export {}
import { ResponseDto } from "./dto/response";
import axios, { AxiosError, AxiosResponse } from 'axios';
import GetBoardResponseDto from "./dto/response/board/get-board.response.dto";
import { PasswordReCheckRequestDto } from "./dto/request/mypage";
import { GetMyPageBoardResponseDto } from "./dto/response/mypage";

// variable: URL 상수 //
const API_DOMAIN = process.env.REACT_APP_API_DOMAIN;

const AUTH_MODULE_URL = `${API_DOMAIN}/api/v1/auth`;

const ID_CHECK_URL = `${AUTH_MODULE_URL}/id-check`;
const SIGN_UP_URL = `${AUTH_MODULE_URL}/sign-up`;
const SIGN_IN_URL = `${AUTH_MODULE_URL}/sign-in`;

const BOARD_MODULE_URL = `${API_DOMAIN}/api/v1/board`;
const GET_FILLTERD_BOARD_URL = `${BOARD_MODULE_URL}`;
const POST_BOARD_URL = `${BOARD_MODULE_URL}`;

const MAIN_MODULE_URL = `${API_DOMAIN}/api/v1/main`;
const GET_RECOMMAND_BOARD_URL = `${MAIN_MODULE_URL}`;

const MY_PAGE_MODULE_URL = `${API_DOMAIN}/api/v1/my-page`;
const PASSWORD_RECHECK_URL = `${MY_PAGE_MODULE_URL}`;
const GET_MY_PAGE_BOARD_URL = `${MY_PAGE_MODULE_URL}/my-main`;

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

// function : get recommand board API 요청 함수 //
export const getRecommandBoardRequest = async () => {
    const responseBody = await axios.get(GET_RECOMMAND_BOARD_URL)
        .then(responseSuccessHandler<GetBoardResponseDto>)
        .catch(responseErrorHandler)
    return responseBody;
}

// function: password recheck API 요청 함수 //
export const passwordReCheckRequest = async (requestBody: PasswordReCheckRequestDto) => {
    const responseBody = await axios.post(PASSWORD_RECHECK_URL, requestBody)
        .then(responseSuccessHandler)
        .catch(responseErrorHandler);
    return responseBody;
};

// function: get my page board API 요청 함수 //
// export const getMyPageBoardRequest = async (accessToken: string) => {
//     const responseBody = await axios.get(GET_MY_PAGE_BOARD_URL, bearerAuthorization(accessToken))
//         .then(responseSuccessHandler<GetMyPageBoardResponseDto>)
//         .catch(responseErrorHandler);
//     return responseBody;
// };

export {}
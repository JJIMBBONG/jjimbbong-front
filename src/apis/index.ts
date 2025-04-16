import { ResponseDto } from './dto/response';
import axios, { AxiosError, AxiosResponse } from 'axios';
import GetBoardResponseDto from './dto/response/board/get-board.response.dto';
import { PasswordReCheckRequestDto, PatchSignInUserRequestDto } from './dto/request/mypage';
import { GetMyPageBoardResponseDto } from './dto/response/mypage';
import GetSignInUserResponseDto from './dto/response/mypage/get-sign.in.user.response.dto';

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
const GET_SIGN_IN_USER_URL = `${MY_PAGE_MODULE_URL}/my-main`
const PATCH_SIGN_IN_USER_URL = `${MY_PAGE_MODULE_URL}/my-main`

const FILE_UPLOAD_URL = `${API_DOMAIN}/file/upload`;

// variable: //
const multipartFormData = { headers: { 'Content-Type': 'multipart/form-data' } };


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

// function : get my page board API 요청 함수 //
// export const getMyPageBoardRequest = async (accessToken: string) => {
//     const responseBody = await axios.get(GET_MY_PAGE_BOARD_URL, bearerAuthorization(accessToken))
//         .then(responseSuccessHandler<GetMyPageBoardResponseDto>)
//         .catch(responseErrorHandler);
//     return responseBody;
// };

// function: get sign in user API 요청 함수 //
export const getSignInUserRequest = (accessToken: string) => {
    const responseBody = axios.get(GET_SIGN_IN_USER_URL, bearerAuthorization(accessToken))
        .then(responseSuccessHandler<GetSignInUserResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function: patch user API 요청 함수 //
export const patchSignInUserRequest = async (requestBody: PatchSignInUserRequestDto, accessToken: string) => {
    const responseBody = await axios.patch(PATCH_SIGN_IN_USER_URL, requestBody, bearerAuthorization(accessToken))
        .then(responseSuccessHandler)
        .catch(responseErrorHandler);
    return responseBody;
};

// function: file upload 요청 함수 //
export const filerUploadRequest = async (requestBody: FormData) => {
    const responseBody = await axios.post(FILE_UPLOAD_URL, requestBody, multipartFormData)
        .then(responseSuccessHandler<string>)
        .catch(error => null);
    return responseBody;
};
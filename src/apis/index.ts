import { ResponseDto } from "./dto/response";
import axios, { AxiosError, AxiosResponse } from 'axios';
import GetBoardResponseDto from "./dto/response/board/get-board.response.dto";
import { PasswordReCheckRequestDto } from "./dto/request/mypage";
import { GetMyPageBoardResponseDto } from "./dto/response/mypage";
import { EmailAuthCheckRequestDto, EmailAuthRequestDto, IdCheckRequestDto, IdSearchRequestDto, NicknameCheckRequestDto, PasswordResetRequestDto, SignInRequestDto, SignUpRequestDto } from "./dto/request/auth";
import { SignInResponseDto } from "./dto/response/auth";

// variable: URL 상수 //
const API_DOMAIN = process.env.REACT_APP_API_DOMAIN;

const AUTH_MODULE_URL = `${API_DOMAIN}/api/v1/auth`;
const EMAIL_AUTH_URL = `${AUTH_MODULE_URL}/email-auth`;
const EMAIL_AUTH_CHECK_URL = `${AUTH_MODULE_URL}/email-authcheck`;
const ID_CHECK_URL = `${AUTH_MODULE_URL}/id-check`;
const ID_SEARCH_URL = `${AUTH_MODULE_URL}/id-search`;
const NICKNAME_CHECK_URL = `${AUTH_MODULE_URL}/nickname-check`;
const PASSWORD_RESET_URL = `${AUTH_MODULE_URL}/password-reset`;
const SIGN_UP_URL = `${AUTH_MODULE_URL}/sign-up`;
const SIGN_IN_URL = `${AUTH_MODULE_URL}/sign-in`;
export const SNS_SIGN_IN_URL = (sns: 'kakao' | 'naver') => `${AUTH_MODULE_URL}/sns/${sns}`;

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

// function: email auth API 요청 함수 //
export const EmailAuthRequest = async (requestBody: EmailAuthRequestDto) => {
    const responseBody = await axios.post(EMAIL_AUTH_URL, requestBody)
      .then(responseSuccessHandler)
      .catch(responseErrorHandler);
    return responseBody;
};

// function: email auth check API 요청 함수 //
export const EmailAuthCheckRequest = async (requestBody: EmailAuthCheckRequestDto) => {
    const responseBody = await axios.post(EMAIL_AUTH_CHECK_URL, requestBody)
      .then(responseSuccessHandler)
      .catch(responseErrorHandler);
    return responseBody;
};

// function: id check API 요청 함수 //
export const idCheckRequest = async (requestBody: IdCheckRequestDto) => {
    const responseBody = await axios.post(ID_CHECK_URL, requestBody)
      .then(responseSuccessHandler)
      .catch(responseErrorHandler);
    return responseBody;
};

// function: id search API 요청 함수 //
export const IdSearchRequest = async (requestBody: IdSearchRequestDto) => {
    const responseBody = await axios.post(ID_SEARCH_URL, requestBody)
      .then(responseSuccessHandler)
      .catch(responseErrorHandler);
    return responseBody;
};

// function: nickname check API 요청 함수 //
export const nicknameCheckRequest = async (requestBody: NicknameCheckRequestDto) => {
    const responseBody = await axios.post(NICKNAME_CHECK_URL, requestBody)
      .then(responseSuccessHandler)
      .catch(responseErrorHandler);
    return responseBody;
};

// function: password reset API 요청 함수 //
export const PasswordResetRequest = async (requestBody: PasswordResetRequestDto) => {
    const responseBody = await axios.post(PASSWORD_RESET_URL, requestBody)
      .then(responseSuccessHandler)
      .catch(responseErrorHandler);
    return responseBody;
};
  
// function: sign up API 요청 함수 //
export const signUpRequest = async (requestBody: SignUpRequestDto) => {
    const responseBody = await axios.post(SIGN_UP_URL, requestBody)
      .then(responseSuccessHandler)
      .catch(responseErrorHandler);
    return responseBody;
};
  
// function: sign in API 요청 함수 //
export const signInRequest = async (requestBody: SignInRequestDto) => {
    const responseBody = await axios.post(SIGN_IN_URL, requestBody)
      .then(responseSuccessHandler<SignInResponseDto>)
      .catch(responseErrorHandler);
    return responseBody;
};
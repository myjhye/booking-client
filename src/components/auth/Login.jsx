import { useEffect, useState } from "react"
import { loginUser } from "../utils/ApiFunctions"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "./AuthProvider"

/*
    로그인 컴포넌트
    - 사용자의 이메일과 비밀번호를 입력받아 로그인 처리
    - 로그인 성공 시 토큰을 받아 저장하고 지정된 경로로 리다이렉트
*/
export default function Login() {

    const [errorMessage, setErrorMessage] = useState("")
    // 로그인 폼 데이터
    const [login, setLogin] = useState({
        email: "",
        password: "",
    })

    const location = useLocation()
    const message = location.state && location.state.message

    const navigate = useNavigate()
    // 인증 컨텍스트
    const auth = useAuth()
    // '이전 경로' 또는  '/'로 이동
    const redirectUrl = location.state?.path || "/"

    // 회원가입 완료 알림 표시
    const [showNotification, setShowNotification] = useState(!!message);
    
    useEffect(() => {
        if (showNotification) {
            const timer = setTimeout(() => {
                setShowNotification(false);
            }, 5000); // 5초 후 사라짐

            return () => clearTimeout(timer);
        }
    }, [message])



    // 입력 필드 변경 함수
    const handleInputChange = (e) => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value
        })
    }


    // 로그인 폼 제출 함수
    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrorMessage("")

        try {
            // 로그인 API (토큰 얻기)
            const response = await loginUser(login)

            // 응답에 토큰이 있는지 확인
            if (response && response.token) {
                // 서버에서 받은 토큰
                const token = response.token
                // 로그인 처리
                auth.handleLogin(token)
                
                // 로그인 성공 시 지정된 경로로 이동
                navigate(redirectUrl, {
                    // 뒤로가기 시 로그인 페이지로 돌아오지 않게 함
                    replace: true,
                    state: { 
                        message: `${login.email}님 환영합니다!`
                    }
                })
            }
            // 토큰이 없는 경우 에러
            else {
                setErrorMessage("로그인에 실패했습니다.")
            }

        }
        // 로그인 API 호출 중 에러
        catch (error) {
            setErrorMessage(error.message)
        }
    }


    return (
        <div className="bg-gray-50 flex flex-col justify-center py-8">
            <div className={`
                fixed top-4 left-1/2 -translate-x-1/2 z-50 
                transition-all duration-500 ease-in-out
                ${showNotification ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
            `}>
            {message && (
                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-lg">
                    {message}
                </div>
            )}
            </div>

            
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="text-center text-3xl font-extrabold text-gray-900">
                    로그인
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    {errorMessage && (
                        <div className="mb-4 p-4 rounded-md bg-red-50 border border-red-200">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-red-700">{errorMessage}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                이메일
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={login.email}
                                    onChange={handleInputChange}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                비밀번호
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={login.password}
                                    onChange={handleInputChange}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                로그인
                            </button>
                        </div>

                        <div className="text-sm text-center">
                            <span className="text-gray-500">
                                계정이 없으신가요?{' '}
                                <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
                                    회원가입
                                </Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
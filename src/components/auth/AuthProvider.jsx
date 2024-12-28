import { createContext, useContext, useState } from "react"
import { jwtDecode } from "jwt-decode"

// 컨텍스트 생성 (초기화도 함께)
export const AuthContext = createContext({
    user: null,
    handleLogin: (token) => {},
    handleLogout: () => {}
})

// 인증 관련 컨텍스트
export const AuthProvider = ({ children }) => {

    // 현재 로그인한 사용자 정보
    const [user, setUser] = useState(null)

    // 로그인 처리
    const handleLogin = (token) => {
        try {
            // 1. JWT 토큰을 해석하여 사용자 정보 추출 (jwtDecode 함수 사용하여 )
            const decodedUser = jwtDecode(token) 
            
            // 2. 사용자 정보를 localStorage에 저장 (새로고침 해도 로그인 유지)
            localStorage.setItem("userEmail", decodedUser.sub) // 사용자 ID
            localStorage.setItem("userRole", decodedUser.roles) // 사용자 권한
            localStorage.setItem("token", token) // 원본 토큰

            // 3. 사용자 정보를 전역 상태에 저장 (다른 컴포넌트에서 로그인 상태 확인 가능)
            setUser(decodedUser)
        } catch (error) {
            console.error("Login error:", error)
        }
    }

    // 로그아웃 처리
    const handleLogout = () => {
        // localStorage에서 모든 인증 관련 정보 제거
        localStorage.removeItem("userId")
        localStorage.removeItem("userEmail")
        localStorage.removeItem("userRole")
        localStorage.removeItem("token")
        setUser(null)
    }

    return (
        // 하위 컴포넌트에 제공
        <AuthContext.Provider
            value={{ user, handleLogin, handleLogout }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}
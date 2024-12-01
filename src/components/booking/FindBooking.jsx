// 내 예약 확인하기
// 예약 코드로 해당 객실 정보 조회하는 화면

import { useState } from "react"
import { cancelBooking, getBookingByConfirmationCode } from "../utils/ApiFunctions"
import moment from "moment"
import Header from "../common/Header"

export default function FindBooking() {

    // 사용자가 입력한 예약 확인 코드
    const [confirmationCode, setConfirmationCode] = useState("")
    const [error, setError] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    
    // 입력한 예약 확인 코드에 따른 예약 정보
    const [bookingInfo, setBookingInfo] = useState({
        id: "",
        bookingConfirmationCode: "",
        room: { 
            id: "", 
            roomType: "" 
        },
        roomNumber: "",
        checkInDate: "",
        checkOutDate: "",
        guestName: "",
        guestEmail: "",
        numOfAdults: "",
        numOfChildren: "",
        totalNumOfGuests: ""
    })

    // 예약 정보 초기화에 사용하는 빈 객체
    const emptyBookingInfo = {
        id: "",
        bookingConfirmationCode: "",
        room: { 
            id: "", 
            roomType: "" 
        },
        roomNumber: "",
        checkInDate: "",
        checkOutDate: "",
        guestName: "",
        guestEmail: "",
        numOfAdults: "",
        numOfChildren: "",
        totalNumOfGuests: ""
    }

    // 예약 취소 상태
    const [isDeleted, setIsDeleted] = useState(false)


    // ===== 이벤트 핸들러 =====
    const handleInputChange = (e) => {
        setConfirmationCode(e.target.value)
    }

    // 예약 조회 폼 제출 함수
    const handleFormSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            // 예약 조회 API
            const data = await getBookingByConfirmationCode(confirmationCode)
            setBookingInfo(data)
        }
        catch (error) {
            setBookingInfo(emptyBookingInfo)

            if (error.response && error.response.status === 404) {
                setError(error.response.data.message || "예약 조회 에러")
            }
            else {
                setError("숙박 일정이 없습니다")
            }
        }

        setTimeout(() => {
            setIsLoading(false)
        }, 2000)
    }


    // 예약 취소 함수
    const handleBookingCancellation = async (bookingId) => {
        try {
            // 예약 취소 API
            await cancelBooking(bookingInfo.id)
            setIsDeleted(true)
            setSuccessMessage("예약이 성공적으로 취소되었습니다!")
            setBookingInfo(emptyBookingInfo)
            setConfirmationCode("")
            setError("")
        }
        catch (error) {
            setError(error.message)
        }
        setTimeout(() => {
            setIsDeleted(false)
        }, 2000)
    }

    return (
        <div className="container min-h-screen bg-gray-50">
            <Header title={"내 예약 확인하기"} />
            
            <div className="max-w-2xl mx-auto px-4 py-8">
                <div className="bg-white p-6 rounded-xl shadow-md mb-8">
                    <form onSubmit={handleFormSubmit}>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <input
                                className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                id="confirmationCode"
                                name="confirmationCode"
                                value={confirmationCode}
                                onChange={handleInputChange}
                                placeholder="예약 확인 코드를 입력해주세요"
                            />
                            <button 
                                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                disabled={isLoading}
                            >
                                {isLoading ? "조회 중..." : "예약 조회"}
                            </button>
                        </div>
                    </form>
                </div>

                {/* 조건부 렌더링 */}
                {isLoading ? ( // 1. 로딩 중일 때
                    <div className="text-center p-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">예약 정보를 찾는 중입니다...</p>
                    </div>
                ) : error ? ( // 2. 에러가 있을 때
                    <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg">{error}</div>
                ) : bookingInfo.bookingConfirmationCode ? ( // 3. 예약 정보가 있을 때
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="border-b border-gray-100 p-6">
                            <h3 className="text-2xl font-bold text-gray-800">예약 정보</h3>
                            <p className="text-gray-500 mt-1">예약하신 내용을 확인해주세요</p>
                        </div>
                        
                        <div className="p-6 space-y-4">
                            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                                <p className="text-blue-800 font-medium">예약 번호: {bookingInfo.bookingConfirmationCode}</p>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-3">
                                    <p className="text-gray-700">
                                        <span className="text-gray-500 block text-sm">객실 번호</span>
                                        {bookingInfo.room.id}
                                    </p>
                                    <p className="text-gray-700">
                                        <span className="text-gray-500 block text-sm">객실 타입</span>
                                        {bookingInfo.room.roomType}
                                    </p>
                                    <p className="text-gray-700">
                                        <span className="text-gray-500 block text-sm">체크인</span>
                                        {moment(bookingInfo.checkInDate).subtract(1, "month").format("YYYY년 MM월 DD일")}
                                    </p>
                                    <p className="text-gray-700">
                                        <span className="text-gray-500 block text-sm">체크아웃</span>
                                        {moment(bookingInfo.checkOutDate).subtract(1, "month").format("YYYY년 MM월 DD일")}
                                    </p>
                                </div>
                                
                                <div className="space-y-3">
                                    <p className="text-gray-700">
                                        <span className="text-gray-500 block text-sm">성명</span>
                                        {bookingInfo.guestName}
                                    </p>
                                    <p className="text-gray-700">
                                        <span className="text-gray-500 block text-sm">이메일</span>
                                        {bookingInfo.guestEmail}
                                    </p>
                                    <div className="pt-2 text-center">
                                        <span className="text-gray-500 block text-sm mb-2">투숙 인원</span>
                                        <div className="flex justify-center gap-4">
                                            <p className="text-gray-700">성인 {bookingInfo.numOfAdults}명</p>
                                            <p className="text-gray-700">아동 {bookingInfo.numOfChildren}명</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {!isDeleted && (
                                <div className="pt-4">
                                    <button
                                        onClick={() => handleBookingCancellation(bookingInfo.id)}
                                        className="w-full px-4 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                    >
                                        예약 취소하기
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ) : confirmationCode === "" ? ( // 4. 초기 상태일 때
                    <div className="text-center p-8 bg-white rounded-xl shadow-md">
                        <p className="text-gray-500">
                            예약 확인 코드를 입력하시면 예약 정보를 확인하실 수 있습니다.
                        </p>
                    </div>
                ) : null}

                {/* 예약 취소 성공 메세지 */}
                {isDeleted && (
                    <div className="mt-4 p-4 bg-green-50 border border-green-100 text-green-800 rounded-lg">
                        {successMessage}
                    </div>
                )}
            </div>
        </div>
    )
}
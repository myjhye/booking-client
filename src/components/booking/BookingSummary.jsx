// 예약 최종 확인 폼
// 예약 폼(BookingForm)에서 입력한 정보(투숙객 정보, 숙박 일정, 인원 수)를 최종 확인하고, 총 결제 금액과 함께 예약 확정 확인

import moment from "moment"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

/*
   ===== props =====
   booking: 예약 정보 객체 (이름, 이메일, 날짜, 인원 등)
   payment: 총 결제 금액
   isFormValid: 입력폼 유효성 검증 통과 여부
   onConfirm: 예약 확정 시 실행할 콜백 함수
*/

export default function BookingSummary({ booking, payment, isFormValid, onConfirm }) {

    // 숙박 일수 계산
    const checkInDate = moment(booking.checkInDate)
    const checkOutDate = moment(booking.checkOutDate)
    const numOfDays = checkOutDate.diff(checkInDate, "days")

    // ===== 예약 상태 관리 =====
    // 예약 확정 여부
    const [isBookingConfirmed, setIsBookingConfirmed] = useState(false)
    // 예약 처리 중 여부
    const [isProcessingPayment, setIsProcessingPayment] = useState(false)

    const navigate = useNavigate()


    // ===== 예약 확정 처리 =====
    const handleConfirmBooking = () => {
        // 로딩 시작
        setIsProcessingPayment(true)
        // 예약 처리 시뮬레이션 (3초)
        setTimeout(() => {
            // 로딩 종료
            setIsProcessingPayment(false)
            // 예약 확정
            setIsBookingConfirmed(true)
            // 부모 컴포넌트의 예약 처리 함수(handleFormSubmit) 호출
            onConfirm()
        }, 3000)
    }


    // 예약 확정되면 성공 페이지로 이동
    useEffect(() => {
        if (isBookingConfirmed) {
            navigate("/booking-success")
        }
    }, [isBookingConfirmed, navigate])


    return (
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <h4 className="text-xl font-semibold mb-4">예약 상세</h4>

            <div className="space-y-3">
                <div className="flex justify-between">
                    <span className="text-gray-600">이름:</span>
                    <span className="font-medium">{booking.guestFullName}</span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-600">이메일:</span>
                    <span className="font-medium">{booking.guestEmail}</span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-600">체크인 날짜:</span>
                    <span className="font-medium">{moment(booking.checkInDate).format("MM/DD/YYYY")}</span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-600">체크아웃 날짜:</span>
                    <span className="font-medium">{moment(booking.checkOutDate).format("MM/DD/YYYY")}</span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-600">숙박 일수:</span>
                    <span className="font-medium">{numOfDays}박</span>
                </div>

                <div className="border-t pt-3">
                    <h5 className="font-medium mb-2">총 투숙객 수</h5>
                    <div className="flex justify-between">
                        <div>
                            <span className="text-gray-600">성인:</span>
                            <span className="font-medium ml-2">{booking.numOfAdults}명</span>
                        </div>
                        <div>
                            <span className="text-gray-600">어린이:</span>
                            <span className="font-medium ml-2">{booking.numOfChildren}명</span>
                        </div>
                    </div>
                </div>

                {payment > 0 ? (
                    <div className="border-t pt-3">
                        <div className="flex justify-between text-lg font-semibold">
                            <span>총 결제 금액:</span>
                            <span className="text-blue-600">₩{payment}</span>
                        </div>

                        {isFormValid && !isBookingConfirmed ? (
                            <button
                                onClick={handleConfirmBooking}
                                className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                                disabled={isProcessingPayment}
                            >
                                {isProcessingPayment ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        <span>예약이 진행 중입니다...</span>
                                    </div>
                                ) : (
                                    "버튼을 클릭하여 예약을 최종 진행하세요"
                                )}
                            </button>
                        ) : isBookingConfirmed && (
                            <div className="flex justify-center mt-4">
                                <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                            </div>
                        )}
                    </div>
                ) : (
                    <p className="text-red-600 mt-3">
                        체크아웃 날짜는 체크인 날짜 이후여야 합니다
                    </p>
                )}
            </div>
        </div>
    )
}
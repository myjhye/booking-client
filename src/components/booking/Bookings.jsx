// 예약 관리 메인 컴포넌트

import { useEffect, useState } from "react"
import { cancelBooking, getAllBookings } from "../utils/ApiFunctions"
import Header from "../common/Header"
import BookingsTable from "./BookingsTable"

export default function Bookings() {

    // 전체 예약 목록
    const [bookingInfo, setBookingInfo] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")


    // 컴포넌트 마운트 시 예약 목록 조회
    useEffect(() => {
        // 모든 예약 정보 조회 API
        getAllBookings()
            .then((data) => {
                setBookingInfo(data)
                setIsLoading(false)
            })
            .catch((error) => {
                setError(error.message)
                setIsLoading
            })
    }, [])


    // 예약 취소 함수
    const handleBookingCancellation = async (bookingId) => {
        try {
            // 예약 취소 API
            await cancelBooking(bookingId)
            // 예약 취소 후 최신 예약 목록 다시 조회
            const data = await getAllBookings()
            // 예약 목록 상태 업데이트
            setBookingInfo(data)
        }
        catch(error) {
            setError(error.message)
        }
    }

    return (
        <section 
            className="container" 
            style={{ backgroundColor: "whitesmoke" }}
        >
            {/* 페이지 헤더 */}
            <Header title={"예약 관리"} />

            {/* 에러 메세지 */}
            {error && (
                <div className="text-danger">
                    {error}
                </div>
            )}
            
            {/* 예약 조회 테이블 */}
            {isLoading ? (
                <div>
                    loading..
                </div>
            ) : (
                <BookingsTable 
                    bookingInfo={bookingInfo}
                    handleBookingCancellation={handleBookingCancellation}
                />
            )}
        </section>
    )
}
// 예약 목록 테이블 컴포넌트

import { useEffect, useState } from "react"
import { parseISO } from "date-fns"
import DateSlider from "../common/DateSlider"

export default function BookingsTable({ bookingInfo, handleBookingCancellation }) {
    
    // 필터링된 예약 목록
    const [filteredBookings, setFilteredBookings] = useState(bookingInfo)


    // 선택된 날짜 범위에 따라 예약 목록 필터링하는 함수 --> 아래 테이블에 적용
    const filterBookings = (startDate, endDate) => {
        // 시작일과 종료일이 모두 선택된 경우에만 필터링 수행
        if (startDate && endDate) {
            const filtered = bookingInfo.filter((booking) => {
                // 문자열 형태의 날짜를 Date 객체로 변환
                const bookingStartDate = parseISO(booking.checkInDate)
                const bookingEndDate = parseISO(booking.checkOutDate)
                
                // 선택된 날짜 범위 내의 예약만 필터링
                return bookingStartDate >= startDate 
                        && bookingEndDate <= endDate 
                        && bookingEndDate > startDate
            })
            // 필터링된 결과로 상태 업데이트
            setFilteredBookings(filtered)
            return
        }
        // 날짜가 선택되지 않은 경우 전체 예약 목록 표시
        setFilteredBookings(bookingInfo)
    }


    // 예약 목록이 변경될 때마다 필터링된 목록 업데이트
    useEffect(() => {
        setFilteredBookings(bookingInfo)
    }, [bookingInfo])
    

    return (
        <section className="p-6 bg-white rounded-lg shadow-lg">

            {/* 날짜 범위 선택 컴포넌트 */}
            <div className="mb-8">
                <DateSlider onFilterByDate={filterBookings} />
            </div>

            {/* 예약 목록 테이블 */}
            <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">번호</th>
                            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">예약 번호</th>
                            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">객실 번호</th>
                            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">체크인</th>
                            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">체크아웃</th>
                            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">고객명</th>
                            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">이메일</th>
                            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">성인</th>
                            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">아동</th>
                            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">총인원</th>
                            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">예약코드</th>
                            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">관리</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {filteredBookings.map((booking, index) => (
                            <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-3 text-sm text-gray-500">{index + 1}</td>
                                <td className="px-4 py-3 text-sm text-gray-500">{booking.id}</td>
                                <td className="px-4 py-3 text-sm text-gray-500">{booking.room.id}</td>
                                <td className="px-4 py-3 text-sm text-gray-500">{booking.checkInDate}</td>
                                <td className="px-4 py-3 text-sm text-gray-500">{booking.checkOutDate}</td>
                                <td className="px-4 py-3 text-sm font-medium text-gray-900">{booking.guestName}</td>
                                <td className="px-4 py-3 text-sm text-gray-500">{booking.guestEmail}</td>
                                <td className="px-4 py-3 text-sm text-center text-gray-500">{booking.numOfAdults}</td>
                                <td className="px-4 py-3 text-sm text-center text-gray-500">{booking.numOfChildren}</td>
                                <td className="px-4 py-3 text-sm text-center text-gray-500">{booking.totalNumOfGuests}</td>
                                <td className="px-4 py-3 text-sm font-medium text-gray-900">{booking.bookingConfirmationCode}</td>
                                <td className="px-4 py-3 text-sm text-center">
                                    <button
                                        onClick={() => handleBookingCancellation(booking.id)}
                                        className="px-3 py-1 text-sm text-red-600 hover:text-red-800 font-medium 
                                                 hover:bg-red-50 rounded-md transition-colors">
                                        예약 취소
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            {/* 필터링된 결과가 없을 경우 표시되는 메세지 */}
            {filteredBookings.length === 0 && (
                <div className="text-center py-8">
                    <p className="text-gray-500 text-sm">선택한 날짜에 해당하는 예약이 없습니다.</p>
                </div>
            )}
        </section>
    )
}
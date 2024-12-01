// 날짜 범위를 선택하는 달력 컴포넌트

import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"
import { DateRangePicker } from "react-date-range"
import { useState } from "react"


/*
   ===== props =====
   onFilterByDate: 선택된 날짜 범위로 예약 목록을 필터링하는 함수
*/

export default function DateSlider({ onFilterByDate }) {
    
    // 선택된 날짜 범위
    const [dateRange, setDateRange] = useState({
        startDate: undefined,
        endDate: undefined,
        key: "selection",
    })


    // ===== 이벤트 핸들러 =====
    // 날짜 범위 선택 함수 --> 선택된 날짜로 상태 업데이트(달력 UI에 시각적 표시)하고 부모 컴포넌트에 변경사항 전달(BookingTable에 적용)
    const handleSelect = (ranges) => {
        setDateRange(ranges.selection)
        onFilterByDate(ranges.selection.startDate, ranges.selection.endDate)
    }

    // 필터 초기화 버튼 클릭 함수 --> 날짜 선택을 초기화하고 부모 컴포넌트에 null 값 전달
    const handleClearFilter = () => {
        setDateRange({
            startDate: undefined,
            endDate: undefined,
            key: "selection",
        })
        onFilterByDate(null, null)
    }
    
    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start">

                {/* 날짜 범위 선택 캘린더 */}
                <DateRangePicker 
                    ranges={[dateRange]}
                    onChange={handleSelect}
                    className="border border-gray-200 rounded-lg shadow-sm"
                />
                
                {/* 필터 초기화 버튼 */}
                <button 
                    onClick={handleClearFilter}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white 
                             border border-gray-300 rounded-md shadow-sm
                             hover:bg-gray-50 focus:outline-none focus:ring-2 
                             focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                    필터 초기화
                </button>
            </div>
        </div>
    )
}
// 예약 가능한 객실 검색 결과

import { useState } from "react"
import RoomCard from "../room/RoomCard"
import { Button, Row } from "react-bootstrap"
import RoomPaginator from "./RoomPaginator"

export default function RoomSearchResult({ results, onClearSearch }) {
    
	// ===== 페이지네이션 =====
	// 현재 페이지
    const [currentPage, setCurrentPage] = useState(1)
    // 페이지당 표시할 결과 수
	const resultsPerPage = 3
	// 전체 결과 수
    const totalResults = results.length
	// 전체 페이지 수
    const totalPages = Math.ceil(totalResults / resultsPerPage)


	// 페이지 변경 함수
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }


	// ===== 현재 페이지에 표시할 결과 계산 =====
	// currentPage = 2 / resultsPerPage = 3인 경우
	// 시작 인덱스 --> (2 - 1) * 3 = 3 
    const startIndex = (currentPage - 1) * resultsPerPage
	// 끝 인덱스 --> 3 + 3 = 6
    const endIndex = startIndex + resultsPerPage
	// 현재 페이지 결과 --> results.slice(3, 6)  = 3, 4, 5번 항목 반환
    const paginatedResults = results.slice(startIndex, endIndex)

    
    return (
        <>
			{results.length > 0 ? (
				<>
					<Row>
						{paginatedResults.map((room) => (
							<RoomCard key={room.id} room={room} />
						))}
					</Row>
					<Row>
						{/* 결과가 페이지당 표시 수(3)보다 많은 경우 페이징 표시 */}
						{totalResults > resultsPerPage && (
							<RoomPaginator
								currentPage={currentPage}
								totalPages={totalPages}
								onPageChange={handlePageChange}
							/>
						)}
						<Button 
							className="w-full px-8 py-2.5 rounded-lg shadow-sm transition-colors duration-200 border-2 border-gray hover:bg-gray-100 mt-10"
							onClick={onClearSearch}
						>
							설정 초기화
						</Button>
					</Row>
				</>
			) : (
				<p></p>
			)}
		</>
    )
}
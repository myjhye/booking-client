// 전체 객실 조회 화면
// 객실 데이터 관리, 필터/페이징 처리 

import { useEffect, useState } from "react"
import RoomCard from "./RoomCard"
import { Col, Container, Row } from "react-bootstrap"
import { getAllRooms } from "../utils/ApiFunctions"
import RoomFilter from "../common/RoomFilter"
import RoomPaginator from "../common/RoomPaginator"

export default function Room() {

    // 전체 객실 데이터
    const [data, setData] = useState([])
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(false)
    // 현재 페이지
    const [currentPage, setCurrentPage] = useState(1)
    // 페이지당 객실 수
    const [roomsPerPage] = useState(3)
    // 필터링된 객실 데이터
    const [filteredData, setFilteredData] = useState([])


    // 컴포넌트 마운트 시 객실 데이터 로딩
    useEffect(() => {
        setIsLoading(true)
        getAllRooms()
            .then((data) => {
                setData(data)
                setFilteredData(data)
                setIsLoading(false)
            })
            .catch((error) => {
                setError(error.message)
                setIsLoading(false)
            })
    }, [])

    if (isLoading) {
        return (
            <div>
                loading room..
            </div>
        )
    }

    if (error) {
        return (
            <div className="text-danger">
                Error: { error }
            </div>
        )
    }

    // 페이지 변경 처리
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    // 전체 페이지 수 계산 --> 전체 객실이 8개이고, 페이지당 3개씩 보여준다면 Math.ceil(8 / 3) = Math.ceil(2.67) = 3 --> 총 3페이지
    const totalPages = Math.ceil(filteredData.length / roomsPerPage)


    // 현재 페이지에 표시할 객실 데이터 추출/렌더링
    // 해당 범위의 객실들만 잘라서 RoomCard 컴포넌트로 반환
    const renderRooms = () => {
        // 시작 인덱스
        // 1페이지: (1-1) * 3 = 0번째 부터
        // 2페이지: (2-1) * 3 = 3번째 부터
        // 3페이지: (3-1) * 3 = 6번째 부터
        const startIndex = (currentPage - 1) * roomsPerPage
        // 끝 인덱스 계산
        // 1페이지: 0+3 = 3 --> 2번째까지 (0, 1, 2)
        // 2페이지: 3+3 = 6 --> 5번째까지 (3, 4, 5)
        // 3페이지: 6+3 = 9 --> 8번째까지 (6, 7, 8)
        const endIndex = startIndex + roomsPerPage
        return filteredData
            .slice(startIndex, endIndex)
            .map((room) => (
                <RoomCard 
                    key={room.id}
                    room={room}
                />
            ))
    }



    return (
        <Container>
            <Row>
                <Col md={6} className="mb-3 mb-md-0">
                    <RoomFilter 
                        data={data} 
                        setFilteredData={setFilteredData}
                    />
                </Col>
            </Row>

            <Row>
                {renderRooms()}
            </Row>

            <Row>
                <Col md={6} className="d-flex align-items-center jusitify-content-end">
                    <RoomPaginator 
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </Col>
            </Row>
        </Container>
    )
}
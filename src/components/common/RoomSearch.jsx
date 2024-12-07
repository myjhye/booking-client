// 예약 가능한 객실 검색

import moment from "moment"
import { getAvailableRooms } from "../utils/ApiFunctions"
import { Form, Button, Row, Col, Container } from "react-bootstrap"
import RoomSearchResults from "./RoomSearchResult"
import RoomTypeSelector from "./RoomTypeSelector"
import { useState } from "react"
import Header from "./Header"

export default function RoomSearch() {
   
    // 검색 설정
    const [searchQuery, setSearchQuery] = useState({
		checkInDate: "",
		checkOutDate: "",
		roomType: ""
	})

    // 이용 가능한 객실 목록
	const [availableRooms, setAvailableRooms] = useState([])
	const [errorMessage, setErrorMessage] = useState("")
	const [isLoading, setIsLoading] = useState(false)


    // 검색 버튼 클릭 함수
    const handleSearch = (e) => {
        e.preventDefault()

        // moment로 날짜 변환 --> isValid()로 유효성 검증 / isSameOrAfter()로 날짜 비교  / moment().format("YYYY-MM-DD")로 날짜 포맷팅 용도
        const checkIn = moment(searchQuery.checkInDate)
        const checkOut = moment(searchQuery.checkOutDate)

        if (!checkIn.isValid() || !checkOut.isValid()) {
            setErrorMessage("날짜를 설정해주세요")
            return
        }
        if (!checkOut.isSameOrAfter(checkIn)) {
            setErrorMessage("체크인 날짜는 체크아웃 날짜보다 우선이어야 합니다")
            return
        }
        setIsLoading(true)

        // 가능한 객실 검색 API
        getAvailableRooms(searchQuery.checkInDate, searchQuery.checkOutDate, searchQuery.roomType)
            .then((response) => {
                setAvailableRooms(response.data)
                setErrorMessage("")
            })
            .catch((error) => {
                console.error(error)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    // 입력 필드 값 변경 함수 --> 체크인/체크아웃 날짜
    const handleInputChange = (e) => {
        const { name, value } = e.target

        // 변경된 필드 값을 상태에 업데이트
        setSearchQuery({
            ...searchQuery,
            [name]: value
        })
    }

    // 입력 필드 값 변경 함수 --> 객실 유형
    const handleRoomTypeChange = (type) => {
        setSearchQuery({
            ...searchQuery,
            roomType: type
        })
    }

    // 입력 설정 초기화 함수
    const handleClearSearch = () => {
        setSearchQuery({
            checkInDate: "",
            checkOutDate: "",
            roomType: "",
        })
    }

    return (
        <>
            <Header title={"예약 가능한 객실 검색"} />
            <Container className="relative bg-white rounded-xl shadow-xl mt-5">
                <Form onSubmit={handleSearch} className="p-8">
                    <Row className="space-y-6 md:space-y-0">
                        <Col xs={12} md={3} className="px-4">
                            <Form.Group controlId="checkInDate">
                                <Form.Label className="block text-sm font-semibold text-gray-700 mb-2">
                                    체크인 날짜
                                </Form.Label>
                                <Form.Control
                                    type="date"
                                    name="checkInDate"
                                    value={searchQuery.checkInDate}
                                    onChange={handleInputChange}
                                    min={moment().format("YYYY-MM-DD")}
                                    className="w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                                />
                            </Form.Group>
                        </Col>
     
                        <Col xs={12} md={3} className="px-4">
                            <Form.Group controlId="checkOutDate">
                                <Form.Label className="block text-sm font-semibold text-gray-700 mb-2">
                                    체크아웃 날짜
                                </Form.Label>
                                <Form.Control
                                    type="date"
                                    name="checkOutDate"
                                    value={searchQuery.checkOutDate}
                                    onChange={handleInputChange}
                                    min={moment().format("YYYY-MM-DD")}
                                    className="w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                                />
                            </Form.Group>
                            {errorMessage && (
                                <div className="mt-4 p-4 bg-red-50 rounded-lg">
                                    <p className="text-red-600 text-center">
                                        {errorMessage}
                                    </p>
                                </div>
                            )}
                        </Col>
                        
     
                        <Col xs={12} md={3} className="px-4">
                            <Form.Group controlId="roomType">
                                <Form.Label className="block text-sm font-semibold text-gray-700 mb-2">
                                    객실 유형
                                </Form.Label>
                                <div className="w-full">
                                    <RoomTypeSelector
                                        onRoomTypeChange={handleRoomTypeChange}
                                        selectedType={searchQuery.roomType}
                                    />
                                </div>
                            </Form.Group>
                        </Col>
                        
     
                        <Col xs={12} md={3} className="px-4">
                            <Form.Label className="block text-sm font-semibold text-gray-700 mb-2">
                                &nbsp;
                            </Form.Label>
                            <Button 
                                variant="secondary" 
                                type="submit"
                                className="w-full px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm transition-colors duration-200"
                            >
                                Search
                            </Button>
                        </Col>
                        
                    </Row>
                </Form>
     
                <div className="p-6">
                    {isLoading ? (
                        <div className="text-center py-8">
                            <p className="text-lg text-gray-600 animate-pulse">
                                예약 가능한 객실 찾는 중...
                            </p>
                        </div>
                    ) : availableRooms ? (
                        <RoomSearchResults results={availableRooms} onClearSearch={handleClearSearch} />
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-lg text-gray-600">
                                선택한 날짜와 객실 타입에 해당하는 예약 가능 객실이 없습니다.
                            </p>
                        </div>
                    )}
                    
                </div>
            </Container>
        </>
     )
}
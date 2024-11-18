// 기존 객실 목록

import { useState } from "react"
import { deleteRoom, getAllRooms } from "../utils/ApiFunctions";
import { useEffect } from "react";
import RoomFilter from "../common/RoomFilter";
import RoomPaginator from "../common/RoomPaginator";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ExistingRooms() {
    
    // 전체 객실 목록
    const [rooms, setRooms] = useState([]);
    // 현재 페이지 번호
    const [currentPage, setCurrentPage] = useState(1);
    // 페이지당 표시할 객실 수 (8개, 고정 값)
    const [roomsPerPage] = useState(8);
    const [isLoading, setIsLoading] = useState(false);
    // 필터링된 객실 목록
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        fetchRooms();
    }, [])

    // 객실 전체 조회 api 호출
    const fetchRooms = async() => {
        setIsLoading(true)

        try {
            const result = await getAllRooms()
            setRooms(result)
            setFilteredRooms(result)
            setIsLoading(false)
        }
        catch(error) {
            console.error(error)
        }
    }

    // 객실 개별 삭제 api 호출
    const handleDelete = async(roomId) => {
        try {
            const result = await deleteRoom(roomId)
            if (result === "") {
                setSuccessMessage(`객실 번호 ${roomId} 삭제 성공`)
                fetchRooms()
            }
            else {
                console.error(`객실 번호 ${roomId} 삭제 실패`)
            }
        }
        catch(error) {
            setErrorMessage(error.message)
        }
        
        setTimeout(() => {
            setSuccessMessage("")
            setErrorMessage("")
        }, 3000)
    }


    // 페이지 번호 클릭
    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber)
    }


    // 총 페이지 계산
    const calculateTotalPages = (filteredRooms, roomsPerPage, rooms) => {
        const totalRooms = filteredRooms.length > 0 ? filteredRooms.length : rooms.length
        // 총 객실 수를 페이지당 객실 수로 나누어 올림
        return Math.ceil(totalRooms / roomsPerPage)
    }
    
    // 현재 페이지에서 첫 번째로 보여줄 객실의 인덱스(순서 번호)
    const indexOfFirstRoom = (currentPage - 1) * roomsPerPage
    // 현재 페이지에서 마지막으로 보여줄 객실의 인덱스
    const indexOfLastRoom = currentPage * roomsPerPage
    // 현재 페이지에 해당하는 객실 목록(최대 8개)
    const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom)


    return (
        <>
            {isLoading ? (
                <p className="text-center text-gray-600">Loading...</p>
            ) : (
                <section className="container mx-auto p-5">
                    <div className="text-center mb-8">
                        <h2 className="text-4xl font-bold text-gray-800">기존 객실 목록</h2>
                    </div>

                    {/* 객실 타입 필터링 */}
                    <div className="flex justify-center mb-6">
                        <div className="w-full">
                            <RoomFilter
                                data={rooms}
                                setFilteredData={setFilteredRooms}
                            />
                        </div>
                    </div>

                    {/* 객실 테이블 */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border rounded-lg shadow-md">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-gray-700 font-semibold text-sm">ID</th>
                                    <th className="px-6 py-3 text-gray-700 font-semibold text-sm">Room Type</th>
                                    <th className="px-6 py-3 text-gray-700 font-semibold text-sm">Room Price</th>
                                    <th className="px-6 py-3 text-gray-700 font-semibold text-sm">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentRooms.map((room) => (
                                    <tr key={room.id} className="border-t text-center">
                                        <td className="px-6 py-4">{room.id}</td>
                                        <td className="px-6 py-4">{room.roomType}</td>
                                        <td className="px-6 py-4">{room.roomPrice}</td>
                                        <td className="px-6 py-4 flex justify-center gap-2">
                                            <Link
                                                to={`/edit-room/${room.id}`} 
                                                className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md"
                                            >
                                                <span 
                                                    className="btn btn-info btn-sm"
                                                >
                                                    <FaEye />
                                                </span>
                                                <span 
                                                    className="btn btn-warning btn-sm"
                                                >
                                                    <FaEdit />
                                                </span>
                                            </Link>
                                            <button 
                                                className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md"
                                                onClick={() => handleDelete(room.id)}
                                            >
                                                <FaTrashAlt />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* 객실 목록 페이징 */}
                    <div className="flex justify-center mt-8 left-0 right-0 bg-white">
                        <RoomPaginator 
                            currentPage={currentPage}
                            totalPages={calculateTotalPages(filteredRooms, roomsPerPage, rooms)}
                            onPageChange={handlePaginationClick}
                        />
                    </div>
                </section>
            )}
        </>
    );
}
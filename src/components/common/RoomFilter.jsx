// 객실 타입 필터링

import { useState } from "react";

export default function RoomFilter({ data, setFilteredData }) {
    
    // 사용자가 선택한 필터
    const [selectedType, setSelectedType] = useState("");

    // 필터 적용
    const handleSelect = (type) => {
        setSelectedType(type);

        // 필터 All 선택 --> 전체 데이터 부모에 전달
        if (type === "") {
            setFilteredData(data); 
        } 
        else {
            // 선택한 타입과 일치하는 객실만 필터링
            const filteredRooms = data.filter((room) => room.roomType.toLowerCase().includes(type.toLowerCase()));
            // 필터링된 데이터를 부모에 전달
            setFilteredData(filteredRooms);
        }
    };

    
    // 객실 타입 목록
    const roomTypes = [
        // All을 위한 빈 문자열
        "", 
        // 중복 없는(Set) 객실 타입 목록
        ...new Set(data.map((room) => room.roomType))
    ];



    return (
        <div className="mt-4">
            <div className="flex space-x-2 justify-center mx-auto">
                {roomTypes.map((type, index) => (
                    <label
                        key={index}
                        className={`px-4 py-2 border rounded-md cursor-pointer ${
                            selectedType === type
                                ? "bg-blue-600 text-white"
                                : "bg-white text-gray-700 border-gray-300"
                        }`}
                        onClick={() => handleSelect(type)}
                    >
                        <input
                            type="radio"
                            name="roomType"
                            value={type}
                            checked={selectedType === type}
                            // 변경 시 필터 적용
                            onChange={() => handleSelect(type)}
                            className="hidden"
                        />
                        {/* 버튼 텍스트 --> 빈 문자열이면 All로 표시 */}
                        {type || "All"}
                    </label>
                ))}
            </div>
        </div>
    );
}

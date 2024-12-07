// 객실 유형 선택 버튼

import { useEffect, useState } from "react"
import { getRoomTypes } from "../utils/ApiFunctions";

{/*
    ===== props =====
    onRoomTypeChange
    - 객실 타입 변경 함수
    - 선택된 타입을 받아 roomType 업데이트
    
    selectedType
    - 현재 선택된 객실 타입 표시
*/}
export default function RoomTypeSelector({ onRoomTypeChange, selectedType }) {
    
    // 객실 유형 목록
    const [roomTypes, setRoomTypes] = useState([""]);

    // 객실 유형 조회
    useEffect(() => {
        getRoomTypes()
            .then((data) => {
                setRoomTypes(data);
            })
    }, []);
    
    // 객실 유형 선택
    const handleSelect = (type) => {
        onRoomTypeChange(type);
    }
    

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
                            onChange={() => handleSelect(type)}
                            className="hidden"
                        />
                        {type}
                    </label>
                ))}
            </div>
        </div>
    );
}
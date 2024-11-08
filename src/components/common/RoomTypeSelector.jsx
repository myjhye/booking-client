// 객실 유형 선택 버튼

import { useEffect, useState } from "react"
import { getRoomTypes } from "../utils/ApiFunctions";

export default function RoomTypeSelector({ onRoomTypeChange }) {
    
    // 객실 유형 목록
    const [roomTypes, setRoomTypes] = useState([""]);
    // 사용자가 선택한 객실 유형
    const [selectedType, setSelectedType] = useState("");

    // 객실 유형 조회
    useEffect(() => {
        getRoomTypes().then((data) => {
            setRoomTypes(data);
        })
    }, []);
    
    // 객실 유형 선택
    const handleSelect = (type) => {
        setSelectedType(type);
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
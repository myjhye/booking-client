// 객실 수정 폼

import { useEffect, useState } from "react";
import { getRoomById, updateRoom } from "../utils/ApiFunctions";
import { Link, useParams } from "react-router-dom";

export default function EditRoom() {
    const [room, setRoom] = useState({
        roomType: "",
        roomPrice: "",
    });

    const [imagePreview, setImagePreview] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const { roomId } = useParams();

    // 객실 유형 데이터
    const roomTypes = [
        "Suite room",
        "Family room",
        "Penthouse",
        "Deluxe room",
        "Superior room",
    ];

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setRoom({
            ...room,
            [name]: value,
        });
    };

    const handleRoomTypeChange = (type) => {
        setRoom({
            ...room,
            roomType: type,
        });
    };

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                // 객실 개별 조회
                const roomData = await getRoomById(roomId);
                setRoom(roomData);
                
                // Base64 이미지 데이터 검증 및 설정
                if (roomData.photo) {
                    // 이미 data:image 접두사가 있는지 확인
                    const photoData = roomData.photo.startsWith('data:image') 
                        ? roomData.photo
                        //  'data:image/jpeg;base64,' 접두사를 붙이기 --> 브라우저가 Base64로 인코딩된 이미지 표시 용도
                        : `data:image/jpeg;base64,${roomData.photo}`;
                    setImagePreview(photoData);
                }
            } catch (error) {
                console.error("Error fetching room:", error);
                setErrorMessage("객실 정보를 불러오는데 실패했습니다.");
            }
        };
    
        fetchRoom();
    }, [roomId]);

    
    // 객실 수정 제출
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            // 객실 수정 api 호출
            const response = await updateRoom(roomId, room);
            if (response.status === 200) {
                setSuccessMessage("객실이 수정되었습니다!");
                const updatedRoomData = await getRoomById(roomId);
                setRoom(updatedRoomData);
                
                // 이미지 데이터 업데이트
                if (updatedRoomData.photo) {
                    const photoData = updatedRoomData.photo.startsWith('data:image') 
                        ? updatedRoomData.photo
                        : `data:image/jpeg;base64,${updatedRoomData.photo}`;
                    setImagePreview(photoData);
                }
    
                setErrorMessage("");
            } else {
                setErrorMessage("Error updating room");
            }
        } catch (error) {
            console.error(error);
            setErrorMessage(error.message);
        }
    };

    return (
        <section className="w-full text-center">
            <h2 className="text-3xl font-bold my-6">기존 객실 수정</h2>
    
            {successMessage && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 text-green-500 py-2 px-4 rounded shadow-lg text-center">
                    {successMessage}
                </div>
            )}

            {successMessage && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 text-red-500 py-2 px-4 rounded shadow-lg text-center">
                    {errorMessage}
                </div>
            )}
    
            <div>
                {imagePreview && (
                    <img
                        src={imagePreview}
                        alt="Preview of Room Photo"
                        className="h-64 object-cover mx-auto my-4 rounded-md"
                    />
                )}
            </div>

            <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="roomType" className="block text-gray-700 font-medium mb-2">
                        Room Type
                    </label>
                    
                    <div className="flex space-x-2 justify-center mx-auto">
                        {roomTypes.map((type, index) => (
                            <label
                                key={index}
                                className={`px-4 py-2 border rounded-md cursor-pointer ${
                                    room.roomType === type
                                        ? "bg-blue-600 text-white"
                                        : "bg-white text-gray-700 border-gray-300"
                                }`}
                                onClick={() => handleRoomTypeChange(type)}
                            >
                                <input
                                    type="radio"
                                    name="roomType"
                                    value={type}
                                    checked={room.roomType === type}
                                    onChange={() => handleRoomTypeChange(type)}
                                    className="hidden"
                                />
                                {type}
                            </label>
                        ))}
                    </div>
                </div>
    
                <div>
                    <label htmlFor="roomPrice" className="block text-gray-700 font-medium mb-2">
                        Room Price
                    </label>
                    <input
                        className="w-full p-3 border border-gray-300 rounded-md"
                        required
                        id="roomPrice"
                        name="roomPrice"
                        type="number"
                        value={room.roomPrice}
                        onChange={handleInputChange}
                    />
                </div>
    
                <div className="flex gap-4">
                    <Link
                        to="/existing-rooms"
                        className="w-full py-3 bg-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-400 transition text-center"
                    >
                        뒤로가기
                    </Link>
                    <button
                        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
                        type="submit"
                    >
                        객실 수정
                    </button>
                </div>
            </form>
        </section>
    );
}    
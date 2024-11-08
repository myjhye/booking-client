// 객실 등록 폼

import { useState } from "react"
import { addRoom } from "../utils/ApiFunctions";
import RoomTypeSelector from "../common/RoomTypeSelector";

export default function AddRoom() {
    
    // 신규 등록할 객실 정보
    const [newRoom, setNewRoom] = useState({
        photo: null,
        roomType: "",
        roomPrice: "",
    });

    const [imagePreview, setImagePreview] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // 객실 유형 변경 함수
    const handleRoomTypeChange = (type) => {
        setNewRoom({
            ...newRoom,
            roomType: type,
        });
    };
    

    // 객실 가격 변경 함수
    const handleRoomInputChange = (e) => {

        const name = e.target.name
        // 재할당 X
		let value = e.target.value

        if (name === "roomPrice") {
            value = parseInt(value);
            // 입력 값이 숫자가 아니면 빈 문자열로 설정
            if (isNaN(value)) {
                value = ""
            }
        }
        else {
            value = "";
        };

        setNewRoom({
            ...newRoom,
            [name]: value
        });
    }


    // 객실 이미지 변경 함수
    const handleImageChange = (e) => {
        
        const selectedImage = e.target.files[0]
        
        setNewRoom({
            ...newRoom,
            photo: selectedImage,
        })

        setImagePreview(URL.createObjectURL(selectedImage))
    }


    // 객실 등록
    const handleSubmit = async (e) => {
        e.preventDefault();

        // 유효성 검사
        if (!newRoom.photo || !newRoom.roomType || newRoom.roomPrice === "") {
            setErrorMessage("모든 필수 입력 값을 입력해 주세요.");
            return;
        }

        try {
            const success = await addRoom(newRoom.photo, newRoom.roomType, newRoom.roomPrice)

            if (success !== undefined) {
                setSuccessMessage("신규 객실이 저장되었습니다")
                setNewRoom({
                    photo: null,
                    roomType: "",
                    roomPrice: "",
                })
                setImagePreview("")
                setErrorMessage("")
            }
            else {
                setErrorMessage("신규 객실 추가하는 데 에러 발생")
            }

        }
        catch (error) {
            setErrorMessage(error.messsage)
        }

        setTimeout(() => {
            setSuccessMessage("")
            setErrorMessage("")
        }, 3000)
    }

    return (
        <section className="w-full text-center">
            <h2 className="text-3xl font-bold my-6">신규 객실 등록</h2>
                
                {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
                {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
                
                <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="roomType" className="block text-gray-700 font-medium mb-2">
                            Room Type
                        </label>
                        <RoomTypeSelector onRoomTypeChange={handleRoomTypeChange} />
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
                            value={newRoom.roomPrice}
                            onChange={handleRoomInputChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="roomPhoto" className="block text-gray-700 font-medium mb-2">
                            Room Photo
                        </label>
                        <input
                            className="w-full p-3 border border-gray-300 rounded-md"
                            required
                            id="roomPhoto"
                            name="roomPhoto"
                            type="file"
                            onChange={handleImageChange}
                        />
                        {imagePreview && (
                            <img
                                src={imagePreview}
                                alt="Preview of Room Photo"
                                className="h-64 h-64 object-cover mx-auto my-4 rounded-md"
                            />
                        )}
                    </div>

                    <button className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition">
                        객실 저장
                    </button>
                </form>
        </section>
    );
}
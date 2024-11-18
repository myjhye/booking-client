import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080"
})

// 신규 객실 추가
export async function addRoom(photo, roomType, roomPrice) {
    
    const formData = new FormData()

    formData.append("photo", photo)
    formData.append("roomType", roomType)
    formData.append("roomPrice", roomPrice)

    const response = await api.post("/rooms/add/new-room", formData);

    if (response.status === 201) {
        return true
    }
    else {
        return false
    };
}


// 객실 타입 조회
export async function getRoomTypes() {

    try {
        const response = await api.get("/rooms/room-types")
        return response.data;
    }
    catch(error) {
        throw new Error("객실 타입을 가져오는데 실패했습니다")
    }
}


// 객실 전체 조회
export async function getAllRooms() {
    
    try {
        const result = await api.get("/rooms/all-rooms")
        return result.data;
    }
    catch(error) {
        throw new Error("전체 객실 정보를 가져오는데 실패했습니다")
    }
}


// 객실 개별 삭제
export async function deleteRoom(roomId) {
    
    try {
        const result = await api.delete(`/rooms/delete/room/${roomId}`)
        return result.data;
    }
    catch(error) {
        throw new Error(`개별 객실 정보를 삭제하는데 실패했습니다: ${error.message}`)
    }
}
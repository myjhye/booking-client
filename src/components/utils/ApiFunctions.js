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



// 객실 개별 수정
export async function updateRoom(roomId, roomData) {

    const formData = new FormData()
    formData.append("roomType", roomData.roomType)
    formData.append("roomPrice", roomData.roomPrice)

    const response = await api.put(`/rooms/update/${roomId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
    
    return response
}



// 객실 개별 조회
export async function getRoomById(roomId) {
    
    try {
        const result = await api.get(`/rooms/room/${roomId}`)
        return result.data
    }
    catch(error) {
        throw new Error(`개별 객실 정보를 가져오는데 실패했습니다: ${error.message}`)
    }
}




// 전체 객실 예약 정보 조회
export async function getAllBookings() {
    try {
        const result = await api.get("/bookings/all-bookings")
        return result.data
    }
    catch(error) {
        if(error.response && error.response.data) {
            throw new Error(error.response.data)
        }
        else {
            throw new Error(`전체 객실 예약 정보 조회 에러 발생: ${error.message}`)
        }
    }
}




// 객실 예약 생성
export async function bookRoom(roomId, booking) {

    try {
        const response = await api.post(`/bookings/room/${roomId}/booking`, booking)
        return response.data
    }
    catch(error) {
        if(error.response && error.response.data) {
            throw new Error(error.response.data)
        }
        else {
            throw new Error(`객실 예약 에러 발생: ${error.message}`)
        }
    }
}


// 예약 코드로 해당 숙박 정보 조회
export async function getBookingByConfirmationCode(confirmationCode) {
    try {
        const result = await api.get(`/bookings/confirmation/${confirmationCode}`)
        return result.data
    }
    catch(error) {
        if(error.response && error.response.data) {
            throw new Error(error.response.data)
        }
        else {
            throw new Error(`객실 예약 조회 에러 발생: ${error.message}`)
        }
    }
}


// 객실 예약 취소
export async function cancelBooking(bookingId) {
    try {
        const result = await api.delete(`/bookings/booking/${bookingId}/delete`)
        return result.data
    }
    catch(error) {
        if(error.response && error.response.data) {
            throw new Error(error.response.data)
        }
        else {
            throw new Error(`객실 예약 취소 에러 발생: ${error.message}`)
        }
    }
}


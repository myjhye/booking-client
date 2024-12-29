import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080"
})


export const getHeader = () => {
    const token = localStorage.getItem("token")
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
    }
}

// 신규 객실 추가
export async function addRoom(photo, roomType, roomPrice) {
    
    const formData = new FormData()
    formData.append("photo", photo)
    formData.append("roomType", roomType)
    formData.append("roomPrice", roomPrice)

    const response = await api.post(
        "/rooms/add/new-room", 
        formData,
        {
            headers: getHeader()
        }
    );

    return response.status === 201; 
}


// 객실 타입 조회
export async function getRoomTypes() {

    try {
        const response = await api.get("/rooms/room-types", {
            headers: getHeader()
        })
        return response.data;
    }
    catch(error) {
        throw new Error("객실 타입을 가져오는데 실패했습니다")
    }
}


// 객실 전체 조회
export async function getAllRooms() {
    
    try {
        const result = await api.get("/rooms/all-rooms", {
            headers: getHeader()
        })
        return result.data;
    }
    catch(error) {
        throw new Error("전체 객실 정보를 가져오는데 실패했습니다")
    }
}


// 객실 개별 삭제
export async function deleteRoom(roomId) {
    
    try {
        const result = await api.delete(`/rooms/delete/room/${roomId}`, {
            headers: getHeader()
        })
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
        const result = await api.get(`/rooms/room/${roomId}`, {
            headers: getHeader()
        })
        return result.data
    }
    catch(error) {
        throw new Error(`개별 객실 정보를 가져오는데 실패했습니다: ${error.message}`)
    }
}




// 전체 객실 예약 정보 조회
export async function getAllBookings() {
    try {
        const result = await api.get("/bookings/all-bookings", {
            headers: getHeader()
        })
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
        const response = await api.post(
            `/bookings/room/${roomId}/booking`, 
            booking,
            {
                headers: getHeader()
            }
        )
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
        const result = await api.get(`/bookings/confirmation/${confirmationCode}`, {
            headers: getHeader()
        })
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
        const result = await api.delete(`/bookings/booking/${bookingId}/delete`, {
            headers: getHeader()
        })
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



// 예약 가능 객실 조회
export async function getAvailableRooms(checkInDate, checkOutDate, roomType) {
    const result = await api.get(`rooms/available-rooms?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`, {
        headers: getHeader()
    })
	return result
}



// 회원가입
export async function registerUser(registration) {
    try {
        const response = await api.post("/auth/register-user", registration)
        return response.data
    }
    catch(error) {
        if (error.response?.data) { 
            throw new Error(error.response.data)
        }
        throw new Error(`User registration error: ${error.message}`)
    }
}



// 로그인
export async function loginUser(login) {
    try {
        const response = await api.post("/auth/login", login)
        return response.data
    }
    catch(error) {
        if (error.response?.status === 401) {
            throw new Error("이메일 또는 비밀번호가 잘못되었습니다.")
        }
        // 다른 에러의 경우
        throw new Error("로그인 중 오류가 발생했습니다.")
    }
}


// 프로필 조회
export async function getUserProfile(userId) {
    try {
        const response = await api.get(`users/profile/${userId}`, {
            headers: getHeader()
        })
        return response.data
    }
    catch(error) {
        throw error
    }
}



// 사용자 삭제
export async function deleteUser(email) {
    try {
        const response = await api.delete(`/users/delete/${email}`, {
            headers: getHeader()
        })
        return response.data
    }
    catch (error) {
        return error.message
    }
}



// 개별 사용자 조회
export async function getUser(email) {
    try {
        const response = await api.get(`/users/${email}`, {
            headers: getHeader()
        });
        return response.data;
    } catch (error) {
        console.error("사용자 정보 조회 에러:", error);
        throw error;
    }
}



export async function getBookingsByUserId(email) {
    try {
        const response = await api.get(`/bookings/user/${email}/bookings`, {
            headers: getHeader()
        })
        return response.data
    }   
    catch (error) {
        console.error("Error fetching bookings:", error.message)
		throw new Error("Failed to fetch bookings")
    }
}


// 게시글 생성
export async function createBoard(boardData) {
    try {
        const response = await api.post("/boards/add/new-board", boardData, {
            headers: getHeader()
        });
        return response.data;
    }
    catch(error) {
        if(error.response && error.response.data) {
            throw new Error(error.response.data)
        }
        else {
            throw new Error(`Error creating a board: ${error.message}`)
        }
    }
}



// 게시글 전체 조회
export async function getAllBoards() {
    try {
        const result = await api.get("/boards/all-boards", {
            headers: getHeader()
        })
        return result.data
    }
    catch(error) {
        if(error.response && error.response.data) {
            throw new Error(error.response.data)
        }
        else {
            throw new Error(`Error fetching all boards: ${error.message}`)
        }
    }
}


// 게시글 개별 조회
export async function getBoardByBoardId(boardId) {
    try {
        const response = await api.get(`/boards/${boardId}`, {
            headers: getHeader()
        })
        return response.data
    }   
    catch (error) {
        console.error("Error fetching a board:", error.message)
		throw new Error("Failed to fetch a board")
    }
}


// 게시글 수정
export async function updateBoard(boardId, boardData) {
    try {
        const response = await api.put(`/boards/${boardId}`, boardData, {
            headers: getHeader()
        })
        return response.data;
    }
    catch (error) {
        console.error("Error updating a board:", error.message)
		throw new Error("Failed to update a board")
    }
}



// 게시글 삭제
export async function DeleteBoard(boardId) {
    try {
        const response = await api.delete(`/boards/${boardId}`, {
            headers: getHeader()
        })
        return response.status === 204; // 삭제 성공시 204 No Content 반환
    }
    catch (error) {
        console.error("Error deleting a board:", error.message)
		throw new Error("Failed to delete a board")
    }
}
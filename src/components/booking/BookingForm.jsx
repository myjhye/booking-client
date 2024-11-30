// 예약 입력 폼
// 선택한 객실에 대해 투숙객 정보와 숙박 일정을 입력 받고 예약 처리

import { useState } from "react"
import { bookRoom, getRoomById } from "../utils/ApiFunctions"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import moment from "moment"
import BookingSummary from "./BookingSummary"

export default function BookingForm() {

	// 폼 유효성 검증 수행 (true일 때 validation 메시지 표시)
	const [validated, setValidated] = useState(false)
	// 예약 진행하기 버튼 클릭 여부 (true일 때 BookingSummary 컴포넌트 표시) 
	const [isSubmitted, setIsSubmitted] = useState(false)
	// 유효성 검증 실패 시 표시하는 에러 메시지
	const [errorMessage, setErrorMessage] = useState("")
	// 선택된 객실의 1박 가격 (숙박 일수에 따라 가격 계산 용도)
	const [roomPrice, setRoomPrice] = useState(0)
	// 입력한 예약 정보
	const [booking, setBooking] = useState({
		guestFullName: "",
		guestEmail: "",
		checkInDate: "",
		checkOutDate: "",
		numOfAdults: 0,
		numOfChildren: 0,
	})

	const { roomId } = useParams()
	const navigate = useNavigate()


	// ===== 폼 입력 값 처리 =====
	// 입력 필드 값이 변경될 때마다 booking 객체 업데이트
	const handleInputChange = (e) => {
		const { name, value } = e.target
		setBooking({
			// 기존 예약 정보는 유지
			...booking,
			// 변경된 필드만 새 값으로 업데이트
			[name]: value
		})
		setErrorMessage("")
	}


	// ===== API 요청 처리 =====
	// 선택된 객실의 가격 조회
	const getRoomPriceById = async (roomId) => {
		try {
			const response = await getRoomById(roomId)
			// 응답에서 가격 추출하여 저장
			setRoomPrice(response.roomPrice)
		}
		catch (error) {
			throw new Error(error)
		}
	}


	// 컴포넌트 마운트 시 객실 가격 조회
	useEffect(() => {
		getRoomPriceById(roomId)
	}, [roomId])



	// ===== 계산 로직 =====
	// 총 숙박 비용 계산 (숙박 일수 X 1박 가격)
	const calculatePayment = () => {
		const checkInDate = moment(booking.checkInDate)
		const checkOutDate = moment(booking.checkOutDate)
		// 숙박 일수
		const diffInDays = checkOutDate.diff(checkInDate, 'days')
		// 객실 가격이 있으면 사용, 없으면 0
		const price = roomPrice ? roomPrice : 0

		return diffInDays * price
	}


	// ===== 유효성 검증 =====
	// 투숙객 인원 유효성 검사
	const isGuestCountValid = () => {
		const adultCount = parseInt(booking.numOfAdults)
		const childrenCount = parseInt(booking.numOfChildren)
		const totalCount = adultCount + childrenCount

		// 총 투숙객이 1명 이상이고 그 중 성인이 1명 이상이어야 true 반환
		return totalCount >= 1 && adultCount >= 1
	}


	// 체크아웃 날짜 유효성 검사
	const isCheckOutDateValid = () => {
		// moment.js로 날짜 비교
		// 체크아웃 날짜가 체크인 날짜와 같거나 이후인지 확인
		if (!moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))) {
			setErrorMessage("체크아웃 날짜는 체크인 날짜 이후여야 합니다")
			return false
		}
		// 유효하면 에러 메세지 초기화 후 true 반환
		else {
			setErrorMessage("")
			return true
		}
	}


	// ===== 폼 제출 처리 =====
	// '예약 진행하기' 버튼 클릭 시 실행
	const handleSubmit = (e) => {
		e.preventDefault();

		const form = e.currentTarget;
		let isValid = true;

		// 1. HTML 기본 유효성 검증
		if (form.checkValidity() === false) {
			isValid = false;
		}

		// 2. 투숙객 인원 검증
		if (!isGuestCountValid()) {
			setErrorMessage("성인은 최소 1명 이상이어야 합니다.");
			isValid = false;
		}

		// 3. 체크아웃 날짜 검증
		if (!isCheckOutDateValid()) {
			// 에러 메시지는 isCheckOutDateValid 내부에서 설정됨
			isValid = false;
		}


		if (!isValid) {
			// 유효성 검사 실패 시 --> 이벤트 버블링 중단
			e.stopPropagation();
		} else {
			// --- 모든 검증 통과 시 예약 확인 단계(BookingSummary)로 진행 ---
			setIsSubmitted(true);
		}

		// 검증 작업을 다 수행했음 --> 다 검증 했으니 이제 에러 상태를 사용자에게 보여주세요
		setValidated(true);
	};



	// ===== 최종 예약 처리 =====
	// BookingSummary에서 '예약 확정' 버튼 클릭 시 실행
	const handleFormSubmit = async () => {
		try {
			// 예약 API 호출
			const confirmationCode = await bookRoom(roomId, booking)
			// 예약 성공 시 성공 페이지로 이동 --> confirmationCode 같이 전달
			navigate("/booking-success", {
				state: {
					message: confirmationCode
				}
			})
		}
		catch (error) {
			// 예약 실패 시 에러 페이지로 이동 --> 에러 메세지 같이 전달
			navigate("/booking-success", {
				state: {
					error: error.response?.data || "예약 처리 중 오류가 발생했습니다."
				}
			})
		}
	}

	return (
		<div className="bg-white rounded-xl shadow-lg overflow-hidden">
		  <div className="bg-blue-500 p-6">
			<h4 className="text-2xl font-bold text-white">예약 정보</h4>
		  </div>
	  
		  <form noValidate onSubmit={handleSubmit} className="p-8">
			<div className="space-y-8">
			  <div className="space-y-6">
				<h5 className="text-lg font-semibold text-gray-800">투숙객 정보</h5>
				<div className="space-y-4">
				  <div>
					<label htmlFor="guestFullName" className="text-sm font-medium text-gray-700 block">성명</label>
					<input
					  required
					  type="text"
					  id="guestFullName"
					  name="guestFullName"
					  value={booking.guestFullName}
					  placeholder="성명을 입력하세요"
					  onChange={handleInputChange}
					  className="mt-1 w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
					/>
					{validated && !booking.guestFullName && (
					  <p className="mt-2 text-sm text-red-600">성명을 입력해주세요</p>
					)}
				  </div>
	  
				  <div>
					<label htmlFor="guestEmail" className="text-sm font-medium text-gray-700 block">이메일</label>
					<input
					  required
					  type="email"
					  id="guestEmail"
					  name="guestEmail"
					  value={booking.guestEmail}
					  placeholder="이메일을 입력하세요"
					  onChange={handleInputChange}
					  className="mt-1 w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
					/>
					{validated && !booking.guestEmail && (
					  <p className="mt-2 text-sm text-red-600">유효한 이메일 주소를 입력해주세요</p>
					)}
				  </div>
				</div>
			  </div>
	  
			  <div className="space-y-6">
				<h5 className="text-lg font-semibold text-gray-800">숙박 일정</h5>
				<div className="grid grid-cols-2 gap-4">
				  <div>
					<label htmlFor="checkInDate" className="text-sm font-medium text-gray-700 block">체크인</label>
					<input
					  required
					  type="date"
					  id="checkInDate"
					  name="checkInDate"
					  value={booking.checkInDate}
					  min={moment().format("MMM Do, YYYY")}
					  onChange={handleInputChange}
					  className="mt-1 w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
					/>
					{validated && !booking.checkInDate && (
					  <p className="mt-2 text-sm text-red-600">체크인 날짜를 선택해주세요</p>
					)}
				  </div>
	  
				  <div>
					<label htmlFor="checkOutDate" className="text-sm font-medium text-gray-700 block">체크아웃</label>
					<input
					  required
					  type="date"
					  id="checkOutDate"
					  name="checkOutDate"
					  value={booking.checkOutDate}
					  min={moment().format("MMM Do, YYYY")}
					  onChange={handleInputChange}
					  className="mt-1 w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
					/>
					{validated && !booking.checkOutDate && (
					  <p className="mt-2 text-sm text-red-600">체크아웃 날짜를 선택해주세요</p>
					)}
				  </div>
				</div>
				{errorMessage && (
				  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
					<p className="text-sm text-red-600">{errorMessage}</p>
				  </div>
				)}
			  </div>
	  
			  <div className="space-y-6">
				<h5 className="text-lg font-semibold text-gray-800">투숙객 인원</h5>
				<div className="grid grid-cols-2 gap-4">
				  <div>
					<label htmlFor="numOfAdults" className="text-sm font-medium text-gray-700 block">성인</label>
					<input
					  required
					  type="number"
					  id="numOfAdults"
					  name="numOfAdults"
					  value={booking.numOfAdults}
					  min={1}
					  placeholder="0"
					  onChange={handleInputChange}
					  className="mt-1 w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
					/>
					{validated && booking.numOfAdults < 1 && (
					  <p className="mt-2 text-sm text-red-600">최소 1명의 성인을 선택해주세요</p>
					)}
				  </div>
	  
				  <div>
					<label htmlFor="numOfChildren" className="text-sm font-medium text-gray-700 block">아동</label>
					<input
					  required
					  type="number"
					  id="numOfChildren"
					  name="numOfChildren"
					  value={booking.numOfChildren}
					  min={0}
					  placeholder="0"
					  onChange={handleInputChange}
					  className="mt-1 w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
					/>
					{validated && booking.numOfChildren < 0 && (
					  <p className="mt-2 text-sm text-red-600">아동이 없는 경우 0을 선택해주세요</p>
					)}
				  </div>
				</div>
			  </div>
			</div>
	  
			<button
			  type="submit"
			  className="mt-8 w-full bg-blue-500 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-transform"
			>
			  예약 진행하기
			</button>
		  </form>
	  
		  {isSubmitted && (
			<div className="border-t border-gray-200 p-8">
			  <BookingSummary
				booking={booking}
				payment={calculatePayment()}
				onConfirm={handleFormSubmit}
				isFormValid={validated}
			  />
			</div>
		  )}
		</div>
	  )

}
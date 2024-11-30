// 선택한 객실의 상세 정보(이미지, 가격, 편의시설)
// 예약 입력 폼(BookingForm) 표시

import React, { useEffect, useState } from "react"
import BookingForm from "../booking/BookingForm"
import { FaUtensils, FaWifi, FaTv, FaWineGlassAlt, FaParking, FaCar, FaTshirt } from "react-icons/fa";
import { useParams } from "react-router-dom"
import { getRoomById } from "../utils/ApiFunctions"

export default function Checkout() {
	const [error, setError] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	// 객실 정보
	const [roomInfo, setRoomInfo] = useState({
		photo: "",
		roomType: "",
		roomPrice: ""
	})

	// URL에서 객실 ID 추출
	const { roomId } = useParams()


	// ===== 객실 정보 조회 =====
	useEffect(() => {
		setTimeout(() => {
			getRoomById(roomId)
				.then((response) => {
					// 객실 정보 저장
					setRoomInfo(response)
					// 로딩 완료
					setIsLoading(false)
				})
				.catch((error) => {
					// 에러 저장
					setError(error)
					// 로딩 완료
					setIsLoading(false)
				})
		}, 1000)
	}, [roomId])

	return (
		<div className="min-h-screen py-12">
		  <section className="container mx-auto px-4">
			<div className="flex flex-col lg:flex-row gap-8">
			  <div className="lg:w-1/3">
				{isLoading ? (
				  <div className="flex items-center justify-center h-96 bg-white rounded-xl shadow-lg animate-pulse">
					<div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent" />
				  </div>
				) : error ? (
				  <div className="p-6 bg-red-50 border border-red-200 rounded-xl text-red-700">{error}</div>
				) : (
				  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
					<div className="relative h-64">
					  <img
						src={`data:image/png;base64,${roomInfo.photo}`}
						alt="Room"
						className="w-full h-full object-cover"
					  />
					  <div className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full font-semibold">
						₩{roomInfo.roomPrice.toLocaleString()}
					  </div>
					</div>
	  
					<div className="p-8 relative z-0">
					  <div className="space-y-6">
						<div>
						  <h3 className="text-2xl font-bold text-gray-800">{roomInfo.roomType}</h3>
						  <p className="text-gray-600 mt-2">Luxury Room with Premium Amenities</p>
						</div>
	  
						<div className="border-t border-gray-100 pt-6">
						  <h4 className="text-lg font-semibold text-gray-800 mb-4">객실 편의시설</h4>
						  <div className="grid grid-cols-2 gap-y-4">
							<div className="flex items-center gap-3 group">
							  <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
								<FaWifi className="text-blue-600 w-5 h-5" />
							  </div>
							  <span className="text-gray-600">초고속 Wifi</span>
							</div>
							<div className="flex items-center gap-3 group">
							  <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
								<FaTv className="text-blue-600 w-5 h-5" />
							  </div>
							  <span className="text-gray-600">넷플릭스</span>
							</div>
							<div className="flex items-center gap-3 group">
							  <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
								<FaUtensils className="text-blue-600 w-5 h-5" />
							  </div>
							  <span className="text-gray-600">조식 포함</span>
							</div>
							<div className="flex items-center gap-3 group">
							  <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
								<FaWineGlassAlt className="text-blue-600 w-5 h-5" />
							  </div>
							  <span className="text-gray-600">미니바</span>
							</div>
							<div className="flex items-center gap-3 group">
							  <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
								<FaCar className="text-blue-600 w-5 h-5" />
							  </div>
							  <span className="text-gray-600">카 서비스</span>
							</div>
							<div className="flex items-center gap-3 group">
							  <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
								<FaParking className="text-blue-600 w-5 h-5" />
							  </div>
							  <span className="text-gray-600">무료 주차</span>
							</div>
							<div className="flex items-center gap-3 group">
							  <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
								<FaTshirt className="text-blue-600 w-5 h-5" />
							  </div>
							  <span className="text-gray-600">세탁 서비스</span>
							</div>
						  </div>
						</div>
					  </div>
					</div>
				  </div>
				)}
			  </div>
	  
			  {/* 예약 입력 폼 */}
			  <div className="lg:w-2/3">
				<BookingForm />
			  </div>
			</div>
		  </section>
		</div>
	  );
}
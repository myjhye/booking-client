import { useEffect } from "react"
import { useState } from "react"
import { cancelBooking, deleteUser, getBookingsByUserId, getUser } from "../utils/ApiFunctions"
import { useNavigate } from "react-router-dom"
import moment from "moment"
import { useAuth } from "./AuthProvider"
import { User, Clock, MapPin, Mail, UserCircle, Key } from 'lucide-react';

export default function Profile() {

	const { user } = useAuth()
	const [userData, setUserData] = useState({
		id: "",
		email: "",
		firstName: "",
		lastName: "",
		roles: [
			{
				id: "",
				name: ""
			}
		]
	})

	const [bookings, setBookings] = useState([
		{
			id: "",
			room: {
				id: "",
				roomType: ""
			},
			checkInDate: "",
			checkOutDate: "",
			bookingConfirmationCode: ""
		}
	])
	const [message, setMessage] = useState("")
	const [errorMessage, setErrorMessage] = useState("")
	const navigate = useNavigate()

	const userEmail = localStorage.getItem("userEmail")
	const token = localStorage.getItem("token")

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const userData = await getUser(userEmail, token)
				setUserData(userData)
			} catch (error) {
				console.error(error)
			}
		}
		fetchUser()
	}, [userEmail])

	useEffect(() => {
		const fetchBookings = async () => {
			try {
				const response = await getBookingsByUserId(userEmail, token)
				setBookings(response)
				console.log(response)
			} catch (error) {
				console.error("Error fetching bookings:", error.message)
				setErrorMessage(error.message)
			}
		}

		fetchBookings()
	}, [userEmail])


	// 예약 취소
	const handleDeleteBooking = async (bookingId) => {
		const confirmed = window.confirm(
			"예약을 취소하시겠습니까? 취소 시 되돌릴 수 없습니다."
		)
		if (confirmed) {
			try {
				await cancelBooking(bookingId)
				setMessage("예약이 성공적으로 취소되었습니다.")
				const response = await getBookingsByUserId(userEmail, token)
				setBookings(response) 
			}
			catch (error) {
				setErrorMessage(error.message)
			}
		}

	}


	// 계정 삭제
	const handleDeleteAccount = async () => {
		const confirmed = window.confirm(
			"정말 계정을 삭제하시겠습니까? 실행 시 되돌릴 수 없습니다."
		)
		if (confirmed) {
			await deleteUser(userEmail)
				.then((response) => {
					setMessage(response.data)
					localStorage.removeItem("token")
					localStorage.removeItem("userId")
					localStorage.removeItem("userRole")
					navigate("/")
					window.location.reload()
				})
				.catch((error) => {
					setErrorMessage(error.data)
				})
		}
	}

	return (
		<div className="max-w-6xl mx-auto px-4 py-8">
			{errorMessage && (
				<div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">
					{errorMessage}
				</div>
			)}
			{message && (
				<div className="bg-green-50 text-green-500 p-4 rounded-lg mb-6">
					{message}
				</div>
			)}

			{user ? (
				<div className="space-y-8">
					<div className="bg-white rounded-xl shadow-sm overflow-hidden">
						<div className="p-6">
							<div className="flex flex-col md:flex-row gap-8">
								<div className="flex-shrink-0">
									<div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100">
										<img
											src="https://themindfulaimanifesto.org/wp-content/uploads/2020/09/male-placeholder-image.jpeg"
											alt="Profile"
											className="w-full h-full object-cover"
										/>
									</div>
								</div>

								<div className="flex-grow space-y-6">
									<div className="space-y-4">
										<div className="flex items-center gap-2 text-gray-600">
											<UserCircle className="w-5 h-5" />
											<span className="font-medium">ID:</span>
											<span>{userData.id}</span>
										</div>

										<div className="flex items-center gap-2 text-gray-600">
											<User className="w-5 h-5" />
											<span className="font-medium">Name:</span>
											<span>{userData.firstName} {userData.lastName}</span>
										</div>

										<div className="flex items-center gap-2 text-gray-600">
											<Mail className="w-5 h-5" />
											<span className="font-medium">Email:</span>
											<span>{userData.email}</span>
										</div>

										<div className="flex items-center gap-2 text-gray-600">
											<Key className="w-5 h-5" />
											<span className="font-medium">Roles:</span>
											<div className="flex gap-2">
												{userData.roles.map((role) => (
													<span
														key={role.id}
														className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
													>
														{role.name}
													</span>
												))}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="bg-white rounded-xl shadow-sm overflow-hidden">
						<div className="p-6">
							<h2 className="text-xl font-semibold mb-6">예약 내역</h2>

							{bookings.length > 0 ? (
								<div className="overflow-x-auto">
									<table className="w-full">
										<thead className="bg-gray-50">
											<tr>
												<th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Booking ID</th>
												<th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Room</th>
												<th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Check In</th>
												<th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Check Out</th>
												<th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
												<th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Option</th>
											</tr>
										</thead>
										<tbody className="divide-y divide-gray-100">
											{bookings.map((booking, index) => (
												<tr key={index} className="hover:bg-gray-50">
													<td className="px-4 py-3 text-sm text-gray-600">
														{booking.bookingConfirmationCode}
													</td>
													<td className="px-4 py-3 text-sm text-gray-600">
														<div className="flex items-center gap-2">
															<MapPin className="w-4 h-4" />
															<span>{booking.room.roomType}</span>
														</div>
													</td>
													<td className="px-4 py-3 text-sm text-gray-600">
														<div className="flex items-center gap-2">
															<Clock className="w-4 h-4" />
															<span>{moment(booking.checkInDate).subtract(1, "month").format("MMM Do, YYYY")}</span>
														</div>
													</td>
													<td className="px-4 py-3 text-sm text-gray-600">
														<div className="flex items-center gap-2">
															<Clock className="w-4 h-4" />
															<span>{moment(booking.checkOutDate).subtract(1, "month").format("MMM Do, YYYY")}</span>
														</div>
													</td>
													<td className="px-4 py-3 text-sm">
														<span className="px-3 py-1 bg-green-50 text-green-600 rounded-full">
															On-going
														</span>
													</td>
													<td className="px-4 py-3 text-sm">
														<button onClick={() => handleDeleteBooking(booking.id)} className="px-3 py-1 bg-red-50 text-red-600 rounded-full">
															예약 취소
														</button>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							) : (
								<div className="text-center py-8 text-gray-500">
									예약 내역이 없습니다
								</div>
							)}
						</div>
					</div>

					<div className="flex justify-center">
						<button
							onClick={handleDeleteAccount}
							className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
						>
							계정 삭제
						</button>
					</div>
				</div>
			) : (
				<div className="text-center py-8 text-gray-500">
					Loading...
				</div>
			)}
		</div>
	);
};
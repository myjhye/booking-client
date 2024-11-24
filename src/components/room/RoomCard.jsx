import { Link } from "react-router-dom";

const RoomCard = ({ room }) => {
    return (
        <div className="w-full p-4">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="flex flex-col md:flex-row">
                    {/* 객실 이미지 */}
                    <div className="w-full md:w-1/3">
                        <img 
                            src={`data:image/png;base64, ${room.photo}`}
                            alt={`${room.roomType} Photo`}
                            className="w-full h-64 md:h-full object-cover"
                        />
                    </div>

                    {/* 객실 내용 */}
                    <div className="w-full md:w-2/3 p-6 flex flex-col justify-between">
                        <div>
                            {/* 객실 유형 & 가격 */}
                            <div className="flex justify-between items-start mb-4">
                                <h2 className="text-2xl font-bold text-gray-800">
                                    {room.roomType}
                                </h2>
                                <p className="text-3xl font-bold text-blue-600">
                                    ₩{Number(room.roomPrice).toLocaleString()}
                                </p>
                            </div>

                            {/* 객실 특징 */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="flex items-center text-gray-600">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                                    </svg>
                                    <span>Single Bed</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2z"></path>
                                    </svg>
                                    <span>Free Wifi</span>
                                </div>
                            </div>
                        </div>

                        {/* 예약 버튼 */}
                        <div className="flex justify-end">
                            <Link
                                to={`bookings/${room.id}`}
                                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
                            >
                                예약하기
                                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RoomCard;
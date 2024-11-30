import { useLocation } from "react-router-dom";
import { CheckCircle, XCircle } from "lucide-react";

export default function BookingSuccess() {
    const location = useLocation()
    const message = location.state?.message
    const error = location.state?.error

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-3xl mx-auto px-4">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    {/* 상단 배너 */}
                    <div className="bg-blue-500 p-6">
                        <h2 className="text-2xl font-bold text-white text-center">
                            예약 상태
                        </h2>
                    </div>

                    {/* 메인 컨텐츠 */}
                    <div className="p-8">
                        {message ? (
                            <div className="text-center">
                                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                                <h3 className="text-2xl font-bold text-green-600 mb-4">
                                    예약이 완료되었습니다!
                                </h3>
                                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                                    <p className="text-green-800 font-medium">
                                        {message}
                                    </p>
                                </div>
                                <div className="space-y-4 text-gray-600">
                                    <p>예약 확인 메일이 곧 발송될 예정입니다.</p>
                                    <p>추가 문의사항이 있으시면 연락 주시기 바랍니다.</p>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center">
                                <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                                <h3 className="text-2xl font-bold text-red-600 mb-8">
                                    예약 중 문제가 발생했습니다
                                </h3>
                                <div className="space-y-4 text-gray-600">
                                    <p className="text-red-800 font-medium">
                                            {error}
                                    </p>
                                    <p>문제가 지속되면 고객센터로 연락 주시기 바랍니다.</p>
                                </div>
                            </div>
                        )}

                        {/* 하단 버튼 */}
                        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => window.location.href = '/'}
                                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium"
                            >
                                홈으로 돌아가기
                            </button>
                            <button
                                onClick={() => window.location.href = '/find-booking'}
                                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
                            >
                                예약 내역 보기
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
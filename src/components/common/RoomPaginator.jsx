// 객실 목록 페이징

export default function RoomPaginator({ currentPage, totalPages, onPageChange }) {
    
    // 총 페이지 수를 기반으로 페이지 번호 배열 생성 --> toalPages가 5면, pageNumbers는 [1, 2, 3, 4, 5]
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <nav className="flex justify-center mt-8">
            <ul className="flex space-x-2">
                {/* 페이지 번호 목록 버튼 */}
                {pageNumbers.map((pageNumber) => (
                    <li key={pageNumber}>
                        <button
                            onClick={() => onPageChange(pageNumber)}
                            className={`px-4 py-2 rounded-md text-sm font-semibold focus:outline-none 
                                ${currentPage === pageNumber 
                                    ? "bg-blue-500 text-white" 
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                }`}
                        >
                            {pageNumber}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

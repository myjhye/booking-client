import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getAllBoards } from '../utils/ApiFunctions';
import Header from '../common/Header';

export default function AllBoards() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 현재 페이지
    const [currentPage, setCurrentPage] = useState(1)
    // 페이지당 객실 수
    const [boardsPerPage] = useState(10)
    // 필터링된 객실 데이터
    const [filteredData, setFilteredData] = useState([])


    const [searchType, setSearchType] = useState('title')
    const [searchKeyword, setSearchKeyword] = useState('')
    const [searchResults, setSearchResults] = useState([])


    const location = useLocation()
    const message = location.state && location.state.message
    const [showNotification, setShowNotification] = useState(!!message)


    useEffect(() => {
        if (showNotification) {
            const timer = setTimeout(() => {
                setShowNotification(false);
            }, 5000); // 5초 후 사라짐

            return () => clearTimeout(timer);
        }
    }, [message])

    useEffect(() => {
        setLoading(true);
        getAllBoards()
            .then((data) => {
                // createdAt을 기준으로 내림차순 정렬
                const sortedBoards = data.sort((a, b) => (
                    new Date(b.createdAt) - new Date(a.createdAt)
                ));
                setData(sortedBoards);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-lg text-gray-600">로딩중...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-lg text-red-600">{error}</div>
            </div>
        );
    }


   // 현재 페이지의 게시글 가져오기
   const indexofLastBoard = currentPage * boardsPerPage;
   const indexOfFirstBoard = indexofLastBoard - boardsPerPage;
   const currentBoards = (searchResults.length > 0 ? searchResults : data).slice(indexOfFirstBoard, indexofLastBoard);

   // 총 페이지 수 계산
   const totalPages = Math.ceil((searchResults.length > 0 ? searchResults : data).length / boardsPerPage);

   // 페이지 번호 배열 생성 (최대 5개 생성)
   const getPageNumbers = () => {
        const pageNumbers = [];
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, startPage + 4);
        
        if (endPage - startPage < 4) {
            startPage = Math.max(1, endPage - 4);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };

    // 페이지 변경 함수
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }


    const handleSearch = () => {
        if (!searchKeyword.trim()) {
            setSearchResults(data)
            return;
        }

        const filtered = data.filter((item) => {
            switch (searchType) {
                case 'title':
                    return item.title.toLowerCase().includes(searchKeyword.toLowerCase())
                case 'author':
                    const fullName = `${item.user.firstName} ${item.user.lastName}`.toLowerCase()
                    return fullName.includes(searchKeyword.toLowerCase())
                case 'content':
                    return item.content.toLowerCase().includes(searchKeyword.toLowerCase())
                default:
                    return false
            }
        });

        setSearchResults(filtered);
        // 검색 후 첫 페이지로 이동
        setCurrentPage(1);
    }


    // Enter 키 이벤트 처리
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };



    return (
        <div className="min-h-screen bg-gray-100">
            <div className={`
                fixed top-4 left-1/2 -translate-x-1/2 z-50 
                transition-all duration-500 ease-in-out
                ${showNotification ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
            `}>
            {message && (
                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-lg">
                    {message}
                </div>
            )}
            </div>
            <Header title={"문의사항"} />
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="mb-10">
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                        {/* Search Bar */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <select 
                                className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                onChange={(e) => setSearchType(e.target.value)}
                                value={searchType}
                            >
                                <option value="title">제목</option>
                                <option value="author">작성자</option>
                                <option value="content">내용</option>
                            </select>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={searchKeyword}
                                    onChange={(e) => setSearchKeyword(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="검색어를 입력하세요"
                                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <button
                                    onClick={handleSearch} 
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                                >
                                    검색
                                </button>
                            </div>
                        </div>

                        {/* New Post Button */}
                        <Link
                            to="/inquiries/createOrEdit"
                            className="px-6 py-2 bg-green-600 text-white text-center rounded-lg hover:bg-green-700 transition-colors duration-200"
                        >
                            문의하기
                        </Link>
                    </div>
                </div>

                {/* Board Table */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th scope="col" className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        번호
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        제목
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        작성자
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        작성일
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {currentBoards.map((inquiry) => (
                                    <tr 
                                        key={inquiry.id} 
                                        className="hover:bg-gray-50 transition-colors duration-200"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {inquiry.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Link
                                                to={`/inquiries/${inquiry.id}`}
                                                className="text-sm text-gray-900 hover:text-blue-600 transition-colors duration-200"
                                            >
                                                {inquiry.title}
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {`${inquiry.user.firstName || ''} ${inquiry.user.lastName || ''}`}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(inquiry.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-8 flex justify-center">
                        <nav className="flex items-center gap-2">
                            <button 
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`px-4 py-2 rounded-lg text-sm font-medium
                                    ${currentPage === 1 
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50'} 
                                    transition-colors duration-200`}
                            >
                                이전
                            </button>
                            
                            {getPageNumbers().map(number => (
                                <button
                                    key={number}
                                    onClick={() => handlePageChange(number)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium
                                        ${currentPage === number
                                            ? 'bg-blue-600 text-white'
                                            : 'border border-gray-300 text-gray-700 hover:bg-gray-50'}
                                        transition-colors duration-200`}
                                >
                                    {number}
                                </button>
                            ))}
                            
                            <button 
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`px-4 py-2 rounded-lg text-sm font-medium
                                    ${currentPage === totalPages 
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50'} 
                                    transition-colors duration-200`}
                            >
                                다음
                            </button>
                        </nav>
                    </div>
                )}
            </div>
        </div>
    );
}
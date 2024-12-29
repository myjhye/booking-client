import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DeleteBoard, getBoardByBoardId } from '../utils/ApiFunctions';

export default function BoardDetail() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { boardId } = useParams();

    const userEmail = localStorage.getItem("userEmail")

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        getBoardByBoardId(boardId)
            .then((data) => {
                setData(data);
                setLoading(false);
            })
    }, [boardId]);

    if (loading) return <div>로딩중...</div>;
    if (error) return <div>{error}</div>;
    if (!data) return <div>게시글을 찾을 수 없습니다.</div>;

    const isAuthor = () => {
        return userEmail === data.user.email;
    };

    // 수정 버튼 클릭
    const handleEdit = () => {
        navigate(`/boards/edit/${boardId}`, {
            state: {
                boardData: data
            }
        })
    }

    // 삭제 버튼 클릭
    const handleDelete = async () => {
        if (window.confirm('정말로 이 게시물을 삭제하시겠습니까?')) {
            try {
                const deleted = await DeleteBoard(boardId)
                navigate('/boards')
                alert('게시글이 성공적으로 삭제되었습니다.')
            }
            catch (error) {
                alert('게시글 삭제 중 오류가 발생했습니다.');
                console.error('Delete error:', error);
            }
        }
    }

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <div className="mb-6">
                <h1 className="text-3xl font-bold mb-10">{data.title}</h1>
                <div className="flex justify-between text-gray-600 text-sm mb-4">
                    <span>작성자:  {`${data.user.firstName || ''} ${data.user.lastName || ''}`}</span>
                    <span>작성일: {new Date(data.createdAt).toLocaleString()}</span>
                </div>
                <hr className="my-4" />
                <div className="prose max-w-none">
                    <p className="whitespace-pre-wrap">{data.content}</p>
                </div>
            </div>

            <div className="flex justify-between mt-8">
                <button
                    onClick={() => window.history.back()}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                    목록으로
                </button>
                
                {/* 작성자인 경우에만 수정/삭제 버튼 표시 */}
                {isAuthor() && (
                    <div className="space-x-2">
                        <button 
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            onClick={handleEdit}
                        >
                            수정
                        </button>
                        <button 
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            onClick={handleDelete}
                        >
                            삭제
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
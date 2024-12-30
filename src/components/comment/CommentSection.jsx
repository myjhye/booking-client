import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CreateComment, deleteComment, GetCommentsByBoardId, updateComment } from '../utils/ApiFunctions';

export default function CommentSection() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedContent, setEditedContent] = useState('');

  const { boardId } = useParams();

  const userRole = localStorage.getItem("userRole")


  // 댓글 조회
  useEffect(() => {
    const fetchComments = async () => {
        try {
            const commentList = await GetCommentsByBoardId(boardId)
            setComments(commentList.map((comment) => ({
                id: comment.id,
                content: comment.content,
                author: comment.user.firstName + ' ' + comment.user.lastName,
                createdAt: comment.createdAt,
                boardId: comment.boardId,
                userEmail: comment.user.email,
            })));
        }
        catch (error) {
            console.error('댓글 조회 중 오류 발생:', error);
            alert(error.message);
        }
    };

    if (boardId) {
        fetchComments();
    }
  }, [boardId]);


  
  const canCreateComment = () => {
    return userRole === 'ROLE_ADMIN';
  }


  const handleEditComment = (commentId) => {
    setEditingCommentId(commentId)
    
    const comment = comments.find((c) => c.id === commentId)
    setEditedContent(comment.content)
  }


  const handleSaveEdit = async (commentId) => {
    if (!editedContent.trim()) {
        alert('댓글 내용을 입력해주세요.');
        return;
    }

    try {
        await updateComment(commentId, {
            content: editedContent
        })

        const updatedComments = await GetCommentsByBoardId(boardId)
        setComments(updatedComments.map((comment) => ({
            id: comment.id,
            content: comment.content,
            author: comment.user.firstName + ' ' + comment.user.lastName,
            createdAt: comment.createdAt,
            boardId: comment.boardId,
            userEmail:comment.user.email
        })))

        // 수정 모드 종료
        setEditingCommentId(null);
        setEditedContent('');
    }
    catch (error) {
        console.error('댓글 수정 중 오류 발생:', error);
        alert(error.message);
    }
  }


  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditedContent('');
  };


  const handleDeleteComment = async (commentId) => {
    if (window.confirm('정말로 이 댓글을 삭제하시겠습니까?')) {
        try {
            const success = await deleteComment(commentId);

            if (success) {
                const updatedComments = await GetCommentsByBoardId(boardId)
                setComments(updatedComments.map((comment) => ({
                    id: comment.id,
                    content: comment.content,
                    author: comment.user.firstName + ' ' + comment.user.lastName,
                    createdAt: comment.createdAt,
                    boardId: comment.boardId,
                    userEmail: comment.user.email,
                })))
            }
        }
        catch (error) {
            console.error('댓글 삭제 중 오류 발생:', error);
            alert(error.message);
        }
    }
  }



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
        alert('댓글 내용을 입력해주세요.')
        return;
    }

    try {
        const commentData = {
            content: newComment,
            board: {
                id: boardId,
            }
        }

        // 댓글 생성 API
        await CreateComment(commentData);

        // 댓글 생성 후 댓글 목록 다시 조회
        const updatedComments = await GetCommentsByBoardId(boardId);
        setComments(updatedComments.map((comment) => ({
            id: comment.id,
            content: comment.content,
            author: comment.user.firstName + ' ' + comment.user.lastName,
            createdAt: comment.createdAt,
            boardId: comment.boardId,
            userEmail:comment.user.email,
        })));
        setNewComment('');
    }

    catch (error) {
      console.error('댓글 작성 중 오류 발생:', error);
      alert(error.message);
    }
  };

  return (
    <div className="mt-12">
      <h2 className="text-xl font-bold mb-4">댓글</h2>
      
      {/* 댓글 입력 폼 */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex flex-col space-y-2">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows="3"
            placeholder={canCreateComment() 
              ? "댓글을 입력하세요..." 
              : "어드민 권한만 작성 가능합니다."
            }
            className={`w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 
                ${canCreateComment() 
                  ? 'focus:ring-blue-500' 
                  : 'bg-gray-100 cursor-not-allowed'
                }`}
            disabled={!canCreateComment()}
          />
          {canCreateComment() && (
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                    댓글 작성
                </button>
                </div>
            )}
            </div>
        </form>

      {/* 댓글 목록 */}
      {comments.length === 0 ? (
        <p className="text-center text-gray-500">아직 작성된 댓글이 없습니다.</p>
      ) : (
        <div className="space-y-4">
            {comments.map((comment) => (
                <div key={comment.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center mb-2">
                        <span className="font-semibold">{comment.author}</span>
                        {localStorage.getItem("userEmail") === comment.userEmail && (
                            <div className="flex gap-2 ml-4">
                                {editingCommentId !== comment.id ? (
                                    <>
                                        <button
                                            className="text-blue-500 hover:text-blue-700 text-sm"
                                            onClick={() => handleEditComment(comment.id)}
                                        >
                                            수정
                                        </button>
                                        <button
                                            className="text-red-500 hover:text-red-700 text-sm"
                                            onClick={() => handleDeleteComment(comment.id)}
                                        >
                                            삭제
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button 
                                            className="text-green-500 hover:text-green-700 text-sm font-medium"
                                            onClick={() => handleSaveEdit(comment.id)}
                                        >
                                            저장
                                        </button>
                                        <button 
                                            className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                                            onClick={() => handleCancelEdit()}
                                        >
                                            취소
                                        </button>
                                    </>
                                )}
                            </div>
                        )}
                        <span className="text-sm text-gray-500 ml-auto">
                            {new Date(comment.createdAt).toLocaleString()}
                        </span>
                    </div>
                    {editingCommentId === comment.id ? (
                        <textarea
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                            className="w-full p-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]"
                            autoFocus
                        />
                    ) : (
                        <p className="text-gray-700 text-left">{comment.content}</p>
                    )}
                </div>
            ))}
        </div>
      )}
    </div>
  );
};
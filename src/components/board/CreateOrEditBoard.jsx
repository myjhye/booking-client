import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBoard } from '../utils/ApiFunctions';

export default function CreateOrEditBoard() {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        content: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.title.trim() || !formData.content.trim()) {
            setError('제목과 내용을 모두 입력해주세요.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await createBoard({
                title: formData.title.trim(),
                content: formData.content.trim(),
            });
            navigate('/inquiries', {
                state: {
                    message: "게시글이 성공적으로 작성되었습니다."
                }
            });
        } catch (err) {
            setError(err.message);
            window.scrollTo(0, 0);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-xl shadow-sm p-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                        문의사항 작성
                    </h1>

                    {error && (
                        <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-lg text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* 제목 입력 */}
                        <div>
                            <label 
                                htmlFor="title" 
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                제목
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="제목을 입력해주세요"
                            />
                        </div>

                        {/* 내용 입력 */}
                        <div>
                            <label 
                                htmlFor="content" 
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                내용
                            </label>
                            <textarea
                                id="content"
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                required
                                rows={10}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                placeholder="문의하실 내용을 자세히 작성해주세요"
                            />
                        </div>

                        {/* 버튼 그룹 */}
                        <div className="flex justify-center gap-4 pt-4">
                            <button
                                type="button"
                                onClick={() => navigate('/inquiries')}
                                className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                            >
                                취소
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200 
                                    ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {loading ? '제출 중...' : '작성하기'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
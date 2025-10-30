import React, { useState, useEffect } from "react";
import { FaReply, FaEllipsisV, FaStar } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { useAuthContext } from "../../context/useAuthContext";

interface ReviewProps {
    productId: number;
}

interface Review {
    id: number;
    name: string;
    date: string;
    rating: number;
    text: string;
    likes: number;
    likedBy: string[];
    color: string;
    productId: number;
    replies: { id: number; text: string; user: string; date: string }[];
}

//Function to generate random color
const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};


const Review: React.FC<ReviewProps> = ({ productId }) => {
    const { user } = useAuthContext();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [newReview, setNewReview] = useState("");
    const [rating, setRating] = useState(0);
    // const [user, setUser] = useState<{ name: string; role: string } | null>(null);
    const [replyText, setReplyText] = useState<string>("");
    const [replyReviewId, setReplyReviewId] = useState<number | null>(null);

    // Save reviews to localStorage whenever they change
    useEffect(() => {
        if (reviews.length > 0) {
            localStorage.setItem(`reviews_product_${productId}`, JSON.stringify(reviews));
        }
    }, [reviews, productId]);

    useEffect(() => {
        const storedReviews = localStorage.getItem(`reviews_product_${productId}`);

        if (storedReviews) {
            const filteredReviews = JSON.parse(storedReviews).filter(
                (rev: Review) => rev.productId === productId
            );

            // Step 2: Assign color (if not already present)
            const reviewsWithColor = filteredReviews.map((rev: Review) => ({
                ...rev,
                color: rev.color || generateRandomColor(),
                likedBy: rev.likedBy || [],   // prevent undefined
                replies: rev.replies || [],
            }));

            setReviews(reviewsWithColor);
        }
    }, [productId]);

    const handleAddReview = (productId: number) => {
        if (!newReview.trim() || rating === 0) return;

        // Get the logged-in user's name from localStorage (or from wherever you store it)
        if (!user) {
            alert("Please log in to post a review!");
            return;
        }

        const newEntry: Review = {
            id: Date.now(),
            name: user.name, // Get the name of the logged-in user
            date: new Date().toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
            }),
            rating,
            text: newReview,
            likes: 0,
            likedBy: [],
            color: generateRandomColor(),
            productId,
            replies: [],
        };

        setReviews([newEntry, ...reviews]);
        setNewReview("");
        setRating(0);
    };

    const handleLike = (id: number) => {
        if (!user) {
            alert("Please log in to like a review!");
            return;
        }

        setReviews((prev) =>
            prev.map((rev) => {
                if (rev.id === id) {
                    const alreadyLiked = rev.likedBy.includes(user.name);

                    return {
                        ...rev,
                        likedBy: alreadyLiked
                            ? rev.likedBy.filter((u) => u !== user.name) // remove like
                            : [...rev.likedBy, user.name],              // add like
                        likes: alreadyLiked ? rev.likes - 1 : rev.likes + 1,
                    };
                }
                return rev;
            })
        );
    };

    const handleReplyClick = (reviewId: number) => {
        setReplyReviewId(reviewId)
    }

    const handleAddReply = (reviewId: number) => {
        if (!replyText.trim()) return;

        const newReply = {
            id: Date.now(),
            text: replyText,
            user: user ? user.name : "Anonymous",
            date: new Date().toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
            }),
        };

        setReviews((prev) =>
            prev.map((rev) =>
                rev.id === reviewId
                    ? {
                        ...rev,
                        replies: [...rev.replies, newReply],
                    }
                    : rev
            )
        );

        setReplyText("");
        setReplyReviewId(null);
    };


    return (
        <div className="w-full md:p-6">
            {/* Review Input */}
            <div className="bg-white w-full shadow-lg rounded-sm p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Add a Review</h2>

                {/* Rating Stars */}
                <div className="flex items-center gap-2 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                            key={star}
                            size={24}
                            onClick={() => setRating(star)}
                            className={`cursor-pointer transition-colors ${star <= rating ? "text-yellow-400" : "text-gray-300"
                                }`}
                        />
                    ))}
                </div>

                {/* Review Input Box */}
                <textarea
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    placeholder="Write your review..."
                    className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    rows={3}
                ></textarea>

                <button
                    onClick={() => handleAddReview(productId)}
                    className="mt-3 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-sm shadow-md transition"
                >
                    Post Review
                </button>
            </div>

            {/* Reviews List */}
            <h2 className="text-gray-500 text-lg font-semibold px-4 mt-4">Reviews and Rating</h2>
            <div className="mt-4 space-y-3">
                {reviews.map((rev) => (
                    <div
                        key={rev.id}
                        className="bg-white shadow-sm rounded-sm p-5 flex flex-col gap-3 border-2 border-gray-200"
                    >
                        <div className="flex">
                            {/* Header */}
                            <div className="flex w-full justify-between items-start">
                                <div className="flex gap-3 h-fit ">
                                    <div
                                        className="w-10 h-10 rounded-full overflow-hidden cursor-pointer flex items-center justify-center text-white font-bold text-xl"
                                        style={{ backgroundColor: rev.color }} // Apply the background color from the `rev.color` property
                                    >
                                        {rev.name
                                            .split(" ")
                                            .map((word, index, arr) =>
                                                index === 0 || index === arr.length - 1 ? word.charAt(0) : ""
                                            )
                                            .join("")}
                                    </div>
                                    <div className="flex flex-col">
                                        <h3 className="font-semibold text-gray-900">{rev.name}</h3>
                                        <p className="text-xs text-gray-500">{rev.date}</p>
                                    </div>

                                </div>

                                {/* Rating */}
                                <div className="flex gap-1 ml-auto">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <FaStar
                                            key={star}
                                            size={18}
                                            className={
                                                star <= rev.rating ? "text-yellow-400" : "text-gray-300"
                                            }
                                        />
                                    ))}
                                </div>
                                <FaEllipsisV className="text-gray-500 cursor-pointer ml-10" />
                            </div>
                        </div>

                        {/* Review Text */}
                        <p className="text-gray-700">{rev.text}</p>

                        {/* Actions */}
                        <div className="flex gap-6 mt-2 text-sm text-gray-600">
                            <button
                                onClick={() => handleLike(rev.id)}
                                className={`flex items-center gap-2 transition ${rev.likedBy.includes(user?.name || "") ? "text-blue-500" : "text-gray-400"
                                    }`}
                            >
                                <AiFillLike size={20} />
                                {rev.likes}
                            </button>
                            <button
                                onClick={() => handleReplyClick(rev.id)}
                                className="flex items-center gap-2 hover:text-blue-500 transition"
                            >
                                <FaReply /> Reply
                            </button>
                        </div>

                        {/* Reply Input (Toggled by Reply Button) */}
                        {replyReviewId === rev.id && (
                            <div className="mt-4">
                                <textarea
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    placeholder="Write your reply..."
                                    className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
                                    rows={3}
                                ></textarea>
                                <button
                                    onClick={() => handleAddReply(rev.id)}
                                    className="mt-3 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-md transition"
                                >
                                    Post Reply
                                </button>
                            </div>
                        )}

                        {/* Replies List */}
                        {rev.replies && rev.replies.length > 0 && (
                            <div className="mt-4 space-y-6">
                                {rev.replies.map((reply) => (
                                    <div key={reply.id} className="pl-8 border-l-2 border-gray-300 bg-gray-100 p-3">
                                        <div className="flex gap-3 h-fit ">
                                            <div
                                                className="w-10 h-10 rounded-full overflow-hidden cursor-pointer flex items-center justify-center text-white font-bold text-xl"
                                                style={{ backgroundColor: rev.color }} // Apply the background color from the `rev.color` property
                                            >
                                                {reply.user
                                                    .split(" ")
                                                    .map((word, index, arr) =>
                                                        index === 0 || index === arr.length - 1 ? word.charAt(0) : ""
                                                    )
                                                    .join("")}
                                            </div>

                                            <div className="flex flex-col">
                                                <div className="text-sm text-gray-600 font-semibold">{reply.user}</div>
                                                <p className="text-xs text-gray-500">{reply.date}</p>
                                            </div>

                                        </div>
                                        <div className="text-sm text-gray-700 mt-3">{reply.text}</div>
                                    </div>
                                ))}
                            </div>
                        )}

                    </div>
                ))}
            </div>
        </div>
    );
};

export default Review;

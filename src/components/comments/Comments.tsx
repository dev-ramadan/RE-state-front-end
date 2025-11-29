import { useEffect, useState } from "react";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { Check, Delete, Edit, MessagesSquareIcon, ThumbsUp, User, X } from "lucide-react";
import InputField from "../../ui/InputField";
import { deleteUserComment, editUserComment, getPropertyComments, postComment } from "../../services/commentsService";
import type { CommentResponse } from "../../types/Responses";
import { useAuth } from "../../context/AuthContext";
import type { UserProfile } from "../../types/User";
import { getUserById } from "../../services/ProfileService";
import { commentLike } from "../../services/LikesServices";

type CommentProps = {
  id: string;
};

const Comments = ({ id }: CommentProps) => {
  const [commentText, setCommentText] = useState("");
  const [editCommentId, setEditCommentId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [comments, setComments] = useState<CommentResponse[]>([]);
  const [refresh, setRefresh] = useState(false);

  const [usersData, setUsersData] = useState<Record<string, UserProfile>>({});

  const { user } = useAuth();

  // -----------------------------
  //       Fetch comments + users
  // -----------------------------
useEffect(() => {
  const fetchData = async () => {
    const commentsData = await getPropertyComments(id);
    setComments(commentsData || []);

    if (!commentsData?.length) return;

    const userIds: any[] = [
      ...new Set(commentsData.map((c: CommentResponse) => String(c.userID)))
    ];

    // جلب بيانات المستخدمين
    const users = await Promise.all(
      userIds.map(async (uId: string) => {
        const res = await getUserById(uId); 
        return { id: uId, data: res.data as UserProfile };
      })
    );

    const formatted: Record<string, UserProfile> = {};
    users.forEach((u) => {
      formatted[u.id] = u.data;
    });

    setUsersData(formatted);
  };

  fetchData();
}, [id, refresh]);


  // -----------------------------
  //         Add Comment
  // -----------------------------
  const handleAddComment = async () => {
    if (!commentText.trim()) return;

    await postComment({ commentText, propertyId: id });
    setCommentText("");
    setRefresh((prev) => !prev);
  };

  // -----------------------------
  //        Edit Comment
  // -----------------------------
  const handleEditComment = async (cid: string) => {
    await editUserComment(cid, editValue);
    setEditCommentId(null);
    setEditValue("");
    setRefresh((prev) => !prev);
  };

  // -----------------------------
  //       Delete Comment
  // -----------------------------
  const handleDeleteComment = async (cid: string) => {
    await deleteUserComment(cid);
    setRefresh((prev) => !prev);
  };

  // -----------------------------
  //        Likes (Per Item)
  // -----------------------------
  const handleLike = async (item: CommentResponse) => {
    const response = await commentLike(item.commentId);

    const updated = comments.map((c) =>
      c.commentId === item.commentId
        ? {
            ...c,
            likesCount: response.data === "Added" ? c.likesCount + 1 : c.likesCount - 1,
            isLiked: response.data === "Added",
          }
        : c
    );

    setComments(updated);
  };

  return (
    <section className="mb-36">

      {/* Input Box */}
      <div className="relative">
        <InputField id="comment">
          <Button
            onClick={handleAddComment}
            className="absolute right-2 top-2.5 w-fit text-sm md:text-lg"
            icon={<MessagesSquareIcon />}
          >
            Add Comment
          </Button>

          <Input
            type="text"
            placeholder="Write a comment..."
            className="p-6 bg-white text-black border-gray-300 outline-none"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
        </InputField>
      </div>

      {/* Comments List */}
      <div className="p-3 border-2 border-gray-400 h-72 overflow-y-auto space-y-3 mt-6 rounded-lg">

        {comments.length === 0 ? (
          <p className="text-gray-500 text-center mt-8">No comments yet.</p>
        ) : (
          comments.map((item) => (
            <div
              key={item.commentId}
              className="flex flex-col sm:flex-row sm:items-start gap-3 border border-gray-200 rounded-md p-3 bg-gray-50"
            >

              {/* User + Text */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <User className="text-blue-500" size={18} />
                  <span className="text-sm font-semibold">
                    {usersData[item.userID!]?.username || "Unknown User"}
                  </span>
                </div>

                {editCommentId === item.commentId ? (
                  <Input
                    value={editValue}
                    className="w-full outline-none"
                    onChange={(e) => setEditValue(e.target.value)}
                  />
                ) : (
                  <p className="text-sm font-medium text-gray-800 break-words">
                    {item.commentText}
                  </p>
                )}
              </div>

              {/* Right-side buttons */}
              <div className="flex items-center justify-between sm:flex-col sm:justify-start gap-3 sm:gap-2">

                {/* Like */}
                <button
                  onClick={() => handleLike(item)}
                  className="flex items-center gap-1 px-3 py-1 text-sm rounded-md bg-white hover:bg-gray-100 transition w-fit"
                >
                  <ThumbsUp
                    size={16}
                    className={`${item.isLiked ? "text-blue-600 fill-blue-600" : "text-gray-600"}`}
                  />
                  <span>{item.likesCount}</span>
                </button>

                {/* Edit + Delete */}
                <div className="flex items-center gap-3 text-gray-600">
                  {editCommentId === item.commentId ? (
                    <>
                      <Check
                        size={20}
                        onClick={() => handleEditComment(item.commentId!)}
                        className="cursor-pointer hover:text-green-600"
                      />
                      <X
                        size={20}
                        onClick={() => setEditCommentId(null)}
                        className="cursor-pointer hover:text-red-600"
                      />
                    </>
                  ) : (
                    user?.userId === item.userID && (
                      <>
                        <Edit
                          size={18}
                          onClick={() => {
                            setEditCommentId(item.commentId!);
                            setEditValue(item.commentText);
                          }}
                          className="cursor-pointer hover:text-blue-600"
                        />
                        <Delete
                          size={18}
                          onClick={() => handleDeleteComment(item.commentId!)}
                          className="cursor-pointer hover:text-red-600"
                        />
                      </>
                    )
                  )}
                </div>

              </div>

            </div>
          ))
        )}

      </div>

    </section>
  );
};

export default Comments;

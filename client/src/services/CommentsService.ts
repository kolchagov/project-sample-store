import User from "../model/User"
import Requester from "./Requester"

const BASE_URL = "http://localhost:3030/data"

export type CommentType = {
    _id?: string,
    _createdOn?: number,
    _ownerId?: string,
    author?: User,
    productId: string,
    rating: number,
    content: string,
}

class CommentsService {
    static async getComments(productId: string | undefined) {
        if (!productId) return []
        const params = new URLSearchParams({
            where: `productId="${productId}"`,
            load: "author=_ownerId:users"
        })
        const comments = await Requester.get(`${BASE_URL}/comments?${params.toString()}`
        ) as CommentType[]
        return comments
    }

    static async getComment(commentId: string) {
        const comment = await Requester.get(`${BASE_URL}/comments/${commentId}`) as CommentType
        return comment
    }
    static async addComment(comment: CommentType) {
        const persistedComment = await Requester.post(`${BASE_URL}/comments`, comment)
        return persistedComment
    }

    static async editComment(commentId: string, comment: CommentType) {
        const persistedComment = await Requester.put(`${BASE_URL}/comments/${commentId}`, comment)
        return persistedComment
    }

    static async deleteComment(commentId: string) {
        await Requester.del(`${BASE_URL}/comments/${commentId}`)
    }
}

export default CommentsService
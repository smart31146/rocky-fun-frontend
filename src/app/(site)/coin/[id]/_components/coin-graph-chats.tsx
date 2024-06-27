"use client"

import dayjs from "dayjs"
import { ComponentPropsWithoutRef, useEffect, useState } from "react"
import UserCommentCard from "@/components/customs/custom-cards/user-comment-card"
import { useGeneralModal } from "@/components/customs/custom-modals/general-modal/hooks"
import { useModalOpenSelector } from "@/components/customs/custom-modals/general-modal/hooks/use-general-modal"
import { Button } from "@/components/ui/button"
import { cn } from "@/libs/utils/tailwind"

import { addComment } from "@/api/coin"
import { getCommentsByCoin } from "@/api/comment"

const CoinGraphChats = ({ className, coinId }: Props) => {
  const openModal = useGeneralModal(useModalOpenSelector)
  const [list, setList] = useState<any[]>([])

  const fetchComments = async () => {
    if (coinId !== undefined) {
      const { data } = await getCommentsByCoin(coinId)
      setList(data)
    }
  }

  const handleOpenAddComment = () => {
    openModal("AddReply", {
      title: "Post a reply",
      type: "modal",
      actions: [],
      async onSubmit(data, modaler) {
        if (coinId !== undefined) {
          // Add new comment
          await addComment({ coinId: coinId, comment: data.reply })
          // Fetch the new ones
          fetchComments()
        }
        return true
      },
      autoCloseOnSuccess: true,
      autoCloseOnError: false,
    })
  }

  useEffect(() => {
    if (coinId !== undefined) {
      fetchComments()
    }
  }, [coinId])

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {list.map((comment, index) => {
        return (
          <div key={index}>
            <UserCommentCard
              avatar={comment?.user?.avatar}
              color="#B99000"
              name={comment?.user?.username}
              createdAt={dayjs(comment.createdAt).toISOString()}
              comment={comment.comment}
              isDev={comment.dev}
            />
          </div>
        )
      })}

      <div>
        <Button
          type="button"
          size="sm"
          variant="muted"
          className="mt-4 block min-w-[95px] border border-white !bg-[#86817F]"
          onClick={handleOpenAddComment}
        >
          Post a reply
        </Button>
      </div>
    </div>
  )
}

interface Props {
  className?: string
  coinId?: number
}

export default CoinGraphChats

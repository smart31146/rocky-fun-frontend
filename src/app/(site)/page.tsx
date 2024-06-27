"use client"

import { getCoins } from "@/api/coin"
import { CoinCard } from "@/components/customs/custom-cards/coin-card"
import { Pagination } from "@/components/ui/pagination-z"
import { cn } from "@/libs/utils/tailwind"
import Image from "next/image"
import { useEffect, useState } from "react"
import HomeFilter from "./_components/home-filter"
import HomeProductContainer, {
  HomeProductsFormSchemaState,
} from "./_components/home-product-container"
import HomeProducts from "./_components/home-products"

export interface MyPageProps {}

const MyPage = (props: MyPageProps) => {
  const [coins, setCoins] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPage, setTotalPage] = useState(0)
  const [filter, setFilter] = useState<HomeProductsFormSchemaState>({
    orderByField: "bumpOrder",
    orderBy: "desc",
    search: "",
    enableAnimations: true,
    nsfw: true,
  })

  const fetchCoins = async () => {
    const filterPayload = { ...filter }
    // @ts-ignore
    delete filterPayload.enableAnimations

    const { data, meta } = await getCoins(currentPage, filterPayload)

    setCoins(data || [])
    setTotalPage(meta ? Math.ceil(meta.total / meta.size) : 0)
  }

  useEffect(() => {
    fetchCoins()
  }, [currentPage, filter])

  console.log(coins)

  return (
    <section className="mt-10">
      <header className="mb-2 flex flex-col items-center text-center">
        {coins[0] && (
          <>
            <h1
              className={cn(
                "font-zen-dots",
                "border border-transparent p-2 py-[3px] text-2xl font-normal leading-6 md:py-2",
                "mx-auto font-zen-dots",
                "transition-border duration-300",
              )}
            >
              <span className="text-primary">King</span> of the{" "}
              <span className="text-primary">Moon</span>
            </h1>
          </>
        )}
      </header>

      {coins[0] && (
        <div className="container flex items-center justify-center">
          <div className="relative mx-auto mb-5 inline-block max-w-[450px] items-center justify-center border border-primary bg-card md:mb-14 ">
            <CoinCard
              className={cn(
                "items-center p-3",
                "[&_.createdBy]:rounded-md [&_.createdBy]:border",
                "[&_.createdBy]:border-[#B99000] [&_.createdBy]:p-1",
                "[&_.createdBy]:text-xs",
              )}
              data={coins[0]}
              hideDescription
              highlightName
              hoverable
            />

            <div
              className={cn(
                "-left-[18px] -top-[calc(44px/2)] md:-left-[calc(75px/2)] md:-top-[calc(75px/2)]",
                "h-[44px] w-[44px] md:h-[75px] md:w-[75px]",
                "absolute flex",
                "items-center justify-center rounded-full border border-primary bg-card",
              )}
            >
              <Image
                src="/assets/king.svg"
                width={60}
                height={60}
                className="h-[60px] w-[60px]"
                alt="King"
              />
            </div>
          </div>
        </div>
      )}

      <HomeProductContainer defaultFilter={filter} onChange={setFilter}>
        <HomeFilter />
        <HomeProducts data={coins} />
      </HomeProductContainer>

      {coins.length > 0 && totalPage && (
        <div className="flex items-center justify-center pt-16">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </section>
  )
}

export default MyPage

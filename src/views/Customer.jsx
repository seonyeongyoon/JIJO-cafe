import MenuTitle from "@/components/MenuTitle"
import PageMainTitle from "@/components/PageMainTitle"
import { Helmet } from "react-helmet-async"
import Button from "@/components/Button"

function Customer() {
  return (
    <>
      <Helmet>
        <title>지조소식 - 고객의 소리</title>
      </Helmet>
      <MenuTitle title="JIJO NEWS"> JIJO 고객의 소리</MenuTitle>
      <section className="max-w-screen-xl mx-auto px-5 py-jj_60 text-deepDarkGray">
        <PageMainTitle pageTitleText="고객의 소리" pageSubTitleText="문의가 많은 사항의 경우 FAQ를 통해 빠르게 확인하실 수 있습니다."></PageMainTitle>
        <div className="flex flex-col items-center gap-20">
          <Button color="primary" className="px-[1.875rem]">
            FAQ 바로가기
          </Button>
          <div className="border gap-5 items-center flex-col flex px-[0.9375rem] py-[1.875rem]">
            <p className="text-jj_22">CS 관련 문의</p>
            <p>고객님의 편의와 질 높은 서비스를 위해 노력하겠습니다.</p>
            <p>(매장/서비스/APP 불편사항 접수)</p>
            <Button color="white" className="w-full">
              접수하기
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}

export default Customer

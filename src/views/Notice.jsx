import { Helmet } from 'react-helmet-async'
import { useEffect } from 'react'
import pb from '@/api/pocketbase'
import MenuTitle from '@/components/MenuTitle'
import NoticeList from '@/components/Notice/NoticeList'
import { useState } from 'react'
import NoticeSearchFilter from '@/components/Notice/NoticeSearchFilter'

function Notice() {
  const [searchOption, setSearchOption] = useState('noticeTitle') //select 태그
  const [searchText, setSearchText] = useState('') //input 창
  const [reload, setReload] = useState(true) //검색버튼 클릭시 pb 다시 작동하도록
  const [data, setData] = useState(null)
  const [status, setStatus] = useState('pending')

  useEffect(() => {
    const fetchData = async () => {
      setStatus('loading')
      try {
        let noticeItems
        if (!searchText) {
          noticeItems = await pb.collection('notices').getFullList()
          console.log(noticeItems)
        } else {
          const response = await pb.collection('notices').getList(1, 10, {
            filter: `(${searchOption} ~ '${searchText}')`,
            // 필터 수정중
          })
          noticeItems = response.items
          console.log(noticeItems)
        }

        setData(noticeItems)
        // console.log(noticeItems)
        // console.log(data)
        setStatus('success')
      } catch (error) {
        setStatus('error')
      }
    }
    if (reload) {
      fetchData()
      setReload(false) //  fetchdata가 실행되면 flase로 바꿔줘서 리랜더를 막아주기 , 버튼 눌렀을때맏 다시 검색을 하게 되는중
    }
  }, [reload])

  // const [views, setViews] = useState(0);
  // error 상태 사용?

  const handleReload = () => {
    setReload(true)
  }

  // const handleViewClick = () => {
  //   // 조회수+1 증가
  //   setViews(views + 1)
  // }

  return (
    <>
      <Helmet>
        <title>지조소식 - 공지사항</title>
      </Helmet>

      <MenuTitle title="JIJO NEWS"> JIJO NOTICE</MenuTitle>

      <section className="max-w-screen-xl mx-auto px-5 py-jj_60">
        <div className="text-center ">
          <h2 className="text-jj_43 font-bold ">카페 지조 공지사항</h2>
          <p className="m-10"> 카페 지조 소식을 알려드립니다.</p>
        </div>
        <NoticeSearchFilter handleReload={handleReload} option={searchOption} onChangeOption={setSearchOption} text={searchText} onChangeText={setSearchText}></NoticeSearchFilter>
        {/* 상태를 props로 NoticeSearchFilter에 전달 */}
        <NoticeList data={data}></NoticeList>
      </section>
    </>
  )
}

export default Notice

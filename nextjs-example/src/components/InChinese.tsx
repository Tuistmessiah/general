'use client'

import { useEffect } from "react"

export default function InChinese() {
    useEffect(() => {
        console.log('useEffect')
        const fetchData = async () => {
          const response = await fetch('http://localhost:3000/random-dogs/1');
            const data = await response.json()
            console.log(data)
        }
        fetchData()
    }, [])


    
    return (
        <div>
          <h1>（或者更口语化一点：“佩德罗：这写的啥？完全没懂啊哈哈 xD！”）</h1>
        <div>
            <h1>你好,号码?</h1>
            <p>我也不知道,我也不知道, </p>
            <p>程序员去餐厅点餐。
                服务员问：“您要什么？”
                程序员说：“我要一份‘Hello World’套餐。”
                服务员懵了：“那是什么？”
                程序员：“就是‘先上汤’（谐音‘Hello World’的‘汤’），再上主菜——记得‘渲染’快一点，我‘饿（e）了（le）’（谐音‘React’）。”</p>
                        </div>
                        <div>
                            谐音梗（程序员术语混入点餐）。

                “渲染”双关（前端开发 + 上菜速度）。

                结尾偷偷埋了“React”彩蛋。

                如果需要更技术相关的梗，可以说：
                “这个笑话是‘SSR’（Server-Side Rendering）的——因为汤必须‘服务端先上’！” 😄
        </div>
        </div>
    )
  }

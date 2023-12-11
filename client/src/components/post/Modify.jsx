import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const Modify = () => {

    const [postInfo, setPostInfo] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    let params = useParams();
    let navigate = useNavigate();

    // 글 정보 가져오기
    useEffect(() => {
        let body = {
            postNum: params.postNum
        }

        axios.post("/api/post/detail", body)
            .then((response) => {
                if (response.data.success) {
                    setPostInfo(response.data.post)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }, [params.postNum])

    useEffect(() => {
        setTitle(postInfo.title);
        setContent(postInfo.content);
    }, [postInfo])

    const onSubmit = (e) => {
        e.preventDefault();

        if (title === "" || content === "") {
            return alert("든 항모을 채워 주세요");
        }

        let body = {
            title: title,
            content: content,
            postNum: params.postNum
        }

        axios
            .post("/api/post/modify", body)
            .then((response) => {
                if (response.data.success) {
                    alert("수정이 완료되었습니다.")
                    navigate(`/list`)
                } else {
                    alert("수정이 실패하였습니다.")
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div>
            <div className='write__wrap'>
                <div className='write__header'>
                    <h2> 게시글 수정 </h2>
                </div>
                <form>
                    <fieldset>
                        <legend className="blind">게시글 수정 영역</legend>
                        <div>
                            <label htmlFor="title" className="required blind">제목</label>
                            <input
                                type="text"
                                id="title"
                                value={title || ""}
                                onChange={(e) => {
                                    setTitle(e.currentTarget.value)
                                }}
                            />
                        </div>
                        <div>
                            <label htmlFor="content" className="required blind">내용</label>
                            <textarea
                                id="content"
                                value={content || ""}
                                onChange={(e) => {
                                    setContent(e.currentTarget.value)
                                }}
                            />
                        </div>
                        <button
                            type="submit"
                            className="write__btn"
                            onClick={(e) => {
                                onSubmit(e);
                            }}
                        >수정하기</button>
                        <button
                            type="submit"
                            className="write__btn"

                            style={{ marginTop: "30px" }}
                        >취소하기</button>
                    </fieldset>
                </form>
            </div>
        </div>
    )
}

export default Modify

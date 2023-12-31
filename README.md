## Client
1. npx create-react-app .
2. npm install react-bootstrap bootstrap
3. npm install react-router-dom
4. npm install axios
5. npm install http-proxy-middleware
6. npm install @emotion/css
7. npm install @emotion/react
8. npm install @emotion/styled
9. npm install firebase
10. npm install react-redux
11. npm install @reduxjs/toolkit

## Server
1. npm init; 또는 npm init -y;(추천)
2. npm install express --save;
(express은 가상의 서버가 정할때)
3. npm install nodemon --save; 
(서버 저장 할 때마다 나갔다 들어갔다 하기 귀찮으니깐 자동적으로 저장하는 방법)
4. npm install path --save;("path": "^0.12.7" -> 확인)
5. npm install mongoose --save
6. npm install multer --save;
7. npm install aws-sdk@2.348.0 --save
8. npm i multer-s3@2.10.0 (버전 낮은 버전)



## 제작과정
1. 
```js
const express = require("express");
const app = express();
const port = 5050;

app.listen(port, () => {
    console.log("running --->" + port);
})

app.get("/", (req, res) => {
    res.send("Hello World")
})
```  

- express 설치 과정

2. 
클라이언트<br />
1. `npm run build`
2. `npm start`
<br />

서버
```js
const express = require("express");
const path = require("path");
const app = express();
const port = 5050;

app.use(express.static(path.join(__dirname, "../client/build/")));
app.listen(port, () => {
    console.log("running --->" + port);
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"))
})
```
- client indext.html 연동

3. 
```js
const express = require("express");
const path = require("path");
const mongoose = require('mongoose');

const app = express();
const port = 5050;

app.use(express.static(path.join(__dirname, "../client/build/")));
app.listen(port, () => {
    mongoose
        .connect(
            "mongodb+srv://leejiyoung492:rhqnr1159*@cluster0.p8x27w7.mongodb.net/?retryWrites=true&w=majority"
        )
        .then(() => {
            console.log("running --->" + port);
            console.log("connecting ---> + mongDB..");
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"))
})

```

- 몽고DB 연동(메시지 8000번 나오면 비밀번호가 틀린 것)

------------------------------------------------------------------------------------------------------------------------------------------------------

## 새로운 정보를 새로운 저장소에 넣어서 보관하여 출력하느 방법
1. 

```js
import React, { useState } from 'react'

const App = () => {
  const [temp, setTemp] = useState([1, 2, 3]);

  return (
    <div>
      <h1>React</h1>
      {temp}
      <br />
      <button onClick={() => {
        let arr = []
        arr = [...temp];
        arr.push(4)
        setTemp(arr)
      }}>버튼</button>
    </div>
  )
}

export default App
```

2. 한 페이지에 명령어 다 적은 버전

1> App.js
```js
import React, { useState } from 'react'

const App = () => {
  const [content, setContent] = useState('');       // 새로운 데이터 들어가는 곳
  const [contentList, setContentList] = useState([]);   // 데이터 저장소

  const onsubmit = () => {
    let tempArr = [...contentList];
    tempArr.push(content);
    setContentList([...tempArr]);
  }

  return (
    <div>
      <h1>React</h1>
      <div>
        {contentList.map((content, key) => (
          <div key={key}>{content}</div>
        ))}
      </div>
      <input
        type='text'
        value={content}
        onChange={(e) => {
          setContent(e.currentTarget.value)
        }}
      />
      <br />
      <button onClick={() => {
        onsubmit()
      }}>입력</button>
    </div>
  )
}

export default App

```

3. 나누어서 코드 버전

1> App.js

```js
import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import Heading from './compeonents/Heading'
import List from './compeonents/List'
import Upload from './compeonents/Upload'

const App = () => {
  const [contentList, setContentList] = useState([]);

  return (
    <>
      <Heading />
      <Routes>
        <Route path="/list" element={<List contentList={contentList} setContentList={setContentList} />}></Route>
        <Route path="/upload" element={<Upload contentList={contentList} setContentList={setContentList} />}></Route>
      </Routes>
    </>
  )
}

export default App
```


2> Heading.js

```js
import React from 'react'
import { Link } from 'react-router-dom'

const Heading = () => {
    return (
        <div>
            <h1>Hello React</h1>
            <Link to="/">Home</Link>
            <Link to="/upload">upload</Link>
            <Link to="/list">List</Link>
        </div>
    )
}

export default Heading

```

3> List.js

```js
import React from 'react'

const List = (props) => {
    return (
        <div>
            {props.contentList.map((content, key) => (
                <div key={key}>
                    내용 : {content}
                </div>
            ))}
        </div>
    )
}

export default List
```

4> Upload.js

```js
import React, { useState } from 'react'

const Upload = (props) => {
    const [content, setContent] = useState('');

    const onsubmit = () => {
        let tempArr = [...props.contentList];
        tempArr.push(content);
        props.setContentList([...tempArr]);
        setContent("");
    }
    return (
        <div>
            <div>
                <input
                    type='text'
                    value={content}
                    onChange={(e) => {
                        setContent(e.currentTarget.value)
                    }}
                />
                <br />
                <button onClick={() => {
                    onsubmit()
                }}>입력</button>
            </div>
        </div>
    )
}
export default Upload

```

----------------------------------------------------------------------

## client와 server 연결(http-proxy-middleware)

참고 사이트 `https://create-react-app.dev/docs/proxying-api-requests-in-development`

### http-proxy-middleware =>
http-proxy-middleware는 Node.js 애플리케이션에서 다른 서버로 HTTP 요청을 프록시하는 데 사용되는 라이브러리입니다.<br /> 이 미들웨어를 사용하면 서버에서 클라이언트로의 요청을 중간에 가로채서 다른 서버로 전달할 수 있습니다.<br /> 이는 주로 개발 중에 API 호출을 로컬 서버에서 실제 API 서버로 프록시하거나, 특정 엔드포인트에 대한 요청을 조작하는 데 사용됩니다.

### client 파일
1. client 파일 setupProxy.js를 만들기(index.js와 같은 위치여야함)

내용 : 
```js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:5050',
            changeOrigin: true,
        })
    );
};
```

server 파일 index.js 내용

```js
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const port = 5050;

app.use(express.static(path.join(__dirname, "../client/build")));
app.listen(port, () => {
    mongoose.connect(
        "mongodb+srv://leejiyoung492:rhqnr1159*@cluster0.p8x27w7.mongodb.net/?retryWrites=true&w=majority"
    ).then(() => {
        console.log("listening --> " + port);
        console.log("connencting MogngoDB...")
    }).catch((err) => {
        console.log(err);
    })
});

app.get("/", (req, res) => {
    res.send(path.join(__dirname, "../client/build/index.html"));
});
app.get("*", (req, res) => {
    res.send(path.join(__dirname, "../client/build/index.html"));
});

app.post("/api/test", (req, res) => {
    console.log(req);
    res.status(200).json({ success: true, text: "안녕하세요!!" })
})
```

2. VScode를 껐다가 키고 난 후에<br />
 client -> `npm start`<br />
 server => `npm start`<br />

요청 성공시 server 터미널에
`
  [Symbol(kHeadersCount)]: 30,
  [Symbol(kTrailers)]: null,
  [Symbol(kTrailersCount)]: 0
`
가 나오면 성공

3. 데이터 주고 받기(클라이언트와 서버간의)
client => List.js
```js
import React, { useEffect, useState } from 'react';
import axios from "axios";

const List = (props) => {
    const [Text, setText] = useState("");

    useEffect(() => {
        let body = {
            text: "Hello!!"
        }
        axios
            .post("/api/test", body)
            .then((response) => {
                setText(response.data.text);

            })
            .catch((err) => {
                console.log(err)
            })
    }, []);
    return (
        <div>
            <div>
                제목 : {Text}
                <br />
            </div>
            {props.contentList.map((content, key) => (
                <div key={key}>
                    내용 : {content}
                </div>
            ))}
        </div>
    )
}

export default List
```

server => index.js
```js
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const port = 5050;

app.use(express.static(path.join(__dirname, "../client/build")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
    mongoose.connect(
        "mongodb+srv://leejiyoung492:rhqnr1159*@cluster0.p8x27w7.mongodb.net/?retryWrites=true&w=majority"
    ).then(() => {
        console.log("listening --> " + port);
        console.log("connencting MogngoDB...")
    }).catch((err) => {
        console.log(err);
    })
});

app.get("/", (req, res) => {
    res.send(path.join(__dirname, "../client/build/index.html"));
});
app.get("*", (req, res) => {
    res.send(path.join(__dirname, "../client/build/index.html"));
});

app.post("/api/test", (req, res) => {
    console.log(req.body);
    res.status(200).json({ success: true, text: "리액트" })
})
```

4. 몽고DB 연동
server 폴더 안에 Model폴더 만들고 아래 Post.js파일 만들기<br />
<br />
Post.js =>

```js
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
});

const Post = mongoose.model("Post", postSchema);

module.exports = { Post };
```
<br />
index.js =>

```js
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const port = 5050;

app.use(express.static(path.join(__dirname, "../client/build")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { Post } = require("./Model/Post.js");    // 스키마 만들기

app.listen(port, () => {
    mongoose.connect(
        "mongodb+srv://leejiyoung492:rhqnr1159*@cluster0.p8x27w7.mongodb.net/?retryWrites=true&w=majority"
    ).then(() => {
        console.log("listening --> " + port);
        console.log("connencting MogngoDB...")
    }).catch((err) => {
        console.log(err);
    })
});

app.get("/", (req, res) => {
    res.send(path.join(__dirname, "../client/build/index.html"));
});
app.get("*", (req, res) => {
    res.send(path.join(__dirname, "../client/build/index.html"));
});

app.post("/api/test", (req, res) => {
    const CommunityPost = new Post({ title: "text", content: "테스트 내용입니다." });   // 데이터 넣어주기
    CommunityPost.save().then(() => {
        res.status(200).json({ success: true }) // 성공: true
    })
})
```

-----------------------------------------------------------------------------
### 몽고DB에 연동하기

#### client

1. 클라이언트 style폴더 안에 UploadeCSS.js 파일 만들기

```js
import styled from "@emotion/styled";

const UploadDiv = styled.div`
    width: 100%;
    text-align: center;
`;

const UploadTitle = styled.h3`
    margin-top: 100px;
    padding-bottom: 10px;
`;

const UploadForm = styled.form`
    input {
        width: 500px;
        border: 1px solid #d9d9d9;
        padding: 10px 20px;
        margin-top: 20px;
        resize: none;
    }

    textarea {
        width: 500px;
        height: 300px;
        border: 1px solid #d9d9d9;
        resize: none;
        margin-top: 20px;
    }
`;

const UploadButtonDiv = styled.div`
    button {
        padding: 10px 32px;
        background-color: hotpink;
        font-size: 24px;
        border-radius: 4px;
        color: white;
        border: 0;
        font-weight: bold;
        &:hover {
            color: white;
        }
    }
`;

export { UploadButtonDiv, UploadDiv, UploadTitle, UploadForm };
```

2. Upload.js 파일 내용(글 작성 시 글 내용이 DB에 가서 저장됨)

```js
import React, { useState } from 'react';
import { UploadButtonDiv, UploadDiv, UploadForm, UploadTitle } from '../style/UploadCss';
import axios from "axios";

const Upload = () => {
    const [title, setTitle] = useState("");
    const [contents, setContents] = useState("");

    const onSubmit = () => {
        if (title === "" || contents === "") {
            return alert("제목과 내용을 채워주세요.")
        }

        let body = {
            title: title,
            content: contents
        }

        axios.post("/api/post/submit", body)
            .then((response) => {
                if (response.data.success) {
                    alert("글 작성이 완료 되었습니다.")
                } else {
                    alert("글 작성이 실패하였습니다.")
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }


    return (
        <UploadDiv>
            <UploadTitle>Upload</UploadTitle>
            <UploadForm>
                <label htmlFor='title'>제목</label>
                <input
                    type='text'
                    id='title'
                    value={title}
                    onChange={(event) => {
                        setTitle(event.currentTarget.value);
                    }}
                /><br />

                <label htmlFor='contents'>내용</label>
                <textarea
                    type='text'
                    id='contents'
                    value={contents}
                    onChange={(event) => {
                        setContents(event.currentTarget.value);
                    }}
                /><br />
                <UploadButtonDiv>
                    <button
                        onClick={(e) => {
                            onSubmit(e);
                        }}
                    >
                        제출
                    </button>
                </UploadButtonDiv>
            </UploadForm>
        </UploadDiv>
    )
}

export default Upload

```

#### server

1. index.js

```js
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
const port = 5050;

app.use(express.static(path.join(__dirname, "../client/build")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { Post } = require("./Model/Post.js");

app.listen(port, () => {
    mongoose
        .connect("mongodb+srv://leejiyoung492:rhqnr1159*@cluster0.p8x27w7.mongodb.net/blog?retryWrites=true&w=majority")
        .then(() => {
            console.log("listening -->" + port);
            console.log("connet --> mongoDB")
        })
        .catch((err) => {
            console.log(err)
        })
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
})

app.post("/api/post/submit", (req, res) => {
    let temp = req.body;
    console.log(temp);

    const CommunityPost = new Post(temp)
    CommunityPost.save().then(() => {
        res.status(200).json({ success: true });
    })
        .catch((err) => {
            res.status(400).json({ success: false })
        })
})

```

-----------------------------------------------------------------------------
### 몽고DB에 있는 내용들 List 파일로 불러오기

#### client 

1. Upload.js

```js
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { UploadDiv, UploadTitle, UploadForm, UploadButton } from "../style/UploadCSS.js"
import axios from 'axios';

const Upload = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    let navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();

        if (title === "" || content === "") {
            return alert("제목 또는 내용을 채워주세요.");
        }

        let body = {
            title: title,
            content: content
        }

        axios
            .post("/api/post/submit", body)
            .then((response) => {
                if (response.data.success) {
                    alert("글 작성이 완료되었습니다.")
                    navigate("/list");
                } else {
                    alert("글 작성이 실패하였습니다.")
                }
            })
    }

    return (
        <UploadDiv>
            <UploadTitle>
                글을  작성해 주세요.
            </UploadTitle>
            <UploadForm>
                <label htmlFor='title'>제목</label>
                <input
                    type='text'
                    id="title"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.currentTarget.value);
                    }}
                ></input>

                <label htmlFor='content'>내용</label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => {
                        setContent(e.currentTarget.value);
                    }}
                ></textarea>
                <UploadButton>
                    <button
                        onClick={(e) => {
                            onSubmit(e);
                        }}
                    >저장하기</button>
                </UploadButton>
            </UploadForm>
        </UploadDiv>
    )
}

export default Upload

```

2. List.js

```js
import React, { useEffect, useState } from 'react'
import axios from 'axios';

const List = () => {
    const [postList, setpostList] = useState([]);

    useEffect(() => {
        axios.post('/api/post/list')
            .then((response) => {
                if (response.data.success) {
                    setpostList([...response.data.postList]);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    return (
        <div>
            <h3>글 목록</h3>
            {postList.map((post, key) => (
                <div key={key}>
                    <h3>제목 : {post.title}</h3>
                    <p>내용 : {post.content}</p>
                </div>
            ))}
        </div>
    )
}

export default List
```

#### server

```js
const express = require("express");
const path = require("path")
const mongoose = require("mongoose");

const app = express();
const port = 5050;

app.use(express.static(path.join(__dirname, "../client/build")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { Post } = require("./Model/Post.js")

app.listen(port, () => {
    mongoose.connect(
        "mongodb+srv://leejiyoung492:rhqnr1159*@cluster0.p8x27w7.mongodb.net/reactBlog?retryWrites=true&w=majority"
    ).then(() => {
        console.log("listening --> " + port);
        console.log("mongoose connecting...")
    }).catch((err) => {
        console.log(err)
    })

})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
})

app.post("/api/post/submit", (req, res) => {
    let temp = req.body;
    console.log(temp);

    const BlogPost = new Post(temp);
    BlogPost.save()
        .then(() => {
            res.status(200).json({ success: true });
        })
        .catch((err) => {
            console.log(err)
            res.status(400).json({ success: false });
        })
})

app.post("/api/post/list", (req, res) => {
    Post.find().exec()
        .then((doc) => {
            res.status(200).json({ success: true, postList: doc })
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ success: false });
        })
})
```

-------------------------------------------------------------------------
### 몽고디비 디테일 페이지 보기

#### client

1. List.js

```js
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

const List = () => {
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        axios.post("/api/post/list")
            .then((response) => {
                if (response.data.success) {
                    setPostList([...response.data.postList]);
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    return (
        <div>
            <h3>글 목록</h3>
            {postList.map((post, key) => (
                <div key={key}>
                    <h4>제목 : {post.title}</h4>
                    <p>내용 : {post.content}</p>
                    <Link to={`/post/${post.postNum}`}>내용보기</Link>
                </div>
            ))}
        </div>
    )
}

export default List

```

2. Upload.js

```js
import React, { useState } from 'react'
import { UploadDiv, UploadTitle, UploadForm, UploadButton } from "../style/UploadCSS.js"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const Upload = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigator = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();

        if (title === "" || content === "") {
            return alert("내용을 입력해주세요.")
        }

        let body = {
            title: title,
            content: content
        }

        axios
            .post("/api/post/submit", body)
            .then((response) => {
                if (response.data.success) {
                    alert("글 작성이 완료되었습니다.")
                    navigator("/list")
                } else {
                    alert("글 작성이 실패하였습니다.")
                }
            })
    }

    return (
        <UploadDiv>
            <UploadTitle>
                글을 작성해 주세요!!
            </UploadTitle>
            <UploadForm>
                <label htmlFor='title'>제목</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.currentTarget.value);
                    }}
                ></input>

                <label htmlFor='content'>내용</label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => {
                        setContent(e.currentTarget.value);
                    }}
                ></textarea>

                <UploadButton>
                    <button
                        onClick={(e) => {
                            onSubmit(e);
                        }}
                    >저장하기</button>
                </UploadButton>
            </UploadForm>
        </UploadDiv>
    )
}

export default Upload

```

#### server

1. Model/Counter.js

```js

const mongoose = require("mongoose");

const CounterSchema = new mongoose.Schema({
    name: String,
    postNum: Number
}, { collection: "counter" });

const Counter = mongoose.model("Counter", CounterSchema);

module.exports = { Counter };

```

2. Model/Post.js

```js
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    postNum: Number
}, { collection: "posts" });

const Post = mongoose.model("Post", postSchema);

module.exports = { Post };
```

3. index.js

```js
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
const port = 5050;

app.use(express.static(path.join(__dirname, "../client/build")))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { Post } = require("./Model/Post.js");
const { Counter } = require("./Model/Counter.js");

app.listen(port, () => {
    mongoose.connect(
        "mongodb+srv://leejiyoung492:rhqnr1159*@cluster0.p8x27w7.mongodb.net/?retryWrites=true&w=majority"
    )
        .then(() => {
            console.log("listening --->" + port);
            console.log("mongoose ---> connecting")
        }).catch((err) => {
            console.log(err)
        })

})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"))
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"))
})

app.post("/api/post/submit", (req, res) => {
    let temp = req.body;
    // 넘버 추가 작업
    Counter.findOne({ name: "counter" })
        .exec()
        .then((counter) => {
            temp.postNum = counter.postNum;

            const BlogPost = new Post(temp);

            BlogPost.save()
                .then(() => {
                    // 번호를 1씩 증가
                    Counter.updateOne({ name: "counter" }, { $inc: { postNum: 1 } })
                        .then(() => {
                            res.status(200).json({ success: true });
                        })
                })

        })
        .catch((err) => {
            console.log(err)
            res.status(400).json({ success: false })
        })
})


app.post("/api/post/list", (req, res) => {
    Post.find().exec()
        .then((doc) => {
            res.status(200).json({ success: true, postList: doc })
        })
        .catch((err) => {
            console.log(err)
            res.status(400).json({ success: false })
        })
})
```

---------------------------------------------------------------------------------
# 리드미 깃허브에 적을 내용


1. Express 설치 및 기본 설정

### client 설치 프로그램 
1. npx create-react-app .
2. npm install react-bootstrap bootstrap
3. npm install react-router-dom
4. npm install axios
5. npm install http-proxy-middleware
6. npm install @emotion/css
7. npm install @emotion/react
8. npm install @emotion/styled

### server 설치 프로그램
1. npm init; 또는 npm init -y;(추천)
2. npm install express --save;
(express은 가상의 서버가 정할때)
3. npm install nodemon --save; 
(서버 저장 할 때마다 나갔다 들어갔다 하기 귀찮으니깐 자동적으로 저장하는 방법)
4. npm install path --save;("path": "^0.12.7" -> 확인)
5. npm install mongoose --save

```js
Copy code
// express 기본 설정
const express = require("express");
const app = express();
const port = 5050;

app.listen(port, () => {
    console.log("서버 실행 중 --->" + port);
});

app.get("/", (req, res) => {
    res.send("안녕하세요!");
});
```

2. 클라이언트 빌드 및 서버 연동

클라이언트
<br />

```js
# 클라이언트 빌드
npm run build
npm start

```

서버

<br />

```js

const express = require("express");
const path = require("path");
const app = express();
const port = 5050;

app.use(express.static(path.join(__dirname, "../client/build/")));
app.listen(port, () => {
    console.log("서버 실행 중 --->" + port);
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});
```

<br />
3. MongoDB 연동

```js
const express = require("express");
const path = require("path");
const mongoose = require('mongoose');

const app = express();
const port = 5050;

app.use(express.static(path.join(__dirname, "../client/build/")));
app.listen(port, () => {
    mongoose
        .connect(
            "mongodb+srv://leejiyoung492:rhqnr1159*@cluster0.p8x27w7.mongodb.net/?retryWrites=true&w=majority"
        )
        .then(() => {
            console.log("서버 실행 중 --->" + port);
            console.log("MongoDB 연결 성공");
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});
```

4. 새로운 정보를 저장소에 추가하여 출력(list.js 파일)
단일 페이지 내 명령어 추가 버전

```js
import React, { useState } from 'react';

const App = () => {
  const [temp, setTemp] = useState([1, 2, 3]);

  return (
    <div>
      <h1>React</h1>
      {temp}
      <br />
      <button onClick={() => {
        let arr = [];
        arr = [...temp];
        arr.push(4);
        setTemp(arr);
      }}>버튼</button>
    </div>
  );
};

export default App;
```
<br />

컴포넌트 분리한 버전

```js
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Heading from './components/Heading';
import List from './components/List';
import Upload from './components/Upload';

const App = () => {
  const [contentList, setContentList] = useState([]);

  return (
    <>
      <Heading />
      <Routes>
        <Route path="/list" element={<List contentList={contentList} setContentList={setContentList} />} />
        <Route path="/upload" element={<Upload contentList={contentList} setContentList={setContentList} />} />
      </Routes>
    </>
  );
};

export default App;
```

5. 클라이언트와 서버 연결 (http-proxy-middleware)
`참고: create-react-app 문서`

Client - setupProxy.js

```js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:5050',
            changeOrigin: true,
        })
    );
};
```
<br />

#### Server

index.js

```js
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const port = 5050;

app.use(express.static(path.join(__dirname, "../client/build")));
app.listen(port, () => {
    mongoose.connect(
        "mongodb+srv://leejiyoung492:rhqnr1159*@cluster0.p8x27w7.mongodb.net/?retryWrites=true&w=majority"
    ).then(() => {
        console.log("서버 실행 중 ---> " + port);
        console.log("MongoDB 연결 중...");
    }).catch((err) => {
        console.log(err);
    });
});

app.get("/", (req, res) => {
    res.send(path.join(__dirname, "../client/build/index.html"));
});

app.post("/api/test", (req, res) => {
    console.log(req);
    res.status(200).json({ success: true, text: "안녕하세요!!" });
});
```

6. MongoDB에 데이터 저장
#### Server

Post.js

```js
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
});

const Post = mongoose.model("Post", postSchema);

module.exports = { Post };
```

#### Server

index.js

```js
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const port = 5050;

app.use(express.static(path.join(__dirname, "../client/build")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { Post } = require("./Model/Post.js");

app.listen(port, () => {
    mongoose.connect(
        "mongodb+srv://leejiyoung492:rhqnr1159*@cluster0.p8x27w7.mongodb.net/?retryWrites=true&w=majority"
    ).then(() => {
        console.log("서버 실행 중 ---> " + port);
        console.log("MongoDB 연결 중...");
    }).catch((err) => {
        console.log(err);
    });
});

app.get("/", (req, res) => {
    res.send(path.join(__dirname, "../client/build/index.html"));
});

app.post("/api/test", (req, res) => {
    console.log(req.body);
    res.status(200).json({ success: true, text: "리액트" });
});

app.post("/api/post/submit", (req, res) => {
    const temp = req.body;
    console.log(temp);

    const CommunityPost = new Post(temp);
    CommunityPost.save().then(() => {
        res.status(200).json({ success: true });
    })
    .catch((err) => {
        res.status(400).json({ success: false });
    });
});
```

7. MongoDB에서 데이터 가져와 클라이언트에 표시
#### Client

List.js

```js
import React, { useEffect, useState } from 'react';
import axios from "axios";

const List = (props) => {
    const [text, setText] = useState("");

    useEffect(() => {
        let body = {
            text: "Hello!!"
        }
        axios
            .post("/api/test", body)
            .then((response) => {
                setText(response.data.text);
            })
            .catch((err) => {
                console.log(err)
            })
    }, []);

    return (
        <div>
            <div>
                제목: {text}
                <br />
            </div>
            {props.contentList.map((content, key) => (
                <div key={key}>
                    내용: {content}
                </div>
            ))}
        </div>
    )
}

export default List
```

#### Server

index.js

```js
Copy code
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const port = 5050;

app.use(express.static(path.join(__dirname, "../client/build")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { Post } = require("./Model/Post.js");

app.listen(port, () => {
    mongoose.connect(
        "mongodb+srv://leejiyoung492:rhqnr1159*@cluster0.p8x27w7.mongodb.net/blog?retryWrites=true&w=majority"
    ).then(() => {
        console.log("서버 실행 중 ---> " + port);
        console.log("MongoDB 연결 중...");
    }).catch((err) => {
        console.log(err);
    });
});

app.get("/", (req, res) => {
    res.send(path.join(__dirname, "../client/build/index.html"));
});

app.post("/api/test", (req, res) => {
    const temp = req.body;
    console.log(temp);
    res.status(200).json({ success: true, text: "리액트" });
});

app.post("/api/post/submit", (req, res) => {
    const temp = req.body;
    console.log(temp);

    const CommunityPost = new Post(temp);
    CommunityPost.save().then(() => {
        res.status(200).json({ success: true });
    })
    .catch((err) => {
        res.status(400).json({ success: false });
    });
});

app.get("/api/posts", (req, res) => {
    Post.find({}, (err, posts) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(posts);
    });
});
```
8. 몽고DB에 있는 내용들 List 파일로 불러오기

#### 클라이언트 (React)

Upload.js

```js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadDiv, UploadTitle, UploadForm, UploadButton } from "../style/UploadCSS.js";
import axios from 'axios';

const Upload = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    let navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();

        if (title === "" || content === "") {
            return alert("제목 또는 내용을 채워주세요.");
        }

        let body = {
            title: title,
            content: content
        };

        axios
            .post("/api/post/submit", body)
            .then((response) => {
                if (response.data.success) {
                    alert("글 작성이 완료되었습니다.");
                    navigate("/list");
                } else {
                    alert("글 작성이 실패하였습니다.");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <UploadDiv>
            <UploadTitle>글을 작성해 주세요.</UploadTitle>
            <UploadForm>
                <label htmlFor='title'>제목</label>
                <input
                    type='text'
                    id="title"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.currentTarget.value);
                    }}
                />

                <label htmlFor='content'>내용</label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => {
                        setContent(e.currentTarget.value);
                    }}
                ></textarea>
                <UploadButton>
                    <button
                        onClick={(e) => {
                            onSubmit(e);
                        }}
                    >저장하기</button>
                </UploadButton>
            </UploadForm>
        </UploadDiv>
    );
};

export default Upload;
```

List.js

```js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const List = () => {
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        axios.post('/api/post/list')
            .then((response) => {
                if (response.data.success) {
                    setPostList([...response.data.postList]);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div>
            <h3>글 목록</h3>
            {postList.map((post, key) => (
                <div key={key}>
                    <h3>제목: {post.title}</h3>
                    <p>내용: {post.content}</p>
                </div>
            ))}
        </div>
    );
};

export default List;
```

#### 서버 (Node.js, Express, MongoDB)

```js
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
const port = 5050;

app.use(express.static(path.join(__dirname, "../client/build")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { Post } = require("./Model/Post.js");

app.listen(port, () => {
    mongoose.connect(
        "mongodb+srv://leejiyoung492:rhqnr1159*@cluster0.p8x27w7.mongodb.net/reactBlog?retryWrites=true&w=majority"
    ).then(() => {
        console.log("listening --> " + port);
        console.log("mongoose connecting...");
    }).catch((err) => {
        console.log(err);
    });

});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.post("/api/post/submit", (req, res) => {
    let temp = req.body;
    console.log(temp);

    const BlogPost = new Post(temp);
    BlogPost.save()
        .then(() => {
            res.status(200).json({ success: true });
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ success: false });
        });
});

app.post("/api/post/list", (req, res) => {
    Post.find().exec()
        .then((doc) => {
            res.status(200).json({ success: true, postList: doc });
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ success: false });
        });
});
```

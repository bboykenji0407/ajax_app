const buildHTML = (XHR) => {  //buildHTML関数を定義
  const item = XHR.response.post; //XHR.response.postと記述することで、レスポンスの中から投稿されたメモの情報を抽出し、変数itemに格納しています。
  const html = `
    <div class="post">
      <div class="post-date">
        投稿日時:${item.created_at}
      </div>
      <div class="post-content">
        ${item.content}
      </div>
    </div`;  //item内に格納されたメモの情報を元にして、ブラウザに描画するためのHTMLを生成し、変数htmlに格納しています。
  return html  //関数buildHTMLの返り値にhtmlを指定（３から11行目のこと)
}

function post (){
  //リクエストを送信する処理
  const submit = document.getElementById("submit")
  submit.addEventListener("click", (e) => {   // e、はイベントオブジェクトといい、イベント発生時の情報を持つ
                                   //投稿ボタンをクリックしたを無効化するのはブラウザからJavaScriptを経由してサーバーにアクセスするため
    e.preventDefault();    //　意図しない挙動をしないようにする (今回は２重投稿にならないように)
    const form = document.getElementById("form");
    const formData = new FormData(form); //フォームに入力された値を取得
    const XHR = new XMLHttpRequest();
    XHR.open("POST", "/posts", true); //openメソッドを使って、リクエスト内容を指定、非同期で投稿したメモをデータベースに保存したい。
    XHR.responseType = "json"; //サーバーからレスポンスの形式を指定
    XHR.send(formData);  //フォームに入力された内容をサーバー側に送信  (javascriptのリクエスト、ブラウザからのリクエストがあるため、２重で投稿される)
    XHR.onload = () => { //リクエストが成功した時の記述
      if (XHR.status != 200) {  //200以外のHTTPステータスが返された場合、エラーメッセージが表示。
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;  //javascriptの処理から抜ける。後の処理を行わない。
      }
      const list = document.getElementById("list"); //新しいメモを挿入する要素を取得して、変数listに格納
      const formText = document.getElementById("content");//フォームの値を取得
      list.insertAdjacentHTML("afterend", buildHTML(XHR)); //insertAdjacentHTMLメソッドの第一引数にafterendを指定、変数listに格納された要素の直後に生成したHTMLを挿入
      formText.value = "";  //フォームの値をリセット formTextのvalue属性に空の文字列を指定することで、フォームの中身をリセットしています。
    };
  });
}

window.addEventListener('load', post);

// function post (){
//   const submit = document.getElementById("submit");
//   submit.addEventListener("click", (e) => {
//     // e.preventDefault();
//     const form = document.getElementById("form");
//     const formData = new FormData(form);
//     const XHR = new XMLHttpRequest();
//     XHR.open("POST", "/posts", true);
//     XHR.responseType = "json";
//     XHR.send(formData);
//   });
// }

// window.addEventListener('load', post);  //   メンターさんが検証してくれた。
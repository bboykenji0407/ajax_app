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
document.addEventListener('DOMContentLoaded', () => {
    // HTML要素を取得します
    const jokeDisplay = document.getElementById('joke-display');
    const getJokeButton = document.getElementById('get-joke-button');

    // ジョークを取得する関数
    async function fetchJoke() {
        const url = "https://v2.jokeapi.dev/joke/Any?type=single"; // JokeAPIのエンドポイント

        jokeDisplay.textContent = 'ジョークを読み込み中...'; // 読み込み中のメッセージを表示

        try {
            const response = await fetch(url); // APIにリクエストを送ります
            
            // レスポンスがOK（成功）でなければエラーを投げます
            if (!response.ok) {
                throw new Error(`HTTPエラー！ステータス: ${response.status}`);
            }

            const data = await response.json(); // 応答をJSON形式で解析します

            if (data.joke) {
                jokeDisplay.textContent = data.joke; // ジョークを表示します
            } else {
                jokeDisplay.textContent = 'ジョークが見つかりませんでした。'; // ジョークがない場合のメッセージ
            }
        } catch (error) {
            console.error('ジョークの取得に失敗しました:', error);
            jokeDisplay.textContent = 'ジョークの取得中にエラーが発生しました。インターネット接続を確認してください。';
        }
    }

    // ボタンがクリックされたときにジョークを取得する
    getJokeButton.addEventListener('click', fetchJoke);

    // ページ読み込み時に最初のジョークを取得
    fetchJoke();
});
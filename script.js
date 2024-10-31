const votingSection = document.getElementById('voting-section');
const thankYouSection = document.getElementById('thank-you');
const voteButtons = document.querySelectorAll('.vote-button');

// ローカルストレージから投票済みか確認
const hasVoted = localStorage.getItem('hasVoted');

if (hasVoted) {
    votingSection.classList.add('hidden');
    thankYouSection.classList.remove('hidden');
}

// 各ボタンにクリックイベントを設定
voteButtons.forEach(button => {
    button.addEventListener('click', function() {
        const selectedNumber = this.getAttribute('data-number');
        
        // ローカルストレージに投票済みとして保存
        localStorage.setItem('hasVoted', true);
        localStorage.setItem('voteNumber', selectedNumber);

        // 投票セクションを隠して感謝メッセージを表示
        votingSection.classList.add('hidden');
        thankYouSection.classList.remove('hidden');

        // Google Apps Script APIに投票番号を送信
        const scriptURL = "https://script.google.com/macros/s/AKfycbya6Zosa_93XNLrTov_UGU6bah13-1nB5O8l9K4Q-bLU8T9spiZ5Htf266mSG8x9b_Z/exec"; // デプロイしたウェブアプリのURL
        fetch(scriptURL, {
            method: 'POST',
            body: new URLSearchParams({ 'voteNumber': selectedNumber }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
});

// ページが完全に読み込まれた後、1秒間スプラッシュスクリーンを表示してから非表示にする
window.addEventListener('load', function() {
    var splashScreen = document.getElementById('splash-screen');
    var mainContent = document.querySelector('.container');

    // 1秒待ってからスプラッシュスクリーンをフェードアウト
    setTimeout(function() {
        splashScreen.style.opacity = '0'; // フェードアウト
        setTimeout(function() {
            splashScreen.style.display = 'none'; // 完全にフェードアウトしてから非表示
            mainContent.style.display = 'block'; // コンテンツを表示
            document.body.classList.remove('loading');
        }, 1000); // フェードアウトの時間と一致
    }, 1000); // 1秒間スプラッシュスクリーンを表示
});

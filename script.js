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
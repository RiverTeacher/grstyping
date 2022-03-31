window.addEventListener('load', init);

// Globals

// Available Levels
const levels = {
  easy: 5,
  medium: 7,
  hard: 5
};

// To change level
const currentLevel = levels.medium;

let time = currentLevel;
let score = 0;
let isPlaying;

// DOM Elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');
const highscoreDisplay = document.querySelector('#highscore');

const words = [
  'はめるパコ～！',
  'しやへれなちしねしね',
  '死ねよ',
  'なぜ雪見だいふくはあげれないのにパピコはあげれるのだろう。',
  '論破☆',
  'ツムツムでおつみから茶色のつむつむが出てきて人生も詰む詰むやで',
  'ちんこかるい',
  'lol',
  'キモいなおまえ',
  '性欲ってなんだっけ',
  'りばーが珍しいこと言ってる',
  'プーチンがぷりぷりのぷっちんぷりんをぷっちんせずに食べたからウクライナがプーチンにぷっちんキレた',
  '着いたから1回終わる',
  '写真以外送るな雑魚',
  'https://riverteacher.github.io/bougenbot',
  '授業さぼりHUB',
  '10分までに来なかったらサーバー会社にクレーム入れよ（）',
  '幸せだね！死ね！',
  'えろっ',
  'おっｐ',
  'おつ',
  '暴言botti？',
  '通信が転んでけがしたかもしれないじゃん'
  'ひまい',
  '自爆おつ',
  'おれ集合体恐怖症だからまぢむり',
  '自撮りえろ',
  '可愛い',
  'そんな時間かかる話？ｗ',
  'それはエロすぎる',
  'そして今、わたきはぱぴこをくっている',
  '今私が見ているのは、プレイ中の光景です',
  'やばっ！爆笑爆笑爆笑！！',
  'おい',
  'うるせぇよくそbotしか作れないやつが',
  'いちおう迷言にしとくわ',
  'だれか開いてれる人いないかなーー',
  '黙れ',
  'キッズは新機能をやたら使いたがるから',
  '何言ってんのお前なぐるよ？',
  'ホラー画像は別にいいけど集合体画像がきつい',
  'シールド割ったぐらいきもちい',
  'BANされろ',
  '集めてくんなよ雑魚',
  'え？俺が神ってこと？ありがとう',
  'DV彼氏かぁ...',
  'www',
  'しこしこ死体',
  '四季メンションEveryoneに変えようかな',
  'マイクラしてくるわ',
  '1回死ぬ？',
  '不発で草',
  'しね',
  'わざわざ保存すんなよ（）',
  'いいや、死ぬね',
  'ショットガンで死ね',
  '正直病んでる人に対して適切な対処したと思う',
  'ぶち犯すよ？',
  'むーりー',
  '妙にどろっとしたワインだな',
  '身体的に疲労していたんだね☆',
  '永遠に俺の名前だけ白い精液なんだよ',
  '俺が有能だからエラーを吐くんだよ',
  'お前ら道に落ちてるお菓子食うパターンだろどうせ',
  '俺はいえぇヌクヌクならぬヌキヌキ',
  'しねよかす',
  'お前が死ねよ変態',
  '殺すぞ（暗黒微笑）',
  '確かにｗ',
  'このくそ無能がそのスカスカの脳みそで考えろ',
  '髪生えてないくせに',
  '冗談も顔だけににしとけってな',
  'LINE教えたら普通に個人情報でるやん',
  'そ、それな',
  'KUROの96kgになったこのハンバーガーのせいらしい',
  'cubeクラフトでpvpしてくるわ',
  'うさぎは1回死んで100回生き返る',
  'これが終わる前にKUROは死にます',
  'ばっくとわいすくらんと',
  '今無理産業',
  '黙れハゲ',
  'うさぎよりやばいことしてるやん',
  'タピざっこｗ',
  'うさぎはーとりばー',
  'お前は黙れ',
  'オタクがいるからこそ経済が発展する！',
  '流石にそれはない',
  'お前が無能だからエラー吐くんだよ',
  'Sexbox',
  '神じゃん',
  '無理だよ',
  '雑魚じゃん',
  'えげつない挨拶やなぁ',
  'きっしょ',
  'くろKUROじゃん',
  'これ素材',
  '気持ち悪いな',
  '文句言うなって❤',
  'HIVEでBANされてきて',
  '猛者になるんだよ',
  'うさぎとりばーは結婚しました',
  'こいつ全部名言にするやん',
  'じゃあお前は条例守るのか？',
  'たぴみるの暇つぶし',
  '健全MAN子',
  '偉大なるりばー様',
  '暴言bot',
  '課題削除機 KURO@無印',
  'ちあこり',
];

// Initialize Game
function init() {
  // Show number of seconds in UI
  seconds.innerHTML = currentLevel;
  // Load word from array
  showWord(words);
  // Start matching on word input
  wordInput.addEventListener('input', startMatch);
  // Call countdown every second
  setInterval(countdown, 1000);
  // Check game status
  setInterval(checkStatus, 50);
}

// Start match
function startMatch() {
  if (matchWords()) {
    isPlaying = true;
    time = currentLevel + 1;
    showWord(words);
    wordInput.value = '';
    score++;
  }
  
  // Highscore based on score value for Session Storage
  if (typeof sessionStorage['highscore'] === 'undefined' || score > sessionStorage['highscore']) {
    sessionStorage['highscore'] = score;
  } else {
    sessionStorage['highscore'] = sessionStorage['highscore'];
  }

  // Prevent display of High Score: -1
  if (sessionStorage['highscore'] >= 0) {
  highscoreDisplay.innerHTML = sessionStorage['highscore'];
  }

  // If score is -1, display 0
  if (score === -1) {
    scoreDisplay.innerHTML = 0;
  } else {
    scoreDisplay.innerHTML = score;
  }
}

// Match currentWord to wordInput
function matchWords() {
  if (wordInput.value === currentWord.innerHTML) {
    message.innerHTML = '成功';
    return true;
  } else {
    message.innerHTML = '';
    return false;
  }
}

// Pick & show random word
function showWord(words) {
  // Generate random array index
  const randIndex = Math.floor(Math.random() * words.length);
  // Output random word
  currentWord.innerHTML = words[randIndex];
}

// Countdown timer
function countdown() {
  // Make sure time is not run out
  if (time > 0) {
    // Decrement
    time--;
  } else if (time === 0) {
    // Game is over
    isPlaying = false;
  }
  // Show time
  timeDisplay.innerHTML = time;
}

// Check game status
function checkStatus() {
  if (!isPlaying && time === 0) {
    message.innerHTML = '死亡した。再読み込みでやり直す';
    score = -1;
  }
}

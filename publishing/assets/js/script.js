/* =====================================================
   설정값
   ===================================================== */

const CELL_SIZE = 260; // 셀 크기(px)

/* =====================================================
   색상 팔레트 — 첨부 이미지 기준
   ===================================================== */

const BOOK_COLORS = [
    '#F5EED0', // 크림/페일 옐로우
    '#235be7ff', // 블루퍼플/페리윙클
    '#d0acefff', // 라벤더
    '#ff1e69ff', // 옐로우그린/샤트뢰즈
    '#f5bfa4ff', // 더스티 핑크/살몬
    '#fa9908ff', // 골든 옐로우
    '#D1FFE9', // 라임 그린
    '#63DB7F', // 비비드 그린
    '#E06828', // 오렌지
    '#f13e44ff', // 핫핑크/딥핑크
    '#0fbf9fff', // 틸/포레스트 그린
    '#34ccffff', // 스카이블루/브라이트 시안
    '#A07840', // 브라운/탄
    '#182848', // 다크 네이비
    '#ADD9FF', // 라이트 블루
    '#AB59F2', // 오키드/라일락 핑크
    '#fffc44ff', // 브라이트 옐로우
];

function randomBookColor() {
    return BOOK_COLORS[Math.floor(Math.random() * BOOK_COLORS.length)];
}

/* =====================================================
   책 데이터
   각 항목: { thumb: '썸네일 경로', url: '상세 페이지 경로' }
   실제 책 데이터로 교체하세요.
   ===================================================== */

const books = [
    { thumb: 'assets/img/books/1',  url: 'book/1/',  title: '『사소로운 것들: 목동 비공식 지도』',              author: '건킴 Gunkimm' },
    { thumb: 'assets/img/books/2',  url: 'book/2/',  title: '『Plants I saw and loved』',                   author: '홍혜림 Hyerim Hong' },
    { thumb: 'assets/img/books/3',  url: 'book/3/',  title: '『ABFFantasy』',                               author: '김연주 Yeonjoo Kim' },
    { thumb: 'assets/img/books/4',  url: 'book/4/',  title: '『변화하는 것들. 이 ‘책’은 유연하고 단단한 존재들에 대한 시각적 기록입니다.』', author: '홍혜림 Hyerim Hong' },
    { thumb: 'assets/img/books/5',  url: 'book/5/',  title: '『FREEGRID HOUSE』',                           author: '임정빈 Jeongbin Im' },
    { thumb: 'assets/img/books/6',  url: 'book/6/',  title: '『CONTINGENT REPORTS』',                       author: '이서영 Karen S. Lee' },
    { thumb: 'assets/img/books/7',  url: 'book/7/',  title: '『Fieldguide in Veil』',                       author: '용서우 Seowoo Yong' },
    { thumb: 'assets/img/books/8',  url: 'book/8/',  title: '『The Rabbit Pond Story』',                    author: '김연주 Yeonjoo Kim' },
    { thumb: 'assets/img/books/9',  url: 'book/9/',  title: '『Heavily Stapled Book』',                     author: '김소희 Sohui Kim' },
    { thumb: 'assets/img/books/10', url: 'book/10/', title: '『Fractal: The Logic of Irregular Repetition』', author: '김동건 Donggun Kim' },
    { thumb: 'assets/img/books/11', url: 'book/11/', title: '『Vook Book of Voyeurism』',                   author: '손서영 Seoyeong Son' },
    { thumb: 'assets/img/books/12', url: 'book/12/', title: '『2020 New York. The doors』',                 author: '홍혜림 Hyerim Hong' },
    { thumb: 'assets/img/books/13', url: 'book/13/', title: '『Daeshinsa Manual Book』',                    author: '김혜영 Hyeyoung Kim, 이주희 Juhui Lee' },
    { thumb: 'assets/img/books/9',  url: 'book/9/' },
    { thumb: 'assets/img/books/10', url: 'book/10/' },
    { thumb: 'assets/img/books/11', url: 'book/11/' },
    { thumb: 'assets/img/books/12', url: 'book/12/' },
    { thumb: 'assets/img/books/13', url: 'book/13/' },
    { thumb: 'assets/img/books/14', url: 'book/14/' },
    { thumb: 'assets/img/books/15', url: 'book/15/' },
    { thumb: 'assets/img/books/16', url: 'book/16/' },
    { thumb: 'assets/img/books/17', url: 'book/17/' },
    { thumb: 'assets/img/books/18', url: 'book/18/' },
    { thumb: 'assets/img/books/19', url: 'book/19/' },
    { thumb: 'assets/img/books/20', url: 'book/20/' },
    { thumb: 'assets/img/books/21', url: 'book/21/' },
    { thumb: 'assets/img/books/22', url: 'book/22/' },
    { thumb: 'assets/img/books/23', url: 'book/23/' },
    { thumb: 'assets/img/books/24', url: 'book/24/' },
    { thumb: 'assets/img/books/25', url: 'book/25/' },
    { thumb: 'assets/img/books/26', url: 'book/26/' },
    { thumb: 'assets/img/books/27', url: 'book/27/' },
    { thumb: 'assets/img/books/28', url: 'book/28/' },
    { thumb: 'assets/img/books/29', url: 'book/29/' },
    { thumb: 'assets/img/books/30', url: 'book/30/' },
    { thumb: 'assets/img/books/31', url: 'book/31/' },
    { thumb: 'assets/img/books/32', url: 'book/32/' },
    { thumb: 'assets/img/books/33', url: 'book/33/' },
    { thumb: 'assets/img/books/34', url: 'book/34/' },
    { thumb: 'assets/img/books/35', url: 'book/35/' },
    { thumb: 'assets/img/books/36', url: 'book/36/' },
    { thumb: 'assets/img/books/37', url: 'book/37/' },
    { thumb: 'assets/img/books/38', url: 'book/38/' },
    { thumb: 'assets/img/books/39', url: 'book/39/' },
    { thumb: 'assets/img/books/40', url: 'book/40/' },
];

/* =====================================================
   페이지 로드 시 각 책에 랜덤 색상 배정
   ===================================================== */

books.forEach(function(book) {
    book.color = randomBookColor();
});

/* =====================================================
   썸네일 경로 자동 해상
   확장자 없이 basePath만 지정해도 png/jpg/JPG/jpeg 순으로 탐색.
   결과는 book._resolvedThumb 에 캐시 (null = 이미지 없음)
   ===================================================== */

var THUMB_EXTS = ['.png', '.jpg', '.JPG', '.jpeg', '.webp'];

/* 배경색(hex) 밝기 계산 → 어두우면 '#ffffff', 밝으면 '#000000' */
function contrastColor(hex) {
    var r = parseInt(hex.slice(1, 3), 16);
    var g = parseInt(hex.slice(3, 5), 16);
    var b = parseInt(hex.slice(5, 7), 16);
    var luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance < 0.5 ? '#ffffff' : '#000000';
}

function resolveThumb(book, onSuccess) {
    if (book._resolvedThumb !== undefined) {
        if (book._resolvedThumb) onSuccess(book._resolvedThumb);
        return;
    }
    var base = book.thumb;
    var i = 0;
    function tryNext() {
        if (i >= THUMB_EXTS.length) { book._resolvedThumb = null; return; }
        var src = base + THUMB_EXTS[i++];
        var img = new Image();
        img.onload  = function() { book._resolvedThumb = src; onSuccess(src); };
        img.onerror = tryNext;
        img.src = src;
    }
    tryNext();
}

/* =====================================================
   그리드 생성
   배치: 우측 상단 → 좌측으로 채운 뒤 다음 행 우측으로 내려감
     book i → row = floor(i / cols), col = cols - 1 - (i % cols)
   ===================================================== */

function buildGrid() {
    var grid = document.getElementById('grid');
    grid.innerHTML = '';

    // 목표 셀 크기(CELL_SIZE)에서 시작, 데이터 셀이 뷰포트를 벗어나면 cols를 늘려 셀을 축소
    var dataCount = books.filter(function(b) { return b.title; }).length;
    var cols   = Math.max(1, Math.round(window.innerWidth / CELL_SIZE));
    var cellPx = window.innerWidth / cols;
    while (Math.ceil(dataCount / cols) * cellPx > window.innerHeight) {
        cols++;
        cellPx = window.innerWidth / cols;
    }
    var rows   = Math.ceil(window.innerHeight / cellPx);

    grid.style.setProperty('--cols',    cols);
    grid.style.setProperty('--rows',    rows);
    grid.style.setProperty('--cell-px', cellPx + 'px');

    // 책 인덱스 i → 그리드 좌표
    // 좌측 상단(col=0)부터 우→우, 행마다 좌측에서 시작
    var bookMap = {};
    books.forEach(function(book, i) {
        var row = Math.floor(i / cols);
        var col = i % cols;
        if (row < rows) {
            bookMap[row + ',' + col] = book;
        }
    });

    var tooltip     = document.getElementById('thumbnail');
    var labelTitle  = document.querySelector('#thumbnail .book-title');
    var labelAuthor = document.querySelector('#thumbnail .book-author');

    for (var r = 0; r < rows; r++) {
        for (var c = 0; c < cols; c++) {
            var cell = document.createElement('div');
            cell.className = 'cell';

            var book = bookMap[r + ',' + c];
            if (book && book.title) {
                (function(b, el) {
                    el.classList.add('book-cell');
                    el.style.backgroundColor = b.color;

                    function showTooltip(b) {
                        var tc = contrastColor(b.color);
                        labelTitle.style.color  = tc;
                        labelAuthor.style.color = tc;
                        labelTitle.textContent  = b.title  || '';
                        labelAuthor.textContent = b.author || '';
                        tooltip.style.display = 'block';
                    }

                    function positionTooltip(cx, cy) {
                        var tw = tooltip.offsetWidth;
                        var th = tooltip.offsetHeight;
                        var tx = cx + 18;
                        var ty = cy + 18;
                        if (tx + tw > window.innerWidth)  tx = cx - tw - 18;
                        if (ty + th > window.innerHeight) ty = cy - th - 18;
                        if (tx < 8) tx = 8;
                        if (ty < 8) ty = 8;
                        tooltip.style.left = tx + 'px';
                        tooltip.style.top  = ty + 'px';
                    }

                    el.addEventListener('mouseenter', function() {
                        resolveThumb(b, function(src) {
                            el.style.backgroundImage    = 'url(' + src + ')';
                            el.style.backgroundSize     = 'cover';
                            el.style.backgroundPosition = 'center';
                        });
                        showTooltip(b);
                    });

                    el.addEventListener('mousemove', function(e) {
                        positionTooltip(e.clientX, e.clientY);
                    });

                    el.addEventListener('mouseleave', function() {
                        el.style.backgroundImage = '';
                        tooltip.style.display = 'none';
                    });

                    el.addEventListener('touchstart', function(e) {
                        var touch = e.touches[0];
                        showTooltip(b);
                        requestAnimationFrame(function() {
                            positionTooltip(touch.clientX, touch.clientY);
                        });
                    }, { passive: true });

                    el.addEventListener('touchend', function() {
                        setTimeout(function() {
                            tooltip.style.display = 'none';
                        }, 800);
                    }, { passive: true });

                    // el.addEventListener('click', function() {
                    //     window.location.href = b.url;
                    // });
                })(book, cell);
            }

            grid.appendChild(cell);
        }
    }
}

buildGrid();

var resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(buildGrid, 150);
});

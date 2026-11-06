
const CELL_SIZE = 260; // 셀 크기(px)
const MOBILE_MAX  = 768; // 이 너비 이하를 모바일로 봄
const MOBILE_COLS = 3;   // 모바일에서 1행에 들어가는 칸 수

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

/* exclude를 주면 그 색과 다른 색을 고름 (고정 해제 시 이전 색과 겹치지 않게) */
function randomBookColor(exclude) {
    var c;
    do {
        c = BOOK_COLORS[Math.floor(Math.random() * BOOK_COLORS.length)];
    } while (c === exclude && BOOK_COLORS.length > 1);
    return c;
}

/* =====================================================
   책 데이터
   각 항목: { thumb: '썸네일 경로', url: '상세 페이지 경로' }
   실제 책 데이터로 교체하세요.
   ===================================================== */

const books = [
    { thumb: 'assets/img/thumbs/허락없이_web cover.jpg', url: 'book/14/', title: '『허락없이: 인쇄에서 플랫폼까지』', author: '출판하는 이웃 엮음',
      /* 클릭 시 옆 칸에 나타나는 설명 */
      detail: {
          titleKo:  '『허락없이: 인쇄에서 플랫폼까지』',
          titleEn:  'Without Permission: Print to Platform',
          author:   '출판하는 이웃 엮음, 2026',
          spec:     'Digital Print, 148 × 210mm',
          linkText: 'Download web book (zip)',
          linkUrl:  'assets/허락없이-인쇄에서 플랫폼까지_web book.zip',
          download: true   // 클릭 시 바로 다운로드
      } },
    { thumb: 'assets/img/thumbs/자기 것을 빼고 세십시오.jpg',     url: 'book/15/', title: '『자기 것을 빼고 세십시오』',                    author: '이계프레스 Igye press' },
    { thumb: 'assets/img/thumbs/마음단추.jpg',                   url: 'book/16/', title: '『Button Up — where feelings hold』',          author: '이서영 Karen S. Lee' },
    { thumb: 'assets/img/thumbs/TheRagebook2.jpg',               url: 'book/17/', title: '『The Rage book2』',                           author: 'evil hamster' },
    { thumb: 'assets/img/thumbs/A key to my neighborhood.jpg',   url: 'book/18/', title: '『봉천동 사랑해야만 하기』 A Key to my Neighborhood', author: 'Sohui Kim' },
    { thumb: 'assets/img/thumbs/1.jpg',  url: 'book/1/',  title: '『사소로운 것들: 목동 비공식 지도』',              author: '건킴 Gunkimm' },
    { thumb: 'assets/img/thumbs/2.jpg',  url: 'book/2/',  title: '『Plants I saw and loved』',                   author: '홍혜림 Hyerim Hong' },
    { thumb: 'assets/img/thumbs/3.jpg',  url: 'book/3/',  title: '『ABFFantasy』',                               author: '김연주 Yeonjoo Kim' },
    { thumb: 'assets/img/thumbs/4.jpg',  url: 'book/4/',  title: '『변화하는 것들. 이 ‘책’은 유연하고 단단한 존재들에 대한 시각적 기록입니다.』', author: '홍혜림 Hyerim Hong' },
    { thumb: 'assets/img/thumbs/5.jpg',  url: 'book/5/',  title: '『FREEGRID HOUSE』',                           author: '임정빈 Jeongbin Im' },
    { thumb: 'assets/img/thumbs/6.jpg',  url: 'book/6/',  title: '『CONTINGENT REPORTS』',                       author: '이서영 Karen S. Lee' },
    { thumb: 'assets/img/thumbs/7.jpg',  url: 'book/7/',  title: '『Fieldguide in Veil』',                       author: '용서우 Seowoo Yong' },
    { thumb: 'assets/img/thumbs/8.jpg',  url: 'book/8/',  title: '『The Rabbit Pond Story』',                    author: '김연주 Yeonjoo Kim' },
    { thumb: 'assets/img/thumbs/9.jpg',  url: 'book/9/',  title: '『Heavily Stapled Book』',                     author: '김소희 Sohui Kim' },
    { thumb: 'assets/img/thumbs/10.jpg', url: 'book/10/', title: '『Fractal: The Logic of Irregular Repetition』', author: '김동건 Donggun Kim' },
    { thumb: 'assets/img/thumbs/11.jpg', url: 'book/11/', title: '『Vook Book of Voyeurism』',                   author: '손서영 Seoyeong Son' },
    { thumb: 'assets/img/thumbs/12.jpg', url: 'book/12/', title: '『2020 New York. The doors』',                 author: '홍혜림 Hyerim Hong' },
    { thumb: 'assets/img/thumbs/13.jpg', url: 'book/13/', title: '『Daeshinsa Manual Book』',                    author: '김혜영 Hyeyoung Kim, 이주희 Juhui Lee' },
    { thumb: 'assets/img/thumbs/9.jpg',  url: 'book/9/' },
    { thumb: 'assets/img/thumbs/10.jpg', url: 'book/10/' },
    { thumb: 'assets/img/thumbs/11.jpg', url: 'book/11/' },
    { thumb: 'assets/img/thumbs/12.jpg', url: 'book/12/' },
    { thumb: 'assets/img/thumbs/13.jpg', url: 'book/13/' },
    { thumb: 'assets/img/thumbs/14.jpg', url: 'book/14/' },
    { thumb: 'assets/img/thumbs/15.jpg', url: 'book/15/' },
    { thumb: 'assets/img/thumbs/16.jpg', url: 'book/16/' },
    { thumb: 'assets/img/thumbs/17.jpg', url: 'book/17/' },
    { thumb: 'assets/img/thumbs/18.jpg', url: 'book/18/' },
    { thumb: 'assets/img/thumbs/19.jpg', url: 'book/19/' },
    { thumb: 'assets/img/thumbs/20.jpg', url: 'book/20/' },
    { thumb: 'assets/img/thumbs/21.jpg', url: 'book/21/' },
    { thumb: 'assets/img/thumbs/22.jpg', url: 'book/22/' },
    { thumb: 'assets/img/thumbs/23.jpg', url: 'book/23/' },
    { thumb: 'assets/img/thumbs/24.jpg', url: 'book/24/' },
    { thumb: 'assets/img/thumbs/25.jpg', url: 'book/25/' },
    { thumb: 'assets/img/thumbs/26.jpg', url: 'book/26/' },
    { thumb: 'assets/img/thumbs/27.jpg', url: 'book/27/' },
    { thumb: 'assets/img/thumbs/28.jpg', url: 'book/28/' },
    { thumb: 'assets/img/thumbs/29.jpg', url: 'book/29/' },
    { thumb: 'assets/img/thumbs/30.jpg', url: 'book/30/' },
    { thumb: 'assets/img/thumbs/31.jpg', url: 'book/31/' },
    { thumb: 'assets/img/thumbs/32.jpg', url: 'book/32/' },
    { thumb: 'assets/img/thumbs/33.jpg', url: 'book/33/' },
    { thumb: 'assets/img/thumbs/34.jpg', url: 'book/34/' },
    { thumb: 'assets/img/thumbs/35.jpg', url: 'book/35/' },
    { thumb: 'assets/img/thumbs/36.jpg', url: 'book/36/' },
    { thumb: 'assets/img/thumbs/37.jpg', url: 'book/37/' },
    { thumb: 'assets/img/thumbs/38.jpg', url: 'book/38/' },
    { thumb: 'assets/img/thumbs/39.jpg', url: 'book/39/' },
    { thumb: 'assets/img/thumbs/40.jpg', url: 'book/40/' },
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
    // 경로에 확장자가 있으면 그대로 한 번만 요청 (실패 요청 없이 바로 로드)
    var exts = /\.(png|jpe?g|webp)$/i.test(base) ? [''] : THUMB_EXTS;
    var i = 0;
    function tryNext() {
        if (i >= exts.length) { book._resolvedThumb = null; return; }
        var src = base + exts[i++];
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

/* =====================================================
   설명 칸 (detail 이 있는 책)
   책을 클릭해 고정하면 바로 다음 순서에 검은 설명 칸이 끼어들고
   뒤의 책들은 한 칸씩 밀림 → 모든 책이 항상 보임
   ===================================================== */

function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function(ch) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
}

function renderDetail(el, b) {
    var d = b.detail;
    var link = d.linkUrl && d.linkUrl !== '#'
        ? '<a href="' + escapeHtml(encodeURI(d.linkUrl)) + '"' +
              (d.download ? ' download' : ' target="_blank" rel="noopener"') +
              '>' + escapeHtml(d.linkText) + '</a>'
        : '<a>' + escapeHtml(d.linkText) + '</a>';
    el.classList.add('detail-cell');
    el.innerHTML =
        '<div class="detail-inner">' +
            '<p>' + escapeHtml(d.titleKo) + '<br>' + escapeHtml(d.titleEn) + '</p>' +
            '<p>' + escapeHtml(d.author) + '</p>' +
            '<p>' + escapeHtml(d.spec) + '</p>' +
            '<p class="detail-link">' + link + '</p>' +
        '</div>';
}

function buildGrid() {
    var grid = document.getElementById('grid');
    grid.innerHTML = '';

    // 고정된 detail 책 바로 뒤에 설명 칸을 끼워 넣은 배치 목록
    // 모바일에서는 설명 칸이 2칸 너비 (뒤에 자리 채움용 spacer 하나 추가)
    var isMobile = window.innerWidth <= MOBILE_MAX;
    var items = [];
    books.forEach(function(b) {
        items.push(b);
        if (b.detail && b.pinned) {
            items.push({ detailOf: b });
            if (isMobile) items.push({ detailSpacer: true });
        }
    });

    // 목표 셀 크기(CELL_SIZE)에서 시작, 데이터 셀이 뷰포트를 벗어나면 cols를 늘려 셀을 축소
    var dataCount = items.filter(function(b) { return b.title || b.detailOf || b.detailSpacer; }).length;
    var cols, cellPx, rows;
    if (isMobile) {
        // 모바일: 1행에 3칸 고정, 넘치는 책은 아래로 스크롤
        cols   = MOBILE_COLS;
        cellPx = window.innerWidth / cols;
        rows   = Math.max(Math.ceil(dataCount / cols), Math.ceil(window.innerHeight / cellPx));
    } else {
        cols   = Math.max(1, Math.round(window.innerWidth / CELL_SIZE));
        cellPx = window.innerWidth / cols;
        while (Math.ceil(dataCount / cols) * cellPx > window.innerHeight) {
            cols++;
            cellPx = window.innerWidth / cols;
        }
        rows   = Math.ceil(window.innerHeight / cellPx);
    }

    grid.style.setProperty('--cols',    cols);
    grid.style.setProperty('--rows',    rows);
    grid.style.setProperty('--cell-px', cellPx + 'px');

    // 책 인덱스 i → 그리드 좌표
    // 좌측 상단(col=0)부터 우→우, 행마다 좌측에서 시작
    var bookMap = {};
    items.forEach(function(book, i) {
        var row = Math.floor(i / cols);
        var col = i % cols;
        if (row < rows) {
            bookMap[row + ',' + col] = book;
        }
    });

    var tooltip     = document.getElementById('thumbnail');
    var labelTitle  = document.querySelector('#thumbnail .book-title');
    var labelAuthor = document.querySelector('#thumbnail .book-author');
    var spanned     = {};

    for (var r = 0; r < rows; r++) {
        for (var c = 0; c < cols; c++) {
            if (spanned[r + ',' + c]) continue;   // 앞 설명 칸이 2칸으로 차지한 자리

            var cell = document.createElement('div');
            cell.className = 'cell';

            var book = bookMap[r + ',' + c];
            if (book && book.detailOf) {
                // 다음 자리가 spacer이고 같은 행이면 2칸으로 합침
                var next = bookMap[r + ',' + (c + 1)];
                if (next && next.detailSpacer) {
                    cell.style.gridColumn = 'span 2';
                    spanned[r + ',' + (c + 1)] = true;
                }
                renderDetail(cell, book.detailOf);
            } else if (book && book.detailSpacer) {
                // 설명 칸이 행 끝에 걸려 합치지 못한 경우: 빈 검은 칸
                cell.classList.add('detail-cell');
            } else if (book && book.title) {
                (function(b, el) {
                    el.classList.add('book-cell');

                    // 설명 칸이 열려 있는 책은 툴팁을 띄우지 않음 (겹침 방지)
                    function detailOpen() { return b.detail && b.pinned; }

                    // 설명이 있는 책: 닫혀 있을 때 우측 하단에 OPEN 라벨
                    if (b.detail && !b.pinned) {
                        var label = document.createElement('span');
                        label.className = 'open-label';
                        label.textContent = 'OPEN';
                        el.appendChild(label);
                    }
                    el.style.backgroundColor = b.color;

                    function showTooltip(b) {
                        setLetters(labelTitle,  b.title  || '');
                        setLetters(labelAuthor, b.author || '');
                        tooltip.style.display = 'block';
                        colorLetters(tooltip.querySelectorAll('.ch'));
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
                        colorLetters(tooltip.querySelectorAll('.ch'));   // 글자마다 흑/백
                    }

                    /* 이미지 표시 상태
                       - 기본: 랜덤 색상
                       - 호버: 이미지 표시
                       - 클릭: 이미지 고정 (다시 클릭하면 해제) */
                    var hovering  = false;
                    var lastTouch = 0;

                    function showImage() {
                        resolveThumb(b, function(src) {
                            if (!hovering && !b.pinned) return;   // 이미지 로딩 중 마우스가 나간 경우 표시 안 함
                            el.style.backgroundImage    = 'url("' + src + '")';
                            el.style.backgroundSize     = 'cover';
                            el.style.backgroundPosition = 'center';
                        });
                    }

                    function hideImage() {
                        if (b.pinned) return;                      // 고정된 칸은 유지
                        el.style.backgroundImage = '';
                    }

                    if (b.pinned) showImage();                     // 창 크기 변경으로 그리드를 다시 그려도 고정 유지

                    el.addEventListener('mouseenter', function() {
                        hovering = true;
                        showImage();
                        if (!detailOpen()) showTooltip(b);
                    });

                    el.addEventListener('mousemove', function(e) {
                        if (detailOpen()) return;
                        positionTooltip(e.clientX, e.clientY);
                    });

                    el.addEventListener('mouseleave', function() {
                        hovering = false;
                        hideImage();
                        tooltip.style.display = 'none';
                    });

                    el.addEventListener('click', function() {
                        b.pinned = !b.pinned;
                        if (b.detail) {
                            /* 설명 칸 열기/닫기: 배치를 다시 그려 뒤 책들을 한 칸씩 밀거나 되돌림 */
                            if (!b.pinned) b.color = randomBookColor(b.color);
                            tooltip.style.display = 'none';
                            buildGrid();
                            return;
                        }
                        if (b.pinned) {
                            showImage();
                            return;
                        }
                        /* 고정 해제: 이전과 다른 랜덤 색상으로 교체 */
                        b.color = randomBookColor(b.color);
                        el.style.backgroundColor = b.color;
                        if (tooltip.style.display === 'block') showTooltip(b);   // 툴팁 글자색도 새 배경에 맞춤
                        if (Date.now() - lastTouch < 1000) {
                            hovering = false;                      // 터치: 다시 탭하면 바로 새 색상으로
                            hideImage();
                        }                                          // 마우스: 해제 후 커서가 나가면 새 색상이 보임
                    });

                    el.addEventListener('touchstart', function(e) {
                        lastTouch = Date.now();
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

/* 화면이 뜬 뒤 여유 시간에 책 썸네일을 앞에서부터 하나씩 미리 받아둠
   → 탭/호버 시 이미지가 바로 보임 */
(function preloadThumbs() {
    var queue = books.filter(function(b) { return b.title; });
    function next() {
        var b = queue.shift();
        if (!b) return;
        resolveThumb(b, function() {});
        setTimeout(next, 50);
    }
    window.addEventListener('load', function() {
        (window.requestIdleCallback || function(fn) { setTimeout(fn, 300); })(next);
    });
})();

var resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(buildGrid, 150);
});

/* =====================================================
   글자 흑/백 반전 (메뉴 + 호버 툴팁)
   글자 하나하나 아래 배경의 밝기를 재서
   밝으면 완전 검정(#000), 어두우면 완전 흰색(#fff)
   ===================================================== */

var imgCache = {};

// 텍스트를 글자 단위 span(.ch)으로 쪼개서 넣음
function setLetters(el, text) {
    el.textContent = '';
    for (var i = 0; i < text.length; i++) {
        var s = document.createElement('span');
        s.className = 'ch';
        s.textContent = text[i];
        el.appendChild(s);
    }
}

function colorLetters(spans) {
    Array.prototype.forEach.call(spans, function(s) {
        var rgb = letterBackground(s.getBoundingClientRect());
        var lum = (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;
        s.style.color = lum < 0.5 ? '#ffffff' : '#000000';
    });
}

document.querySelectorAll('.site-nav a').forEach(function(a) {
    setLetters(a, a.textContent);
});
var navLetters = document.querySelectorAll('.site-nav .ch');

// 배경 이미지의 해당 영역 평균 색 (이미지 로딩 전/읽기 불가면 null)
function sampleImage(src, cell, rect) {
    var e = imgCache[src];
    if (!e) {
        e = imgCache[src] = { img: new Image(), ctx: null };
        e.img.onload = function() {
            try {
                var cv = document.createElement('canvas');
                cv.width  = e.img.naturalWidth;
                cv.height = e.img.naturalHeight;
                var ctx = cv.getContext('2d', { willReadFrequently: true });
                ctx.drawImage(e.img, 0, 0);
                ctx.getImageData(0, 0, 1, 1);          // 읽기 가능한지 확인
                e.ctx = ctx;
            } catch (err) { /* file:// 등에서 읽기 불가 → 배경색으로 대체 */ }
            scheduleNavUpdate();
        };
        e.img.src = src;
    }
    if (!e.ctx) return null;

    // background-size: cover + center 기준으로 화면 좌표 → 이미지 좌표
    var cr = cell.getBoundingClientRect();
    var iw = e.img.naturalWidth, ih = e.img.naturalHeight;
    var scale = Math.max(cr.width / iw, cr.height / ih);
    var ox = cr.left + (cr.width  - iw * scale) / 2;
    var oy = cr.top  + (cr.height - ih * scale) / 2;
    var sx = Math.max(0, Math.floor((rect.left - ox) / scale));
    var sy = Math.max(0, Math.floor((rect.top  - oy) / scale));
    if (sx >= iw || sy >= ih) return null;
    var sw = Math.max(1, Math.min(iw - sx, Math.ceil(rect.width  / scale)));
    var sh = Math.max(1, Math.min(ih - sy, Math.ceil(rect.height / scale)));

    var d = e.ctx.getImageData(sx, sy, sw, sh).data;
    var r = 0, g = 0, b = 0, n = d.length / 4;
    for (var i = 0; i < d.length; i += 4) { r += d[i]; g += d[i + 1]; b += d[i + 2]; }
    return [r / n, g / n, b / n];
}

function letterBackground(rect) {
    var x = rect.left + rect.width / 2;
    var y = rect.top  + rect.height / 2;
    var cell = null;
    var els = document.elementsFromPoint(x, y);
    for (var i = 0; i < els.length; i++) {
        cell = els[i].closest('.cell');
        if (cell) break;
    }
    if (!cell) return [255, 255, 255];

    var bg = cell.style.backgroundImage;
    if (bg && !cell.classList.contains('detail-cell')) {
        var m = bg.match(/url\(["']?(.*?)["']?\)/);
        var rgb = m && sampleImage(m[1], cell, rect);
        if (rgb) return rgb;
    }
    var c = getComputedStyle(cell).backgroundColor.match(/\d+(\.\d+)?/g) || [255, 255, 255];
    return [+c[0], +c[1], +c[2]];
}

function updateNavColors() {
    colorLetters(navLetters);
    var tip = document.getElementById('thumbnail');
    if (tip.style.display === 'block') colorLetters(tip.querySelectorAll('.ch'));
}

var navRaf = 0;
function scheduleNavUpdate() {
    if (navRaf) return;
    navRaf = requestAnimationFrame(function() { navRaf = 0; updateNavColors(); });
}

// 그리드 색/이미지/배치가 바뀔 때마다 다시 계산
new MutationObserver(scheduleNavUpdate).observe(document.getElementById('grid'), {
    subtree: true, childList: true, attributes: true, attributeFilter: ['style', 'class']
});
window.addEventListener('resize', scheduleNavUpdate);
window.addEventListener('scroll', scheduleNavUpdate, { passive: true });   // 모바일 스크롤 시 메뉴 색 갱신
scheduleNavUpdate();

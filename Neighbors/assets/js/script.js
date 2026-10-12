/* =====================================================
   활동 데이터
   images: 확장 시 표시할 이미지 경로 배열 (개수 제한 없음, 좌우 슬라이드)
   ===================================================== */

const activities = [
    {
        title:    'San Francisco Art Book Fair 2026',
        category: 'Fair',
        date:     '2026. 7. 23. – 26., @MSP Foundation, San Francisco',
        url:      '#',
        images:   [
            'assets/img/SanFranciscoArtBookFair_2026_1.JPG',
            'assets/img/SanFranciscoArtBookFair_2026_2.JPG'
        ]
    },
    {
        title:    '군산북페어 2026',
        category: 'Fair',
        date:     '2026. 8. 29. – 30., @군산회관, 군산시, 한국',
        url:      '#',
        images:   [
            'assets/img/군산북페어2026_1.JPG',
            'assets/img/군산북페어2026_2.JPG'
        ]
    },
    {
        title:    '전주책쾌 2026',
        category: 'Fair',
        date:     '2026. 7. 17. – 18., @문화공판장 작당, 전주시, 한국',
        url:      'https://www.instagram.com/jj.bookfair/',
        images:   [
            'assets/img/전주책쾌2026_1.JPG',
            'assets/img/전주책쾌2026_2.JPG'
        ]
    },
    {
        title:    'Unlimited Edition 17',
        category: 'Fair',
        date:     '2025. 11. 14. – 16., @SeMA, Buk-Seoul Museum of Art',
        url:      '#',
        images:   [
            'assets/img/UE17_2026_1.JPG',
            'assets/img/UE17_2026_2.JPG'
        ]
    },
    {
        title:    'San Francisco Art Book Fair 2025',
        category: 'Fair',
        date:     '2025. 7. 10. – 13., @MSP Foundation, San Francisco',
        url:      '#',
        images:   [
            'assets/img/SanFranciscoArtBookFair_2025_1.JPG',
            'assets/img/SanFranciscoArtBookFair_2025_2.JPG'
        ]
    },
    {
        title:    'Publishing Neighbors',
        category: 'Exhibition',
        date:     '2025. 1. 24. – 27., @Pop Hannam, Yongsan',
        url:      '#',
        images:   [
            'assets/img/PopHannam_2025.jpg'
        ]
    },
];

/* =====================================================
   이미지 슬라이더
   - 이미지는 원본 비율 그대로(잘림 없음), 프레임 높이는 고정
   - 순환: 마지막 이미지 다음엔 첫 이미지, 첫 이미지 이전엔 마지막 이미지가 이어서 나옴
     (원본 앞뒤에 복제본을 두고, 끝을 넘어가면 같은 이미지 위치로 보이지 않게 되돌림)
   - 마우스·트랙패드 클릭 후 드래그: 한 번 끌 때 한 장
   - 트랙패드·매직마우스 두 손가락 좌우 스와이프: 한 번 쓸어넘길 때 한 장
   - 모바일 터치 스와이프: 한 장씩 (CSS scroll-snap-stop)
   - 키보드 ← →: 마우스를 올린 행 > 마지막으로 펼친 행 > 화면에 가장 많이 보이는 행 순으로 대상 선택
   - 이미지가 프레임 안에 모두 들어오는 행은 넘기지 않음(순환도 꺼짐)
   ===================================================== */

var REDUCED_MOTION = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var SLIDE_DURATION = 450;           // 한 장 넘어가는 시간(ms)
var sliders = [];
var activeSlider = null;

function buildSlider(images, title) {
    var wrap = document.createElement('div');
    wrap.className = 'col-images' + (images.length === 1 ? ' single' : '');

    var track = document.createElement('div');
    track.className = 'slider-track';
    track.setAttribute('role', 'region');
    track.setAttribute('aria-label', title + ' 이미지');
    wrap.appendChild(track);

    function makeImg(src, isClone) {
        var img = document.createElement('img');
        img.dataset.src = src;      // 행을 처음 펼칠 때 로드
        img.alt = '';
        img.decoding = 'async';
        img.draggable = false;
        if (isClone) {
            img.className = 'is-clone';
            img.setAttribute('aria-hidden', 'true');
        }
        img.addEventListener('load', onImageLoad);
        return img;
    }

    /* [복제본 세트] [원본 세트] [복제본 세트] — 복제본은 순환할 때만 보임 */
    var canLoop = images.length > 1;
    if (canLoop) images.forEach(function(src) { track.appendChild(makeImg(src, true)); });
    var originals = images.map(function(src) { return makeImg(src, false); });
    originals.forEach(function(img) { track.appendChild(img); });
    if (canLoop) images.forEach(function(src) { track.appendChild(makeImg(src, true)); });
    originals[0].classList.add('slide-first');
    originals[originals.length - 1].classList.add('slide-last');

    var n = originals.length;
    var looping = false;            // 순환 모드 여부 (이미지가 프레임을 넘칠 때만)
    var index = 0;                  // 현재 멈춤 지점 번호 (순환 모드에선 원본 세트 n ~ 2n-1)
    var anim = null;                // 진행 중인 이동 애니메이션
    var drag = null;                // 진행 중인 드래그
    var api = { el: wrap, go: go, load: load, visibleArea: visibleArea };
    sliders.push(api);

    function allImgs()     { return track.querySelectorAll('img'); }
    function slides()      { return looping ? allImgs() : originals; }
    function maxScroll()   { return track.scrollWidth - track.clientWidth; }
    function hasOverflow() { return maxScroll() > 1; }
    /* 터치 기기: 브라우저 기본 스와이프 사용 (CSS @media (pointer: coarse)) */
    function nativeMode()  { return getComputedStyle(track).overflowX !== 'hidden'; }
    function gap()         { return parseFloat(getComputedStyle(track).columnGap) || 0; }
    /* 원본 한 세트의 폭 (복제본 세트 간 이동 거리) */
    function setWidth()    { return allImgs()[n].offsetLeft - allImgs()[0].offsetLeft; }

    function load() {
        allImgs().forEach(function(img) {
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
        });
    }

    /* 가장 가로로 긴 이미지 비율 → CSS가 그 이미지도 프레임에 다 들어오도록 높이 조정 */
    function onImageLoad() {
        var maxRatio = 0;
        originals.forEach(function(img) {
            if (img.naturalHeight) {
                maxRatio = Math.max(maxRatio, img.naturalWidth / img.naturalHeight);
            }
        });
        if (maxRatio) wrap.style.setProperty('--max-ratio', maxRatio);
        realign();
    }

    /* 원본 이미지들이 프레임을 넘칠 때만 순환 모드 */
    function updateMode() {
        var total = 0;
        originals.forEach(function(img) { total += img.offsetWidth; });
        total += gap() * (n - 1);
        var on = canLoop && track.clientWidth > 0 && total > track.clientWidth + 1;
        if (on === looping) return;
        looping = on;
        track.classList.toggle('is-loop', on);
        index = on ? n : 0;         // 모드가 바뀌면 첫 이미지부터
    }

    /* 멈춤 지점: 각 이미지의 시작 위치 */
    function stops() {
        var max = maxScroll();
        var list = [];
        Array.prototype.forEach.call(slides(), function(img) {
            var x = looping ? img.offsetLeft : Math.max(0, Math.min(img.offsetLeft, max));
            if (!list.length || x - list[list.length - 1] > 1) list.push(x);
        });
        return list.length ? list : [0];
    }

    function nearestIndex(list, x) {
        var best = 0;
        list.forEach(function(p, i) {
            if (Math.abs(p - x) < Math.abs(list[best] - x)) best = i;
        });
        return best;
    }

    /* 복제본 세트에 들어와 있으면 같은 이미지의 원본 위치로 순간 이동 (화면상 변화 없음) */
    function normalize() {
        if (!looping) return;
        var shift = index < n ? 1 : (index >= 2 * n ? -1 : 0);
        if (!shift) return;
        stopAnim();
        index += shift * n;
        track.scrollLeft += shift * setWidth();
    }

    /* 부드러운 이동: 직접 애니메이션 (브라우저마다 다른 smooth 스크롤에 의존하지 않음) */
    function stopAnim() {
        if (anim) { cancelAnimationFrame(anim); anim = null; }
    }

    function animateTo(x) {
        stopAnim();
        if (nativeMode()) {
            track.scrollTo({ left: x, behavior: REDUCED_MOTION ? 'auto' : 'smooth' });
            return;                 // 끝나면 scroll 정착 처리에서 normalize
        }
        var from = track.scrollLeft;
        var dist = x - from;
        if (REDUCED_MOTION || Math.abs(dist) < 1) { track.scrollLeft = x; normalize(); return; }
        var t0 = null;
        function step(now) {
            if (t0 === null) t0 = now;
            var p = Math.min(1, (now - t0) / SLIDE_DURATION);
            var eased = 1 - Math.pow(1 - p, 3);          // ease-out
            track.scrollLeft = from + dist * eased;
            if (p < 1) {
                anim = requestAnimationFrame(step);
            } else {
                anim = null;
                normalize();
            }
        }
        anim = requestAnimationFrame(step);
    }

    /* 한 장 이동 (dir: 1 다음, -1 이전) */
    function go(dir) {
        if (!hasOverflow()) return;
        normalize();                // 빠르게 연속으로 넘길 때 복제본 끝에 닿지 않도록
        var list = stops();
        var next = Math.max(0, Math.min(list.length - 1, index + dir));
        if (next === index) return;
        index = next;
        animateTo(list[index]);
    }

    /* 기준 위치(x)에서 한 장 앞/뒤 멈춤 지점 */
    function stepFrom(list, x, dir) {
        var i;
        if (dir > 0) {
            for (i = 0; i < list.length; i++) if (list[i] > x + 1) return i;
            return list.length - 1;
        }
        if (dir < 0) {
            for (i = list.length - 1; i >= 0; i--) if (list[i] < x - 1) return i;
            return 0;
        }
        return nearestIndex(list, x);
    }

    /* 화면에 보이는 높이(px). 접힌 행은 0 */
    function visibleArea() {
        if (!track.getClientRects().length) return 0;
        var r = track.getBoundingClientRect();
        return Math.max(0, Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0));
    }

    /* ── 마우스·트랙패드 클릭 후 드래그 ──
       끄는 동안 이미지가 따라오고, 놓으면 끈 방향으로 한 장 이동.
       조금만 끌었다 놓으면 제자리로 돌아감. */
    track.addEventListener('pointerdown', function(e) {
        if (nativeMode() || !hasOverflow() || !e.isPrimary) return;
        if (e.pointerType === 'mouse' && e.button !== 0) return;
        if (e.pointerType === 'mouse') e.preventDefault();   // 텍스트 선택·포커스 방지
        stopAnim();
        if (looping) index = nearestIndex(stops(), track.scrollLeft);
        normalize();
        activeSlider = api;
        drag = {
            id: e.pointerId, x: e.clientX, y: e.clientY,
            left: track.scrollLeft, lastX: e.clientX, lastT: e.timeStamp, v: 0, active: false
        };
    });

    track.addEventListener('pointermove', function(e) {
        if (!drag || e.pointerId !== drag.id) return;
        var dx = e.clientX - drag.x;
        var dy = e.clientY - drag.y;
        if (!drag.active) {
            if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
            if (Math.abs(dy) > Math.abs(dx)) { drag = null; return; }   // 세로 움직임은 무시
            drag.active = true;
            try { track.setPointerCapture(e.pointerId); } catch (err) {}
            track.classList.add('is-dragging');
        }
        var dt = e.timeStamp - drag.lastT;
        if (dt > 0) drag.v = 0.7 * ((e.clientX - drag.lastX) / dt) + 0.3 * drag.v;   // px/ms
        drag.lastX = e.clientX;
        drag.lastT = e.timeStamp;
        track.scrollLeft = drag.left - dx;
    });

    function endDrag(e) {
        if (!drag || e.pointerId !== drag.id) return;
        var d = drag;
        drag = null;
        if (!d.active) return;
        track.classList.remove('is-dragging');
        if (e.type === 'pointerup') d.lastX = e.clientX;
        if (e.timeStamp - d.lastT > 80) d.v = 0;                       // 멈췄다 놓으면 관성 없음

        var dx = d.lastX - d.x;
        var threshold = Math.min(80, track.clientWidth * 0.1);
        var dir = 0;
        if (Math.abs(dx) > threshold) dir = dx < 0 ? 1 : -1;            // 왼쪽으로 끌면 다음
        else if (Math.abs(d.v) > 0.4 && Math.abs(dx) > 10) dir = d.v < 0 ? 1 : -1;   // 빠르게 튕김

        var list = stops();
        index = stepFrom(list, d.left, dir);
        animateTo(list[index]);
    }
    track.addEventListener('pointerup', endDrag);
    track.addEventListener('pointercancel', endDrag);

    /* ── 트랙패드·매직마우스 두 손가락 스와이프 / Shift + 휠 ──
       한 번의 제스처(관성 포함)를 한 장 이동으로 처리.
       세로 움직임이 더 크면 그대로 페이지 스크롤. */
    var wheel = { locked: false, acc: 0, lastAbs: 0, lastStep: 0, timer: null };

    function resetWheel() {
        wheel.locked = false;
        wheel.acc = 0;
        wheel.lastAbs = 0;
    }

    track.addEventListener('wheel', function(e) {
        var dx = e.deltaX;
        var dy = e.deltaY;
        if (e.shiftKey && !dx) { dx = dy; dy = 0; }
        if (Math.abs(dx) <= Math.abs(dy)) { wheel.acc = 0; return; }
        if (!hasOverflow() || drag) return;

        e.preventDefault();
        activeSlider = api;

        var unit = e.deltaMode === 1 ? 16 : (e.deltaMode === 2 ? track.clientWidth : 1);
        var px = dx * unit;
        var abs = Math.abs(px);
        var now = Date.now();

        /* 이벤트가 180ms 끊기면 제스처 종료 */
        clearTimeout(wheel.timer);
        wheel.timer = setTimeout(resetWheel, 180);

        /* 관성으로 줄어들던 값이 갑자기 커지면 = 새로 쓸어넘김 */
        if (wheel.locked && now - wheel.lastStep > 350 && abs > 30 && abs > wheel.lastAbs * 3) {
            wheel.locked = false;
            wheel.acc = 0;
        }
        wheel.lastAbs = abs;
        if (wheel.locked) return;

        wheel.acc += px;
        if (Math.abs(wheel.acc) >= 30) {
            go(wheel.acc > 0 ? 1 : -1);
            wheel.locked = true;
            wheel.acc = 0;
            wheel.lastStep = now;
        }
    }, { passive: false });

    /* 터치로 직접 스와이프한 경우: 멈춘 위치로 현재 번호 동기화 + 순환 위치 보정 */
    var settleTimer = null;
    track.addEventListener('scroll', function() {
        if (drag || anim) return;
        clearTimeout(settleTimer);
        settleTimer = setTimeout(function() {
            if (drag || anim) return;
            index = nearestIndex(stops(), track.scrollLeft);
            normalize();
        }, 120);
    }, { passive: true });

    /* 키보드 대상 지정 */
    track.addEventListener('pointerenter', function() { activeSlider = api; });
    track.addEventListener('touchstart',   function() { activeSlider = api; }, { passive: true });

    /* 행을 펼칠 때(display: none → flex)·창 크기 변경·이미지 로드 시 현재 이미지 위치 유지 */
    function realign() {
        if (drag) return;
        stopAnim();
        updateMode();
        var list = stops();
        index = Math.max(0, Math.min(index, list.length - 1));
        track.scrollLeft = list[index];
        normalize();
        track.classList.toggle('is-slidable', hasOverflow() && !nativeMode());
    }
    if ('ResizeObserver' in window) {
        new ResizeObserver(realign).observe(track);
    } else {
        window.addEventListener('resize', realign);
    }

    return api;
}

/* 키보드 ← → */
function pickSlider() {
    if (activeSlider && activeSlider.visibleArea() > 0) return activeSlider;
    var best = null;
    var bestArea = 0;
    sliders.forEach(function(s) {
        var a = s.visibleArea();
        if (a > bestArea) { best = s; bestArea = a; }
    });
    return best;
}

document.addEventListener('keydown', function(e) {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
    var t = e.target;
    if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;

    var s = pickSlider();
    if (!s) return;
    e.preventDefault();
    s.go(e.key === 'ArrowRight' ? 1 : -1);
});

/* =====================================================
   리스트 렌더링
   ===================================================== */

function buildList() {
    var list = document.getElementById('activity-list');
    list.innerHTML = '';

    activities.forEach(function(activity) {
        var row = document.createElement('div');
        row.className = 'activity-row';

        /* ── 상단: title / category / date ── */
        var header = document.createElement('div');
        header.className = 'row-header';

        var colTitle = document.createElement('div');
        colTitle.className = 'col-title';
        colTitle.textContent = activity.title;

        var colCat = document.createElement('div');
        colCat.className = 'col-category';
        colCat.textContent = activity.category;

        var colDate = document.createElement('div');
        colDate.className = 'col-date';
        colDate.textContent = activity.date;

        header.appendChild(colTitle);
        header.appendChild(colCat);
        header.appendChild(colDate);
        row.appendChild(header);

        /* ── 확장 영역: spacer + 이미지 슬라이더 ── */
        if (activity.images && activity.images.length > 0) {
            var expanded = document.createElement('div');
            expanded.className = 'row-expanded';

            var spacer = document.createElement('div');
            spacer.className = 'col-spacer';

            var slider = buildSlider(activity.images, activity.title);

            expanded.appendChild(spacer);
            expanded.appendChild(slider.el);
            row.appendChild(expanded);

            /* 클릭: 확장/축소 토글 (펼친 행이 키보드 ←→ 대상이 됨)
               하나를 열면 이미 열려 있던 activity는 자동으로 닫힘 */
            header.addEventListener('click', function() {
                var opening = !row.classList.contains('expanded');
                var topBefore = header.getBoundingClientRect().top;

                if (opening) {
                    document.querySelectorAll('.activity-row.expanded').forEach(function(other) {
                        if (other !== row) other.classList.remove('expanded');
                    });
                    slider.load();
                    activeSlider = slider;
                } else if (activeSlider === slider) {
                    activeSlider = null;
                }
                row.classList.toggle('expanded', opening);

                /* 위쪽 행이 닫혀 페이지가 당겨져도, 클릭한 제목줄은 화면의 같은 자리에 머물도록 보정 */
                var shift = header.getBoundingClientRect().top - topBefore;
                if (shift) window.scrollBy(0, shift);
            });
        } else {
            /* 이미지 없는 행은 url로 이동 */
            header.addEventListener('click', function() {
                if (activity.url && activity.url !== '#') {
                    window.location.href = activity.url;
                }
            });
        }

        list.appendChild(row);
    });
}

buildList();
updateCategoryLine();

function updateCategoryLine() {
    var catEl = document.querySelector('.col-category');
    if (!catEl) return;

    var x = catEl.getBoundingClientRect().left;

    var line = document.getElementById('category-line');
    if (!line) {
        line = document.createElement('div');
        line.id = 'category-line';
        document.body.appendChild(line);
    }
    line.style.left = x + 'px';
}

window.addEventListener('resize', function() {
    updateCategoryLine();
});

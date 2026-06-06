/* =====================================================
   활동 데이터
   images: 확장 시 표시할 이미지 경로 배열 (2개씩 표시)
   ===================================================== */

const activities = [
    {
        title:    'Unlimited Edition 17',
        category: 'Fair',
        date:     '2025. 11. 14. – 16., @SeMA, Buk-Seoul Museum of Art',
        url:      '#',
        images:   [
            'assets/img/UE17_2026_2.JPG',
            'assets/img/UE17_2026_3.JPG'
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

        /* ── 확장 영역: spacer + 이미지 2개 ── */
        if (activity.images && activity.images.length > 0) {
            var expanded = document.createElement('div');
            expanded.className = 'row-expanded';

            var spacer = document.createElement('div');
            spacer.className = 'col-spacer';

            var colImages = document.createElement('div');
            colImages.className = 'col-images' + (activity.images.length === 1 ? ' single' : '');

            activity.images.slice(0, 2).forEach(function(src) {
                var img = document.createElement('img');
                img.src = src;
                img.alt = '';
                colImages.appendChild(img);
            });

            expanded.appendChild(spacer);
            expanded.appendChild(colImages);
            row.appendChild(expanded);

            /* 클릭: 확장/축소 토글 */
            header.addEventListener('click', function() {
                row.classList.toggle('expanded');
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

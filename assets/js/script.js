const colors = [
    '#FF3B30', '#FF9500', '#FFEA00', '#34C759',
    '#00C7BE', '#007AFF', '#5856D6', '#FF2D55',
    '#AF52DE', '#FF6B35', '#1DB954', '#E74473',
    '#00BCD4', '#9C27B0', 
];

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

document.querySelectorAll('.half').forEach(function(panel) {
    panel.addEventListener('mouseenter', function() {
        var color = getRandomColor();
        panel.style.backgroundColor = color;
        panel.classList.add('hovered');
    });

    panel.addEventListener('mouseleave', function() {
        panel.style.backgroundColor = '#ffffff';
        panel.classList.remove('hovered');
    });

    // 패널 전체를 클릭해도 링크로 이동
    panel.addEventListener('click', function(e) {
        var link = panel.querySelector('a');
        if (link && e.target !== link) {
            window.location.href = link.href;
        }
    });
});
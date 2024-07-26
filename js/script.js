// Tabs Dropdown
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab');

    tabs.forEach(tab => {
        const tabItems = tab.querySelectorAll('.tab-item');

        tabItems.forEach(item => {
            const header = item.querySelector('.tab-header');
            const content = item.querySelector('.tab-content');
            const icon = header.querySelector('i');

            if (header && content) {
                // Initially hide all content
                content.style.display = 'none';

                header.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');

                    // Close all tabs within this tab group
                    tabItems.forEach(otherItem => {
                        const otherContent = otherItem.querySelector('.tab-content');
                        const otherIcon = otherItem.querySelector('.tab-header i');
                        otherItem.classList.remove('active');
                        if (otherContent) otherContent.style.display = 'none';
                        if (otherIcon) otherIcon.className = 'fas fa-caret-right';
                    });

                    // Toggle the clicked tab
                    if (!isActive) {
                        item.classList.add('active');
                        content.style.display = 'flex';
                        if (icon) icon.className = 'fas fa-caret-down';
                    } else {
                        if (icon) icon.className = 'fas fa-caret-right';
                    }
                });
            }
        });
    });
});


// Clock In and Clock Out
document.addEventListener('DOMContentLoaded', function() {
    const timeDisplay = document.querySelector('.time h1');
    const clockInBtn = document.querySelector('.btn-in');
    const clockOutBtn = document.querySelector('.btn-out');
    let clockInTime = null;

    // Function to update the time display
    function updateTimeDisplay() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        timeDisplay.textContent = `${hours}:${minutes}`;
    }

    // Update time display when page loads
    updateTimeDisplay();

    // Update time every minute
    setInterval(updateTimeDisplay, 60000);

    // Clock In functionality
    clockInBtn.addEventListener('click', function() {
        clockInTime = new Date();
        updateTimeDisplay();
        clockInBtn.disabled = true;
        clockOutBtn.disabled = false;
    });

    // Clock Out functionality
    clockOutBtn.addEventListener('click', function() {
        if (clockInTime) {
            const clockOutTime = new Date();
            const timeDiff = clockOutTime - clockInTime;
            const hours = Math.floor(timeDiff / 3600000);
            const minutes = Math.floor((timeDiff % 3600000) / 60000);
            
            alert(`You worked for ${hours} hours and ${minutes} minutes.`);
            
            clockInTime = null;
            clockInBtn.disabled = false;
            clockOutBtn.disabled = true;
        } else {
            alert("You haven't clocked in yet!");
        }
    });

    // Initially disable the Clock Out button
    clockOutBtn.disabled = true;
});
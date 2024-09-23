export const StatusCircle = ({ timestamp }) => {
    const currentDate = new Date();
    const taskDate = new Date(timestamp);
    let color;

    if (taskDate.toDateString() === currentDate.toDateString()) {
        color = '#34b34a';
    } else if (taskDate < currentDate) {
        color = 'tomato';
    } else {
        color = '#d7ca2e';
    }

    return (
        <svg width="15" height="15" style={{ position: 'relative', top: '2px' }}>
            <circle cx="7.5" cy="7.5" r="5" fill={color} />
        </svg>
    );
}
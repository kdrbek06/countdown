import {useEffect, useState} from 'react';

function parseDuration(durationString) {
    const timeUnits = {
        'day': 86400,
        'hour': 3600,
        'minute': 60,
        'second': 1
    };
    const regex = /(\d+)\s*(day|hour|minute|second)s?/g;
    let totalSeconds = 0;
    let match;

    while ((match = regex.exec(durationString)) !== null) {
        const value = parseInt(match[1], 10);
        const unit = match[2];
        totalSeconds += value * timeUnits[unit];
    }
    return totalSeconds;
}


function formatDuration(totalSeconds) {
    const days = Math.floor(totalSeconds / 86400);
    totalSeconds %= 86400;

    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const pad = (num) => String(num).padStart(2, '0');

    const dayLabel = days < 2 ? 'day' : 'days';

    return `${days} ${dayLabel} ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}


function CountDown({duration, timeBeforeUrgent}) {
    const totalDuration = parseDuration(duration);
    const urgentThreshold = parseDuration(timeBeforeUrgent);

    const [timeLeft, setTimeLeft] = useState(totalDuration);
    const isUrgent = timeLeft <= urgentThreshold;

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);


        return () => clearInterval(interval);
    }, []);

    return (
        <span className={isUrgent ? 'urgent' : ''}>
            {formatDuration(timeLeft)}
        </span>
    );
}

export default CountDown;
import { useState, useEffect } from 'react';

const START = [0, 10, 110]; // dark blue (#000a6e)
const END = [1, 175, 255];  // sky blue  (#01afff)

const blend = (percent) => {
    const t = percent / 100;
    const [r, g, b] = START.map((s, i) => Math.round(s + (END[i] - s) * t));
    return `rgb(${r}, ${g}, ${b})`;
};

function WaterTracker() {
    const [amount, setAmount] = useState('');
    const [total, setTotal] = useState(0);
    const [goal, setGoal] = useState(0); // 0 = no goal set

    const addWater = () => {
        const value = Number(amount);
        if (!value) return; // ignores empty/0/NaN, but allows negatives
        setTotal((prev) => Math.max(0, prev + value)); // never drops below 0
        setAmount('');
    };

    const removeWater = () => {
        const value = Math.abs(Number(amount)); // -200 and 200 both remove 200
        if (!value) return;
        setTotal((prev) => Math.max(0, prev - value));
        setAmount('');
    };

    const setDailyGoal = () => {
        const value = Math.abs(Number(amount)); // goal must be positive
        if (!value) return;
        setGoal(value);
        setAmount('');
    };

    const percent = goal ? Math.min(100, Math.round((total / goal) * 100)) : 0;
    const remaining = Math.max(0, goal - total);

    useEffect(() => {
        document.body.style.backgroundColor = blend(percent);
    }, [percent]);

    useEffect(() => {
        return () => { document.body.style.backgroundColor = ''; };
    }, []);

    return (
        <div className="water-tracker">
            <h2>Water Tracker</h2>
            <p>Track your daily water intake here.</p>
            <input
                type="number"
                placeholder="Enter amount of water (ml)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addWater()}
            />
            <button onClick={addWater}>Enter</button>
            <button className="goal" onClick={setDailyGoal}>Set goal</button>
            <button className="reset" onClick={() => setTotal(0)}>Reset</button>
            <p className="total">Total water intake: {total} ml</p>

            {goal > 0 ? (
                <div className="goal-section">
                    <p className="goal-text">
                        Goal: {goal} ml &middot;{' '}
                        {remaining > 0 ? `${remaining} ml to go` : 'Goal reached!'}
                    </p>
                    <div
                        className="progress"
                        role="progressbar"
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={percent}
                    >
                        <div className="progress-fill" style={{ width: `${percent}%` }} />
                    </div>
                </div>
            ) : (
                <p className="goal-hint">Type an amount and press "Set goal" to set a daily target.</p>
            )}
        </div>
    );
}

export default WaterTracker;

import React, { useState } from 'react'
import { Detail, detailOptions } from 'src/types/aliases';


type Props = {
    onSelect: (detail: string) => void;
};

export default function DetailCatebory({ onSelect }: Props) {
    const [selectedDetail, setSelectedDetail] = useState<Detail>('');

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedDetail(value as Detail);
        onSelect(value);
    };
    return (
    <div>
        <label>분야</label>
        <select
        value={selectedDetail}
        onChange={handleChange}
    >
        {detailOptions.map((option) => (
        <option key={option} value={option}>
            {option}
        </option>
        ))}
    </select>
    </div>
    )
}

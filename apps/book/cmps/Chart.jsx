export function Chart({ data }) {
    return (
        <ul className="chart">
            {
                data.map((item) =>
                    <li key={item.label}>
                        <span title={item.label} style={{ height: item.value + '%' }}>
                            {item.value + '%'}
                        </span>
                    </li>
                )
            }
        </ul>
    )
}

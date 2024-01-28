import { useState } from 'react'

export function Table({ data, setData }) {
    const [sortBy, setSortBy] = useState({ key: 'mag', desc: true })

    function formatTime(milliseconds) {
        const date = new Date(milliseconds)
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
    }

    function sortTable(columnIndex) {
        const sortColumn = COLUMNS[columnIndex]
        setData((prevState) => {
            const stateCopy = [...prevState]
            return [
                ...stateCopy.sort((a, b) => {
                    if (
                        a.properties[sortColumn.key] <
                        b.properties[sortColumn.key]
                    ) {
                        return sortBy.desc ? -1 : 1
                    }
                    if (
                        a.properties[sortColumn.key] >
                        b.properties[sortColumn.key]
                    ) {
                        return sortBy.desc ? 1 : -1
                    }
                    return 0
                }),
            ]
        })
        setSortBy((prevState) => {
            return { key: sortColumn.key, desc: !prevState.desc }
        })
    }

    const tableRows = data.map((eartquake) => {
        return (
            <tr key={eartquake.id} className="hover:bg-gray-200 dark:hover:bg-gray-800">
                {COLUMNS.map((column, i) => {
                    if (eartquake.properties[column.key] == null) {
                        return <td key={i}>-</td>
                    }
                    if (column.key === 'time') {
                        return (
                            <td key={i}>
                                {formatTime(eartquake.properties[column.key])}
                            </td>
                        )
                    }
                    return <td key={i}>{eartquake.properties[column.key]}</td>
                })}
            </tr>
        )
    })

    const tableHeaders = COLUMNS.map((column, i) => {
        return (
            <th
                key={i}
                onClick={() => {
                    sortTable(i)
                }}
                className="text-left cursor-pointer"
            >
                {column.header}
                <span
                    className="pl-1"
                    style={{
                        visibility:
                            sortBy.key === column.key ? 'visible' : 'hidden',
                    }}
                >
                    {sortBy.desc ? '\u2193' : '\u2191'}
                </span>
            </th>
        )
    })

    return (
        <table className="table-auto w-screen">
            <thead>
                <tr>{tableHeaders}</tr>
            </thead>
            <tbody>{tableRows}</tbody>
        </table>
    )
}

const COLUMNS = [
    { header: 'Magnitude', key: 'mag'},
    { header: 'Date/Time', key: 'time'},
    { header: 'Location', key: 'place'},
]

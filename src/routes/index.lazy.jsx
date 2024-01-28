import { useState, useEffect } from "react"
import { Table } from "../components/Table"
import { createLazyFileRoute } from "@tanstack/react-router"

export const Route = createLazyFileRoute('/')({
    component: Index,
})

function Index() {
    const root = 'https://earthquake.usgs.gov/fdsnws/event/1/query?'
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [params, setParams] = useState({
        format: 'geojson',
        starttime: '2014-01-01',
        endtime: '2014-01-02',
        orderby: 'magnitude',
    })

    useEffect(() => {
        getData()
    }, [params])

    function getParams() {
        let paramString = ''
        for (const key in params) {
            paramString += `${key}=${params[key]}&`
        }
        return paramString
    }

    async function getData() {
        setLoading(true)
        const resp = await fetch(root + getParams())
        const earthquakeData = await resp.json()
        setData(earthquakeData.features)
        setLoading(false)
    }

    function dateChangeHandler(e, paramsKey) {
        //TODO: check if start date < end date
        setParams((prevState) => {
            return {
                ...prevState,
                [paramsKey]: e.target.value,
            }
        })
    }
    return (
        <>
            <div className="text-lg mb-5">
                Data from{' '}
                <input
                    value={params.starttime}
                    onChange={(e) => {
                        dateChangeHandler(e, 'starttime')
                    }}
                    className="border border-gray-200 px-2"
                    type="date"
                />{' '}
                to{' '}
                <input
                    value={params.endtime}
                    onChange={(e) => {
                        dateChangeHandler(e, 'endtime')
                    }}
                    className="border border-gray-200 px-2"
                    type="date"
                />
            </div>
            {data?.length == 0 ? (
                'No Results'
            ) : loading ? (
                'Loading...'
            ) : (
                <Table data={data} setData={setData} />
            )}
        </>
    )
}

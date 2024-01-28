import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/map')({
    component: Map,
})

function Map() {
    return (
        <div className="p-2">
            <h3>I'm the Map!</h3>
        </div>
    )
}

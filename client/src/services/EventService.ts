const events = new Map<string, [EventService]>()
class EventService {
    private _id: string
    private handleEvent: (data: any) => void

    constructor(
        id: string,
        handler: (data: any) => void,
    ) {
        this.handleEvent = handler
        this._id = id
    }

    get id() {
        return this._id
    }

    static publish(id: string, data?: any) {
        const taggedEvents = events.get(id)
        if (taggedEvents) {
            taggedEvents.forEach(e => e.handleEvent(data))
        }
    }

    static subscribe(id: string, handler: (data: any) => void) {
        const taggedEvents = events.get(id)
        if (taggedEvents) {
            taggedEvents.push(new EventService(id, handler))
        } else {
            events.set(id, [new EventService(id, handler)])
        }
    }

    static remove(id: string, handler?: (data: any) => void) {
        if (handler) {
            const taggedEvents = events.get(id)
            if (taggedEvents) {
                const index = taggedEvents.findIndex(e => e.handleEvent === handler)
                if (index > -1) {
                    taggedEvents.splice(index, 1)
                }
            }
        } else {
            events.delete(id)
        }
    }

    static clear() {
        events.clear()
    }
}

export default EventService;
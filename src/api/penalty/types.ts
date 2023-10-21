import { Floor } from "../floor/types"
import { Tag } from "../tag/types"

export type Punishment = {
    created_at: string,
    division: {
        description: string,
        division_id: number,
        id: number,
        name: string,
        pinned: {
            division_id: number,
            floors: {
                first_floor: Floor,
                last_floor: Floor,
                prefetch: Floor[]
            }
            hidden: boolean,
            hole_id: number,
            id: number,
            locked: boolean,
            reply: number,
            tags: Tag[]
        }[],
        time_created: string,
        time_updated: string
    },
    division_id: number, 
    duration: number,
    end_time: string,
    floor: Floor,
    floor_id: number,
    id: number,
    made_by: number,
    reason: string,
    start_time: string,
    user_id: number
}
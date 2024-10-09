import { Badge, Paper, Text } from "@mantine/core"
import { Action } from "../types/action";
import axios from 'axios'
import { useEffect } from "react";
import { useActionsStore } from "../store/actions";

export const ActionQueue = () => {
    const fillStateQueue = useActionsStore(state => state.fillActions);
    const actionQueue = useActionsStore(state => state.actions);

    const fetchQueue = async () => {
        const { data } = await axios.get<Action[]>('http://localhost:3000/actions/running');
        fillStateQueue(data);
    }

    useEffect(() => {
        fetchQueue();
    }, [])

    return <Paper withBorder shadow="sm" p="md">
        <Text>Queue d'Actions :</Text>
        {actionQueue.length > 0 ? (
            actionQueue.map((action, index) => (
                <Badge key={index} color="green" variant="light" mr="xs">
                    Action #{action.id}: {action.creditsRealValue}/{action.creditsMaxValue} crédits
                </Badge>
            ))
        ) : (
            <Text>Aucune action en attente</Text>
        )}
    </Paper>
}
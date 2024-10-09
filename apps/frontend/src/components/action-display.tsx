import { Badge, Paper, Stack, Text } from "@mantine/core"
import { useEffect, useState } from "react";
import axios from 'axios'
import { Action } from "../types/action";

export const ActionDisplay = () => {
    const [actions, setActions] = useState<Action[]>([]);

    const fetchActions = async () => {
        const { data } = await axios.get<Action[]>('http://localhost:3000/actions');
        setActions(data)
    }

    useEffect(() => {
        fetchActions();
    }, []);

    return <Paper withBorder shadow="sm" p="md">
        <Stack>
            <Text>Crédits Disponibles :</Text>
            {actions.map((actionType) => (
                <Badge p='sm' key={actionType.id} color="blue">
                    Action #{actionType.id}: {actions.find(el => el.id === actionType.id)?.creditsRealValue}/{actions.find(el => el.id === actionType.id)?.creditsMaxValue} crédits disponibles
                </Badge>
            ))}
        </Stack>
    </Paper>
}
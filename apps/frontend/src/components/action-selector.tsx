import { Button, Paper, Select } from "@mantine/core"
import axios from 'axios'
import { useEffect, useState } from "react";
import { Action } from "../types/action";
import { notifications } from "@mantine/notifications";
import { useActionsStore } from "../store/actions";

export const ActionSelector = () => {
    const [selectedAction, setSelectedAction] = useState<number | null>(null);
    const [actions, setActions] = useState<Action[]>([]);
    const fillActions = useActionsStore(state => state.fillActions);

    const fetchActions = async () => {
        const { data } = await axios.get<Action[]>('http://localhost:3000/actions');
        setActions(data)
    }

    const handleChange = (value: string | null) => {
        if (value === null) {
            setSelectedAction(null);
            return;
        }
        setSelectedAction(parseInt(value));
    }

    const addActionToQueue = async () => {
        try {
            const { data } = await axios.post('http://localhost:3000/actions/running', { id: selectedAction });
            fillActions(data)
            notifications.show({
                title: `Action ${selectedAction} ajoutée à la queue`,
                message: 'L\'action a été ajoutée à la queue avec succès',
                color: 'teal',
            })
        } catch (error) {
            notifications.show({
                title: 'Erreur',
                message: 'Une erreur est survenue lors de l\'ajout de l\'action à la queue',
                color: 'red',
            })
        }
    }

    useEffect(() => {
        fetchActions();
    }, []);

    return <Paper withBorder shadow="sm" p="md">
        <Select
            placeholder="Choisir une action"
            data={actions.map((action) => (
                { value: action.id.toString(), label: action.id.toString() }
            ))}
            value={selectedAction?.toString()}
            onChange={handleChange}
        />
        <Button disabled={!selectedAction} mt="md" onClick={addActionToQueue}>
            Ajouter une action
        </Button>
    </Paper>
}
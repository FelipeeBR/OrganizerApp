import FontAwesome from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Tabs } from 'expo-router';
import useNotificacaoStore from "../useNotificacaoStore";
import useTarefaStore from '../useTarefaStore';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

export default function TabLayout() {
    const { notificacoes } = useNotificacaoStore();

    const atualizarDados = useTarefaStore((state) => state.atualizarDados);

    useFocusEffect(
        useCallback(() => {
            atualizarDados();
        }, [atualizarDados])
    );

    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: '#1F2937' }}>
            <Tabs.Screen
                name="home"
                options={{
                title: 'Início',
                tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
                }}
            />
            <Tabs.Screen
                name="disciplina"
                options={{
                title: 'Disciplinas',
                tabBarIcon: ({ color }) => <FontAwesome size={28} name="book-open" color={color} />,
                }}
            />
            <Tabs.Screen
                name="anotacao"
                options={{
                title: 'Anotações',
                tabBarIcon: ({ color }) => <FontAwesome size={28} name="book" color={color} />,
                }}
            />
            <Tabs.Screen
                name="desempenho"
                options={{
                title: 'Desempenho',
                tabBarIcon: ({ color }) => <FontAwesome6 size={28} name="user-graduate" color={color} />,
                }}
            />
            <Tabs.Screen
                name="agenda"
                options={{
                    title: 'Agenda',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="calendar-alt" color={color} />,
                }}
            />
            <Tabs.Screen
                name="perfil"
                options={{
                title: 'Perfil',
                tabBarIcon: ({ color }) => <FontAwesome size={28} name="user-alt" color={color} />,
                }}
            />
            <Tabs.Screen
                name="notificacao"
                options={{
                    title: 'Notificacões',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="bell" color={color} />,
                    tabBarBadge: notificacoes?.length > 0 ? notificacoes?.length : undefined,
                }}
            />
        </Tabs> 
    );
}

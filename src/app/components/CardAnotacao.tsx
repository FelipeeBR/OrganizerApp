import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import axios from 'axios';
import * as SecureStore from "expo-secure-store";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useRouter } from "expo-router";

export default function CardAnotacao({ info }: any) {
    const {id, title} = info;
    const router = useRouter();

    const handleDeleteAnotacao = async () => {
        try {
            const token = await SecureStore.getItemAsync("authToken");
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/anotacao/${id}`, {
            headers: {
                Authorization: `Bearer ${String(token)}`,
            },
            });
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const openAnotacao = (id: number) => {
        router.replace(`/anotacao/${id}`);
    }

    return (
        <View className="bg-white rounded-lg shadow-md flex flex-col justify-between relative p-4 mb-2">
            <Pressable onPress={() => openAnotacao(id)}>
                <View className="flex items-center justify-center text-blue-500 bg-blue-100 rounded-full w-16 h-16 sm:w-20 sm:h-20">
                    <FontAwesome5 name="list-alt" size={24} color="blue" />
                </View>
                <View className="flex flex-col flex-grow">
                    <Text>
                        {title}
                    </Text>
                </View>
            </Pressable>
            <View className="flex items-start">
                <View className="mt-4 flex gap-2">
                    <TouchableOpacity className='flex items-center justify-center bg-red-500 text-white px-4 py-2 rounded-lg' onPress={handleDeleteAnotacao}>
                        <FontAwesome5 name="trash" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
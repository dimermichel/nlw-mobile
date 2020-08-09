import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import { useFocusEffect } from '@react-navigation/native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import api from '../../services/api';
import styles from './styles';

function TeacherList() {
    const [isFiltersVisible, setIsFiltersVisible] = useState(false);
    const [teachers, setTeachers] = useState([]);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    function loadFavorites() {
        AsyncStorage.getItem('favorites').then( response => {
            if (response) {
                const favoriteTeachers = JSON.parse(response);
                const favoriteTeachersIds = favoriteTeachers.map((teacher: Teacher) => {
                    return teacher.id;
                })
                setFavorites(favoriteTeachersIds);
            }
        })
    }

    useFocusEffect(
        React.useCallback(() => {
          loadFavorites();
        }, [])
    ); 

    async function handleFiltersSubmit() {
        loadFavorites();
        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time 
            }
        })
        setTeachers(response.data);
        setIsFiltersVisible(false);
    }

    function handleToggleFiltersVisible() {
        setIsFiltersVisible(!isFiltersVisible);
    }

    return (
        <View style={styles.container}>
            <PageHeader 
                title="Available Teachers" 
                headerRight={(
                    <BorderlessButton onPress={handleToggleFiltersVisible}>
                        <Feather name="filter" size={20} color="#fff" />
                    </BorderlessButton> 
                )}
            >
                {isFiltersVisible && (<View style={styles.searchForm}>
                        <Text style={styles.label}>
                            Subject
                        </Text>
                        <TextInput
                            value={subject}
                            onChangeText={text => setSubject(text)}
                            style={styles.input}
                            placeholder="Which subject?"
                            placeholderTextColor="#c1bccc"
                        />

                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>
                                    Weekday
                                </Text>
                                <TextInput
                                    value={week_day}
                                    onChangeText={text => setWeekDay(text)}
                                    style={styles.input}
                                    placeholder="What day?"
                                    placeholderTextColor="#c1bccc"
                                />
                            </View>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>
                                    Time
                                </Text>
                                <TextInput
                                    value={time}
                                    onChangeText={text => setTime(text)}
                                    style={styles.input}
                                    placeholder="What time?"
                                    placeholderTextColor="#c1bccc"
                                />
                            </View>
                        </View>
                        <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>
                                Filter
                            </Text>
                        </RectButton>
                    </View>
                )}
            </PageHeader>
            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16,
                }}
            >
                {teachers.map((teacher: Teacher) => (
                    <TeacherItem 
                        key={teacher.id} 
                        teacher={teacher} 
                        favorited={favorites.includes(teacher.id)}
                        />))}  
            </ScrollView>
        </View>
    )
}

export default TeacherList;